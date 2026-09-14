import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sanitizePromptInput } from "@/lib/find-someone/security";
import { runInformationKernel } from "@/lib/intelligence/collectors";
import { getKernelRegistryPublic } from "@/lib/intelligence/registry";
import { getPublicWorkerStatuses } from "@/lib/forensic/registry";
import { WORLD_ADAPTERS, type WorldDimension } from "@/lib/world-os/adapters";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

/** Short-lived health probe cache — never caches invented object counts. */
let healthCache:
  | {
      at: number;
      rows: Array<{
        id: string;
        dimension: WorldDimension;
        health: string;
        detail: string;
        license: string;
        stub: boolean;
        lastUpdate: string | null;
      }>;
    }
  | null = null;
const HEALTH_TTL_MS = 25_000;

async function probeWorldHealth() {
  if (healthCache && Date.now() - healthCache.at < HEALTH_TTL_MS) {
    return healthCache.rows.map((r) => ({ ...r }));
  }
  const rows = await Promise.all(
    WORLD_ADAPTERS.map(async (a) => {
      const h = await a.healthCheck();
      return {
        id: a.id,
        dimension: a.dimension,
        health: h.health,
        detail: h.detail,
        license: a.license,
        stub: Boolean(a.stub),
        lastUpdate: a.getTimestamp(),
      };
    }),
  );
  healthCache = { at: Date.now(), rows };
  return rows.map((r) => ({ ...r }));
}

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
          const probeOnly = url.searchParams.get("probe") === "health";

          const health = await probeWorldHealth();

          const objects = [];
          if (!probeOnly) {
            const active = WORLD_ADAPTERS.filter((a) => a.dimension === dimension && !a.stub);
            for (const adapter of active) {
              const h = health.find((x) => x.id === adapter.id);
              // Only ONLINE / DEGRADED may attempt fetch — never invent for OFFLINE / AUTH_DEPENDENT
              if (!h || h.health === "OFFLINE" || h.health === "AUTH_DEPENDENT") continue;
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
                  // Invalidate cache so next probe sees degraded truth
                  healthCache = null;
                }
              }
            }
          }

          return Response.json(
            {
              status: "success",
              dimension,
              indiaMode,
              probeOnly,
              retrievedAt: new Date().toISOString(),
              health,
              objects,
              note: "Counts are source-derived only. OFFLINE / AUTH_DEPENDENT dimensions invent nothing.",
            },
            { headers: CORS },
          );
        }

        if (kind === "kernel" || kind === "health") {
          return Response.json(
            {
              status: "ok",
              service: "information-kernel",
              retrievedAt: new Date().toISOString(),
              sources: getKernelRegistryPublic(),
              forensicWorkers: getPublicWorkerStatuses().map((w) => ({
                id: w.id,
                label: w.label,
                health: w.health,
                detail: w.detail,
              })),
              note: "Registry health is capability truth — not live probe of every upstream host.",
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
              world: "GET /api/intelligence?kind=world&dimension=EARTH&india=0|1&probe=health",
              kernel: "GET /api/intelligence?kind=kernel",
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
