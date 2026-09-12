import {
  FileText,
  Calendar,
  Building2,
  BookOpen,
  Key,
  CheckCircle2,
  Upload,
  ExternalLink,
} from "lucide-react";
import type { DocumentIntelligence } from "@/lib/find-someone/types";

interface DocumentViewProps {
  document: DocumentIntelligence;
  onUploadNew?: () => void;
}

export function DocumentView({ document, onUploadNew }: DocumentViewProps) {
  return (
    <div className="space-y-6">
      {/* Document Header Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-[#6EE7B7]/40 bg-[#0E121A] text-[#6EE7B7] shadow-[0_0_24px_rgba(110,231,183,0.25)]">
              <FileText className="size-7" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6EE7B7] font-bold">
                DOCUMENT INTELLIGENCE & OCR EXTRACTION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {document.title}
              </h2>
              {document.authorContext && (
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  Extracted Authorship: {document.authorContext}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onUploadNew}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-foreground hover:bg-white/10 transition-all cursor-pointer"
          >
            <Upload className="size-3.5" />
            <span>Analyze Another Document</span>
          </button>
        </div>

        {/* Metadata Strip */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-white/5 font-mono text-xs text-muted-foreground">
          <div>
            <span className="text-[10px] uppercase block text-muted-foreground/60">
              Document Format
            </span>
            <span className="text-foreground font-semibold">{document.documentType}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase block text-muted-foreground/60">
              Length & Volume
            </span>
            <span className="text-foreground font-semibold">
              {document.pageCount} Pages ({document.fileSize})
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase block text-muted-foreground/60">
              Language Pipeline
            </span>
            <span className="text-foreground font-semibold">{document.detectedLanguage}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase block text-muted-foreground/60">
              OCR Verification
            </span>
            <span className="text-[#6EE7B7] font-semibold">Clean Text Layer Extracted</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Key Findings, Extracted Entities, Timeline */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): Key Findings & Timeline Excerpts */}
        <div className="space-y-6 lg:col-span-7">
          {/* Key Findings */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <h4 className="font-display text-sm font-bold text-foreground">
              Synthesized Key Findings & Evidentiary Claims
            </h4>
            <div className="space-y-2">
              {document.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs leading-relaxed"
                >
                  <CheckCircle2 className="size-4 text-[#6EE7B7] shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Timeline Excerpts */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-[#62E6FF]" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Dates & Temporal Events Identified in Document
              </h4>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {document.timelineExcerpts.map((tl, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
                >
                  <span className="text-[#62E6FF] font-bold">{tl.date}</span>
                  <span className="text-muted-foreground text-[11px] truncate max-w-[400px]">
                    {tl.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Extracted Entities & Cited Sources */}
        <div className="space-y-6 lg:col-span-5">
          {/* Extracted Entities */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <h4 className="font-display text-sm font-bold text-foreground">
              Extracted Entities & Term Frequencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {document.extractedEntities.map((ent) => (
                <div
                  key={ent.name}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs"
                >
                  <span className="text-muted-foreground text-[10px]">{ent.type}:</span>
                  <span className="text-foreground font-semibold">{ent.name}</span>
                  <span className="rounded bg-[#62E6FF]/20 px-1 py-0.2 text-[9.5px] text-[#62E6FF]">
                    {ent.frequency}×
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Organizations Mentioned */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-[#9B8CFF]" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Organizations Co-Occurring
              </h4>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {document.organizationsMentioned.map((org) => (
                <div key={org} className="rounded bg-white/5 p-2 text-foreground">
                  {org}
                </div>
              ))}
            </div>
          </div>

          {/* Referenced Sources */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-amber-400" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Referenced Legal & Academic Citations
              </h4>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-muted-foreground">
              {document.referencedSources.map((ref, idx) => (
                <div key={idx} className="rounded bg-white/5 p-2 leading-snug">
                  {ref}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
