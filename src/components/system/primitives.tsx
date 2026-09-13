import type { ReactNode } from "react";
import type { Confidence, Freshness, SystemHealth } from "@/lib/kernel/model";
import { cn } from "@/lib/utils";

export function TechnicalLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

const HEALTH_STYLES: Record<SystemHealth | string, string> = {
  ONLINE: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  PROCESSING: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  DEGRADED: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  AUTH_REQUIRED: "border-violet-500/40 bg-violet-500/10 text-violet-200",
  AUTH_DEPENDENT: "border-violet-500/40 bg-violet-500/10 text-violet-200",
  OFFLINE: "border-white/15 bg-white/5 text-muted-foreground",
  WORKER_PENDING: "border-orange-500/40 bg-orange-500/10 text-orange-200",
};

export function SystemIndicator({
  health,
  label,
  className,
}: {
  health: SystemHealth | string;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
        HEALTH_STYLES[health] || HEALTH_STYLES.OFFLINE,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {label || health.replace(/_/g, " ")}
    </span>
  );
}

export function LiveTimestamp({
  iso,
  prefix = "Retrieved",
  className,
}: {
  iso: string;
  prefix?: string;
  className?: string;
}) {
  const formatted = (() => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "medium",
      });
    } catch {
      return iso;
    }
  })();
  return (
    <time dateTime={iso} className={cn("font-mono text-[10px] text-muted-foreground", className)}>
      {prefix} · {formatted}
    </time>
  );
}

export function EvidenceBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#62E6FF]",
        className,
      )}
    >
      {children}
    </span>
  );
}

const CONFIDENCE_PCT: Record<Confidence, number> = {
  VERIFIED: 100,
  SUPPORTED: 80,
  PROBABLE: 60,
  UNCERTAIN: 40,
  CONFLICTING: 50,
  UNVERIFIED: 20,
};

const CONFIDENCE_COLOR: Record<Confidence, string> = {
  VERIFIED: "bg-emerald-400",
  SUPPORTED: "bg-sky-400",
  PROBABLE: "bg-amber-300",
  UNCERTAIN: "bg-orange-400",
  CONFLICTING: "bg-red-400",
  UNVERIFIED: "bg-white/40",
};

export function ConfidenceMeter({
  confidence,
  className,
}: {
  confidence: Confidence;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between gap-2">
        <TechnicalLabel>Confidence</TechnicalLabel>
        <span className="font-mono text-[10px] text-foreground">{confidence}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full", CONFIDENCE_COLOR[confidence])}
          style={{ width: `${CONFIDENCE_PCT[confidence]}%` }}
        />
      </div>
    </div>
  );
}

export function SourceBadge({
  label,
  freshness,
  className,
}: {
  label: string;
  freshness?: Freshness;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1",
        className,
      )}
    >
      <span className="font-mono text-[10px] text-foreground/90">{label}</span>
      {freshness && (
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          {freshness}
        </span>
      )}
    </span>
  );
}

export function DataPanel({
  title,
  children,
  className,
  eyebrow,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-white/10 bg-[#0A0D12] p-5 md:p-6", className)}>
      {eyebrow && <TechnicalLabel className="mb-2 block text-[#62E6FF]">{eyebrow}</TechnicalLabel>}
      <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function DiagnosticPanel({
  title,
  rows,
  className,
}: {
  title: string;
  rows: Array<{ label: string; value: string; health?: SystemHealth | string }>;
  className?: string;
}) {
  return (
    <DataPanel title={title} eyebrow="Diagnostics" className={className}>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/5 px-3 py-2"
          >
            <div>
              <p className="text-sm text-foreground">{row.label}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{row.value}</p>
            </div>
            {row.health && <SystemIndicator health={row.health} />}
          </li>
        ))}
      </ul>
    </DataPanel>
  );
}

export function TimelineEventRow({
  at,
  label,
  actor,
  className,
}: {
  at: string;
  label: string;
  actor?: string;
  className?: string;
}) {
  return (
    <li className={cn("border-l border-[#62E6FF]/40 pl-3", className)}>
      <p className="font-mono text-[10px] text-[#62E6FF]">{at}</p>
      <p className="text-sm">{label}</p>
      {actor && <p className="text-xs text-muted-foreground">{actor}</p>}
    </li>
  );
}

export function GraphNodeChip({
  label,
  type,
  className,
}: {
  label: string;
  type?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col rounded-xl border border-[#62E6FF]/30 bg-[#62E6FF]/5 px-3 py-2",
        className,
      )}
    >
      {type && <TechnicalLabel className="text-[#62E6FF]">{type}</TechnicalLabel>}
      <span className="text-sm font-medium">{label}</span>
    </span>
  );
}

export function EntityCard({
  label,
  type,
  attributes,
  className,
}: {
  label: string;
  type: string;
  attributes?: Record<string, string>;
  className?: string;
}) {
  return (
    <article className={cn("rounded-xl border border-white/10 bg-black/30 p-4", className)}>
      <TechnicalLabel className="text-[#62E6FF]">{type}</TechnicalLabel>
      <h4 className="mt-1 font-display text-base font-semibold">{label}</h4>
      {attributes && (
        <dl className="mt-3 space-y-1">
          {Object.entries(attributes).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2 text-xs">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-mono text-foreground/90 text-right">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

export function LabModule({
  code,
  title,
  description,
  href,
  className,
}: {
  code: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group block rounded-2xl border border-white/10 bg-[#0A0D12] p-5 transition-colors hover:border-[#62E6FF]/40",
        className,
      )}
    >
      <TechnicalLabel className="text-[#62E6FF]">Module {code}</TechnicalLabel>
      <h3 className="mt-2 font-display text-xl font-bold group-hover:text-[#62E6FF]">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </a>
  );
}

export function InvestigationProgress({
  phases,
  className,
}: {
  phases: Array<{ id: string; status: "completed" | "running" | "pending" | "skipped" }>;
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-wrap gap-2", className)}>
      {phases.map((p) => (
        <li key={p.id}>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider",
              p.status === "completed" && "border-emerald-500/40 text-emerald-300",
              p.status === "running" && "border-[#62E6FF]/40 text-[#62E6FF]",
              p.status === "pending" && "border-white/10 text-muted-foreground",
              p.status === "skipped" && "border-white/5 text-muted-foreground/60",
            )}
          >
            {p.id} · {p.status}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function WorldMarker({
  label,
  health,
  className,
}: {
  label: string;
  health: SystemHealth | string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5",
        className,
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">{label}</span>
      <SystemIndicator health={health} />
    </div>
  );
}
