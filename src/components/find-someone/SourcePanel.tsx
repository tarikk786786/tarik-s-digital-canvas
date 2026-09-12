import { useState } from "react";
import {
  ExternalLink,
  Globe,
  Landmark,
  FileText,
  Newspaper,
  Database,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { SourceQuality } from "./SourceQuality";
import type { Source, Evidence } from "@/lib/find-someone/types";

interface SourcePanelProps {
  sources: Source[];
  evidenceList: Evidence[];
  onSelectSource?: (source: Source) => void;
}

export function SourcePanel({ sources, evidenceList, onSelectSource }: SourcePanelProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredSources = filter === "all" ? sources : sources.filter((s) => s.type === filter);

  const getSourceIcon = (type: Source["type"]) => {
    switch (type) {
      case "government":
        return <Landmark className="size-4 text-[#62E6FF]" />;
      case "document":
        return <FileText className="size-4 text-[#6EE7B7]" />;
      case "news":
        return <Newspaper className="size-4 text-amber-400" />;
      case "database":
        return <Database className="size-4 text-[#9B8CFF]" />;
      default:
        return <Globe className="size-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Type filters */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
        {[
          { id: "all", label: "All Sources" },
          { id: "government", label: "Government" },
          { id: "document", label: "Primary Documents" },
          { id: "news", label: "News & Media" },
          { id: "profile", label: "Public Profiles" },
          { id: "database", label: "Databases" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
              filter === tab.id
                ? "bg-[#62E6FF]/15 text-[#62E6FF] border border-[#62E6FF]/30 font-bold"
                : "border border-white/5 bg-white/[0.02] text-muted-foreground hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Source Cards */}
      <div className="grid gap-3">
        {filteredSources.map((source) => {
          const associatedEvidence = evidenceList.filter((e) => e.sourceId === source.id);

          return (
            <div
              key={source.id}
              onClick={() => onSelectSource?.(source)}
              className="rounded-xl border border-white/10 bg-white/[0.025] p-4.5 hover:border-white/20 hover:bg-white/[0.04] transition-all backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                    {getSourceIcon(source.type)}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-foreground">
                      {source.name}
                    </h4>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      Publisher: {source.publisher || source.domain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <SourceQuality tier={source.qualityTier} />
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 font-mono text-[11px] text-[#62E6FF] hover:underline"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              {/* Extracted Evidence Excerpts */}
              {associatedEvidence.length > 0 && (
                <div className="mt-3.5 space-y-2 pt-3 border-t border-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Corroborated Artifacts ({associatedEvidence.length})
                  </span>
                  {associatedEvidence.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-md border border-white/5 bg-black/30 p-2.5 font-mono text-[11px] text-foreground/90 leading-relaxed"
                    >
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                        <span className="text-[#6EE7B7]">Extract #{ev.id}</span>
                        <span>Confidence: {ev.confidence}%</span>
                      </div>
                      "{ev.extractedText}"
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2">
                <span>Verified: {source.lastVerified}</span>
                <span className="text-muted-foreground/60">{source.domain}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
