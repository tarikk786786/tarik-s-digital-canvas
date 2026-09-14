import { useEffect, useState } from "react";
import { SystemIndicator, TechnicalLabel, LiveTimestamp } from "@/components/system";
import type { SystemHealth } from "@/lib/kernel/model";
import { getRegistryHealthSummary } from "@/lib/forensic/registry";
import { getKernelRegistryPublic } from "@/lib/intelligence/registry";

interface HealthRow {
  id: string;
  label: string;
  health: SystemHealth | string;
  detail: string;
}

/**
 * Honest lab health — probes real endpoints; never invents LIVE counters.
 */
export function SystemStatusBar({ className }: { className?: string }) {
  const [rows, setRows] = useState<HealthRow[]>([
    {
      id: "kernel",
      label: "Information Kernel",
      health: "PROCESSING",
      detail: "Probing…",
    },
    {
      id: "world",
      label: "World adapters",
      health: "PROCESSING",
      detail: "Probing…",
    },
  ]);
  const [at, setAt] = useState(new Date().toISOString());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next: HealthRow[] = [];
      try {
        const res = await fetch("/api/intelligence?kind=kernel", {
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
          next.push({
            id: "kernel",
            label: "Information Kernel",
            health: "DEGRADED",
            detail: `HTTP ${res.status}`,
          });
        } else {
          const json = (await res.json()) as {
            sources?: Array<{ health: string }>;
          };
          const sources = json.sources ?? getKernelRegistryPublic();
          const online = sources.filter((s) => s.health === "ONLINE").length;
          const auth = sources.filter(
            (s) => s.health === "AUTH_DEPENDENT" || s.health === "AUTH_REQUIRED",
          ).length;
          next.push({
            id: "kernel",
            label: "Information Kernel",
            health: online > 0 ? "ONLINE" : "DEGRADED",
            detail: `${online} public collectors · ${auth} AUTH_DEPENDENT (source registry)`,
          });
        }
      } catch {
        next.push({
          id: "kernel",
          label: "Information Kernel",
          health: "OFFLINE",
          detail: "API unreachable",
        });
      }
      try {
        const res = await fetch(
          "/api/intelligence?kind=world&dimension=EARTH&probe=health",
          { signal: AbortSignal.timeout(15000) },
        );
        if (!res.ok) {
          next.push({
            id: "world",
            label: "World adapters",
            health: "DEGRADED",
            detail: `HTTP ${res.status}`,
          });
        } else {
          const json = (await res.json()) as {
            health?: Array<{ health: string; stub?: boolean }>;
          };
          const live = (json.health ?? []).filter((h) => !h.stub);
          const online = live.filter((h) => h.health === "ONLINE" || h.health === "AVAILABLE")
            .length;
          const degraded = live.filter((h) => h.health === "DEGRADED").length;
          const offline = live.filter((h) => h.health === "OFFLINE").length;
          const auth = (json.health ?? []).filter((h) => h.health === "AUTH_DEPENDENT").length;
          next.push({
            id: "world",
            label: "World adapters",
            health:
              online > 0 && degraded === 0 && offline === 0
                ? "ONLINE"
                : online > 0 || degraded > 0
                  ? "DEGRADED"
                  : "OFFLINE",
            detail: `${online} online · ${degraded} degraded · ${offline} offline · ${auth} auth-dependent`,
          });
        }
      } catch {
        next.push({
          id: "world",
          label: "World adapters",
          health: "OFFLINE",
          detail: "World probe failed",
        });
      }

      const forensic = getRegistryHealthSummary();
      const pending = forensic.counts.WORKER_PENDING ?? 0;
      next.push({
        id: "forensic-workers",
        label: "Forensic capability map",
        health: forensic.online.length > 0 ? "ONLINE" : "WORKER_PENDING",
        detail: `${forensic.online.length} browser modules online · ${pending} workers pending (no Autopsy stack install)`,
      });

      if (!cancelled) {
        setRows(next);
        setAt(new Date().toISOString());
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/40 px-4 py-3 ${className || ""}`}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <TechnicalLabel className="text-[#62E6FF]">System health</TechnicalLabel>
        <LiveTimestamp iso={at} prefix="Checked" />
      </div>
      <ul className="flex flex-wrap gap-3">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground">{r.label}</span>
            <SystemIndicator health={r.health} />
            <span className="hidden font-mono text-[9px] text-muted-foreground/80 sm:inline">
              {r.detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
