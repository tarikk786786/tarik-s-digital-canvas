import { useState } from "react";
import { CheckCircle2, AlertCircle, Info, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import type { IdentityMatch } from "@/lib/find-someone/types";

interface IdentityExplainerProps {
  match: IdentityMatch;
}

export function IdentityExplainer({ match }: IdentityExplainerProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-[#9B8CFF]/30 bg-[#9B8CFF]/[0.03] p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(155,140,255,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-lg bg-[#9B8CFF]/15 text-[#9B8CFF] border border-[#9B8CFF]/30">
            <Sparkles className="size-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#9B8CFF] font-bold">
              IDENTITY RESOLUTION REASONING
            </span>
            <h4 className="font-display text-sm font-bold text-foreground">
              Why do we link these public profiles to the same person?
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 font-mono text-[11px] text-[#9B8CFF] hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-white/5"
        >
          <span>{expanded ? "Collapse" : "Explain Match"}</span>
          {expanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-5 space-y-4">
          {/* Natural Language Conclusion */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground leading-relaxed">
            <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[#62E6FF] font-bold mb-1.5">
              <Info className="size-3 text-[#62E6FF]" />
              <span>Attribution Synthesis</span>
            </div>
            {match.conclusion}
          </div>

          {/* Signals Breakdown */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Corroborating Evidence Signals ({match.signals.filter((s) => s.matching).length}{" "}
              Positive)
            </span>
            <div className="grid gap-2 sm:grid-cols-2">
              {match.signals.map((signal, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-xs"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#6EE7B7] mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground font-semibold">
                      {signal.type} Correlation ({signal.confidence}%)
                    </span>
                    <p className="text-[11px] text-muted-foreground">{signal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conflicting Signals */}
          {match.conflicts.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                Divergent / Conflicting Signals ({match.conflicts.length})
              </span>
              {match.conflicts.map((conf, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.03] p-2.5 text-xs text-amber-300"
                >
                  <AlertCircle className="size-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10.5px] uppercase font-bold text-amber-400">
                      {conf.type}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{conf.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2">
            <span>Aggregated Match Confidence: {match.overallConfidence}%</span>
            <span className="text-[#6EE7B7]">Non-Speculative Audit Trail</span>
          </div>
        </div>
      )}
    </div>
  );
}
