import { CheckCircle2, Loader2, Ban } from "lucide-react";

export interface PipelineStep {
  label: string;
  status: "completed" | "running" | "pending" | "unavailable";
}

interface LiveProgressProps {
  steps: PipelineStep[];
  targetQuery: string;
  isSearching: boolean;
  mode?: "demo" | "live";
}

export function LiveProgress({
  steps,
  targetQuery,
  isSearching,
  mode = "demo",
}: LiveProgressProps) {
  const allDone = !isSearching && steps.every((s) => s.status === "completed");
  const hasUnavailable = steps.some((s) => s.status === "unavailable");

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#07090D]/95 p-6 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.8)] font-mono text-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          {isSearching ? (
            <Loader2 className="size-4 animate-spin text-[#62E6FF]" />
          ) : hasUnavailable ? (
            <Ban className="size-4 text-muted-foreground" />
          ) : (
            <CheckCircle2 className="size-4 text-[#6EE7B7]" />
          )}
          <span className="font-display font-bold uppercase tracking-wider text-foreground text-sm">
            {mode === "live"
              ? isSearching
                ? "LIVE KERNEL · COLLECTING"
                : hasUnavailable
                  ? "LIVE KERNEL · PARTIAL / AUTH_DEPENDENT"
                  : "LIVE KERNEL · PUBLIC COLLECTORS"
              : "DEMO SESSION · SCRIPTED DOSSIER"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
          <span>Target:</span>
          <span className="text-[#62E6FF] font-semibold truncate max-w-[200px]">
            "{targetQuery}"
          </span>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 pt-1">
        {steps.map((step) => {
          const isDone = step.status === "completed";
          const isRunning = step.status === "running";
          const isUnavailable = step.status === "unavailable";

          return (
            <div
              key={step.label}
              className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 transition-all ${
                isRunning
                  ? "border-[#62E6FF]/40 bg-[#62E6FF]/[0.06] text-white shadow-[0_0_12px_rgba(98,230,255,0.1)]"
                  : isUnavailable
                    ? "border-white/5 bg-transparent text-muted-foreground/50"
                    : isDone
                      ? "border-white/5 bg-white/[0.02] text-foreground"
                      : "border-white/5 bg-transparent text-muted-foreground/30"
              }`}
            >
              <span className="text-[11.5px] font-sans font-medium">{step.label}</span>
              {isDone ? (
                <CheckCircle2 className="size-3.5 text-[#6EE7B7] shrink-0" />
              ) : isRunning ? (
                <Loader2 className="size-3.5 animate-spin text-[#62E6FF] shrink-0" />
              ) : isUnavailable ? (
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 shrink-0">
                  Offline
                </span>
              ) : (
                <span className="text-[10px] text-muted-foreground/40 shrink-0">...</span>
              )}
            </div>
          );
        })}
      </div>

      {allDone && mode === "demo" && (
        <p className="text-[10px] text-muted-foreground/70 pt-1">
          Demo pipeline finished — dossier is scripted for portfolio review.
        </p>
      )}
      {hasUnavailable && mode === "live" && (
        <p className="text-[10px] text-muted-foreground/70 pt-1">
          Public-web search workers are not connected. No completed report was generated.
        </p>
      )}
    </div>
  );
}
