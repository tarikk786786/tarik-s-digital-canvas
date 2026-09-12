import { AlertTriangle, ExternalLink, HelpCircle } from "lucide-react";
import type { Conflict } from "@/lib/find-someone/types";

interface ConflictAlertProps {
  conflicts: Conflict[];
}

export function ConflictAlert({ conflicts }: ConflictAlertProps) {
  if (!conflicts || conflicts.length === 0) return null;

  return (
    <div className="space-y-4">
      {conflicts.map((conf) => (
        <div
          key={conf.id}
          className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-5 shadow-[0_8px_30px_rgba(245,158,11,0.1)] backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400">
              <AlertTriangle className="size-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-amber-400">
                  DISCREPANCY DETECTED // CONFLICTING EVIDENCE
                </span>
                <span className="rounded bg-amber-500/10 px-1.5 py-0.2 font-mono text-[9px] text-amber-400 border border-amber-500/20">
                  UNRESOLVED FACT
                </span>
              </div>
              <h4 className="font-display text-sm font-semibold text-foreground">{conf.field}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{conf.description}</p>
            </div>
          </div>

          {/* Side-by-side comparison */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* Source A */}
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                  PERSPECTIVE A // SELF-REPORTED
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Confidence: {conf.claimA.confidence}%
                </span>
              </div>
              <p className="font-medium text-xs text-foreground bg-white/5 p-2 rounded border border-white/5">
                {conf.claimA.object}
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                "{conf.claimA.evidenceText}"
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>Source: {conf.claimA.sourceId}</span>
                <span className="text-[#62E6FF]">View Origin</span>
              </div>
            </div>

            {/* Source B */}
            <div className="rounded-lg border border-[#62E6FF]/30 bg-[#62E6FF]/[0.02] p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#62E6FF] font-bold">
                  PERSPECTIVE B // STATUTORY ARCHIVE
                </span>
                <span className="font-mono text-[10px] text-[#6EE7B7]">
                  Confidence: {conf.claimB.confidence}%
                </span>
              </div>
              <p className="font-medium text-xs text-foreground bg-[#62E6FF]/10 p-2 rounded border border-[#62E6FF]/20">
                {conf.claimB.object}
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                "{conf.claimB.evidenceText}"
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>Source: {conf.claimB.sourceId}</span>
                <span className="text-[#62E6FF]">Statutory Proof</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-white/5 px-3 py-2 rounded">
            <HelpCircle className="size-3.5 text-[#62E6FF] shrink-0" />
            <span>
              Ethical OSINT Principle: The system will never silently override a conflicting data
              point without corroborating legal documentation.
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
