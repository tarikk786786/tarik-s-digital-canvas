import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sanitizePromptInput } from "@/lib/find-someone/security";
import { runInformationKernel } from "@/lib/intelligence/collectors";
import { WORLD_ADAPTERS, type WorldDimension } from "@/lib/world-os/adapters";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

const InvestigateSchema = z.object({
  query: z.string().trim().min(1).max(500),
});

export const Route = createFileRoute("/api/intelligence")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),

      GET: async ({ request }) => {
        const url = new URL(request.url);
        const kind = url.searchParams.get("kind");

        if (kind === "world") {
          const indiaMode = url.searchParams.get("india") === "1";
          const dimension = (url.searchParams.get("dimension") || "EARTH") as WorldDimension;

          const health = await Promise.all(
            WORLD_ADAPTERS.map(async (a) => {
              const h = await a.healthCheck();
              return {
                id: a.id,
                dimension: a.dimension,
                health: h.health,
                detail: h.detail,
                license: a.license,
                lastUpdate: a.getTimestamp(),
              };
            }),
          );

          const active = WORLD_ADAPTERS.filter((a) => a.dimension === dimension);
          const objects = [];
          for (const adapter of active) {
            const h = health.find((x) => x.id === adapter.id);
            if (!h || h.health === "OFFLINE") continue;
            try {
              const rows = await adapter.fetch({ indiaMode });
              objects.push(...rows);
            } catch (e) {
              const idx = health.findIndex((x) => x.id === adapter.id);
              if (idx >= 0) {
                health[idx] = {
                  ...health[idx],
                  health: "DEGRADED",
                  detail: e instanceof Error ? e.message : "Fetch failed",
                };
              }
            }
          }

          return Response.json(
            {
              status: "success",
              dimension,
              indiaMode,
              retrievedAt: new Date().toISOString(),
              health,
              objects,
              note: "Counts are source-derived only. OFFLINE dimensions invent nothing.",
            },
            { headers: CORS },
          );
        }

        return Response.json(
          {
            status: "ok",
            service: "information-kernel",
            endpoints: {
              investigate: "POST /api/intelligence { query }",
              world: "GET /api/intelligence?kind=world&dimension=EARTH&india=0|1",
            },
          },
          { headers: CORS },
        );
      },

      POST: async ({ request }) => {
        try {
          const parsed = InvestigateSchema.safeParse(await request.json().catch(() => ({})));
          if (!parsed.success) {
            return Response.json({ error: "Query is required." }, { status: 400, headers: CORS });
          }
          const query = sanitizePromptInput(parsed.data.query);
          const result = await runInformationKernel(query);
          return Response.json({ status: "success", ...result }, { headers: CORS });
        } catch (err) {
          return Response.json(
            { error: "Investigation failed", details: (err as Error).message },
            { status: 500, headers: CORS },
          );
        }
      },
    },
  },
});
