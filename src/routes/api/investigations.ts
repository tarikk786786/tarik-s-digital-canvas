import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { validateUrlForSSRF, sanitizePromptInput } from "@/lib/find-someone/security";
import { classifyInput } from "@/lib/find-someone/session";
import { DEMO_INVESTIGATION } from "@/content/demo-investigation";
import { DEMO_LIVE_WORLD } from "@/lib/find-someone/live-world-data";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "https://tarik-s-digital-canvas.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

const CreateSchema = z.object({
  query: z.string().trim().min(1).max(500),
  mode: z.enum(["demo", "live"]).optional().default("demo"),
});

export const Route = createFileRoute("/api/investigations")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),

      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id") || "";
        const mode = url.searchParams.get("mode") === "live" ? "live" : "demo";
        const type = url.searchParams.get("type");

        if (type === "telemetry" || type === "live_world") {
          return Response.json(
            {
              status: "success",
              freshness: "SIMULATION",
              timestamp: new Date().toISOString(),
              data: mode === "demo" ? DEMO_LIVE_WORLD : null,
            },
            { headers: CORS },
          );
        }

        if (mode === "demo" || id.startsWith("demo_")) {
          return Response.json(
            {
              status: "success",
              investigationId: id || "demo_current",
              freshness: "DEMO",
              query: DEMO_INVESTIGATION.query,
              entities: DEMO_INVESTIGATION.entities,
              claims: DEMO_INVESTIGATION.claims,
              evidenceCount: DEMO_INVESTIGATION.evidence.length,
              sourcesCount: DEMO_INVESTIGATION.sources.length,
            },
            { headers: CORS },
          );
        }

        return Response.json(
          {
            status: "created",
            investigationId: id,
            freshness: "UNKNOWN",
            message:
              "No strong public evidence yet. Live workers are not connected. Try Demo Mode, or add an organization, username, website, or location.",
            entities: [],
            claims: [],
            evidenceCount: 0,
            sourcesCount: 0,
          },
          { headers: CORS },
        );
      },

      POST: async ({ request }) => {
        try {
          const parsed = CreateSchema.safeParse(await request.json().catch(() => ({})));
          if (!parsed.success) {
            return Response.json(
              { error: "Query is required." },
              { status: 400, headers: CORS },
            );
          }

          const rawQuery = parsed.data.query;

          if (rawQuery.includes(".") || rawQuery.startsWith("http")) {
            const ssrfCheck = validateUrlForSSRF(rawQuery);
            if (!ssrfCheck.isSafe) {
              return Response.json(
                { error: ssrfCheck.reason, code: "SSRF_BOUNDARY_ENFORCED" },
                { status: 403, headers: CORS },
              );
            }
          }

          const query = sanitizePromptInput(rawQuery);
          const mode = parsed.data.mode;
          const prefix = mode === "demo" ? "demo" : "inv";
          const id = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

          return Response.json(
            {
              id,
              query,
              status: "created",
              classification: classifyInput(query),
              mode,
            },
            { headers: CORS },
          );
        } catch (err) {
          return Response.json(
            { error: "Investigation could not be created", details: (err as Error).message },
            { status: 500, headers: CORS },
          );
        }
      },
    },
  },
});
