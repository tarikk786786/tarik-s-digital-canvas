import {
  ArrowDown,
  Link2,
  Clock,
  CheckCircle2,
  ShieldAlert,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ConfidenceBar } from "./ConfidenceBar";
import type { Claim, Source, Evidence } from "@/lib/find-someone/types";

interface EvidenceChainProps {
  claims: Claim[];
  sources: Source[];
  evidenceList: Evidence[];
}

export function EvidenceChain({ claims, sources, evidenceList }: EvidenceChainProps) {
  const getSourceById = (id: string) => sources.find((s) => s.id === id);
  const getEvidenceById = (id: string) => evidenceList.find((e) => e.id === id);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-xs font-mono text-muted-foreground">
        <span className="text-[#62E6FF] font-bold block uppercase tracking-wider mb-1">
          CHAIN OF CUSTODY PIPELINE (ISO/IEC 27037 & NIST SP 800-86)
        </span>
        Every proposition is explicitly linked to an unalterable chain: Proposition → Public Source
        → Document/URL → Extracted Passage → Timestamp → Audit Confidence.
      </div>

      <div className="space-y-6">
        {claims.map((claim, index) => {
          const source = getSourceById(claim.sourceId);
          const evidence = getEvidenceById(claim.evidenceId);

          return (
            <div
              key={claim.id}
              className="rounded-xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] space-y-4"
            >
              {/* Top: Claim header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="rounded bg-[#62E6FF]/10 text-[#62E6FF] px-2 py-0.5 border border-[#62E6FF]/20 font-bold">
                    CLAIM #{index + 1}
                  </span>
                  <span className="font-bold text-foreground">{claim.subject}</span>
                  <span className="text-[#62E6FF]">[{claim.predicate.replace(/_/g, " ")}]</span>
                  <span className="text-foreground">{claim.object}</span>
                </div>

                <span className="font-mono text-[11px] text-[#6EE7B7]">
                  Confidence: {claim.confidence}%
                </span>
              </div>

              {/* Visual Vertical Pipeline Chain */}
              <div className="space-y-3 font-mono text-xs pl-2 sm:pl-4 border-l-2 border-[#62E6FF]/30">
                {/* 1. Source Origin */}
                <div className="relative space-y-1">
                  <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                    1. Primary Public Source
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <FileText className="size-3.5 text-[#62E6FF]" />
                    <span>{source ? source.name : claim.sourceId}</span>
                  </div>
                </div>

                <ArrowDown className="size-3 text-muted-foreground/40 ml-1" />

                {/* 2. Public URL / Repository Path */}
                {source && (
                  <>
                    <div className="relative space-y-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                        2. Verified Public URL
                      </span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[#62E6FF] hover:underline truncate max-w-[600px]"
                      >
                        <Link2 className="size-3" />
                        <span>{source.url}</span>
                        <ExternalLink className="size-2.5" />
                      </a>
                    </div>
                    <ArrowDown className="size-3 text-muted-foreground/40 ml-1" />
                  </>
                )}

                {/* 3. Extracted Text Passage */}
                <div className="relative space-y-1">
                  <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">
                    3. Exact Extracted Passage
                  </span>
                  <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-foreground/90 font-mono text-[11.5px] leading-relaxed italic">
                    "
                    {claim.evidenceText ||
                      (evidence ? evidence.extractedText : "Direct attribution record")}
                    "
                  </div>
                </div>

                <ArrowDown className="size-3 text-muted-foreground/40 ml-1" />

                {/* 4. Timestamp & Verification Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10.5px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3 text-[#9B8CFF]" />
                    <span>Extracted At: {claim.extractedAt}</span>
                  </span>

                  <span className="rounded bg-white/5 px-2 py-0.5 border border-white/10">
                    Status: {claim.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
