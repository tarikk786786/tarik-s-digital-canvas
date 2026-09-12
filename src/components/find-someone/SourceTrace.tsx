import { useState } from "react";
import { HelpCircle, ExternalLink, Link2, FileSearch, ChevronDown, ChevronUp } from "lucide-react";
import { SourceQuality } from "./SourceQuality";
import type { Source, Evidence } from "@/lib/find-someone/types";

interface SourceTraceProps {
  source: Source;
  evidence?: Evidence;
  reason?: string;
}

export function SourceTrace({
  source,
  evidence,
  reason = "Name match & organization co-occurrence",
}: SourceTraceProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#62E6FF] hover:underline cursor-pointer"
        >
          <HelpCircle className="size-3" />
          <span>Why am I seeing this source?</span>
          {open ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>

        <SourceQuality tier={source.qualityTier} compact />
      </div>

      {open && (
        <div className="mt-3 space-y-2.5 pt-3 border-t border-white/5 font-sans">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-muted-foreground block">
              Origin & Attribution Path:
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-foreground">
              <Link2 className="size-3 text-[#62E6FF] shrink-0" />
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#62E6FF] hover:underline truncate max-w-[400px] flex items-center gap-1"
              >
                <span>{source.name}</span>
                <ExternalLink className="size-2.5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-muted-foreground block">
              Discovery Rationale:
            </span>
            <p className="text-[11px] text-muted-foreground bg-white/5 p-2 rounded border border-white/5">
              {reason}
            </p>
          </div>

          {evidence && (
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                Extracted Evidentiary Snippet:
              </span>
              <p className="text-[11px] italic text-[#EDEEF1] bg-black/40 p-2.5 rounded border border-white/10 font-mono">
                "{evidence.extractedText}"
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1">
                <span>Retrieved: {source.retrievedAt}</span>
                <span>Extraction Confidence: {evidence.confidence}%</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
