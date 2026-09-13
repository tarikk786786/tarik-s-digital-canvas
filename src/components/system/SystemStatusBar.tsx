import { useEffect, useState } from "react";
import { SystemIndicator, TechnicalLabel, LiveTimestamp } from "@/components/system";
import type { SystemHealth } from "@/lib/kernel/model";

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
        const res = await fetch("/api/intelligence", { signal: AbortSignal.timeout(8000) });
        next.push({
          id: "kernel",
          label: "Information Kernel",
          health: res.ok ? "ONLINE" : "DEGRADED",
          detail: res.ok ? "API reachable" : `HTTP ${res.status}`,
        });
      } catch {
        next.push({
          id: "kernel",
          label: "Information Kernel",
          health: "OFFLINE",
          detail: "API unreachable",
        });
      }
      try {
        const res = await fetch("/api/intelligence?kind=world&dimension=EARTH", {
          signal: AbortSignal.timeout(12000),
        });
        if (!res.ok) {
          next.push({
            id: "world",
            label: "World adapters",
            health: "DEGRADED",
            detail: `HTTP ${res.status}`,
          });
        } else {
          const json = (await res.json()) as {
            health?: Array<{ health: string }>;
          };
          const statuses = json.health?.map((h) => h.health) ?? [];
          const online = statuses.filter((h) => h === "ONLINE" || h === "AVAILABLE").length;
          const offline = statuses.filter((h) => h === "OFFLINE").length;
          next.push({
            id: "world",
            label: "World adapters",
            health:
              online > 0 && offline === 0
                ? "ONLINE"
                : online > 0
                  ? "DEGRADED"
                  : "OFFLINE",
            detail: `${online} online · ${offline} offline (source-derived)`,
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
      next.push({
        id: "forensic-workers",
        label: "Forensic workers",
        health: "WORKER_PENDING",
        detail: "Heavy workers not on this host — capability map only",
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
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <TechnicalLabel className="text-[#62E6FF]">System health</TechnicalLabel>
        <LiveTimestamp iso={at} prefix="Checked" />
      </div>
      <ul className="flex flex-wrap gap-3">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground">{r.label}</span>
            <SystemIndicator health={r.health} />
            <span className="hidden sm:inline font-mono text-[9px] text-muted-foreground/80">
              {r.detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
