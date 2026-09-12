import {
  ArrowRight,
  Database,
  Search,
  Shield,
  Cpu,
  GitFork,
  FileCode,
  CheckCircle2,
} from "lucide-react";

export function ArchitectureDiagram() {
  const pipelineStages = [
    {
      stage: "01. INGESTION",
      title: "Query Understanding",
      desc: "Natural language entity classification, IndicLID dialect detection, Romanized/Indic transliteration via IndicXlit.",
      tools: ["IndicLID", "IndicXlit", "Unicode Normalizer"],
      color: "border-[#62E6FF]/40 text-[#62E6FF]",
    },
    {
      stage: "02. RECONNAISSANCE",
      title: "Public Source Discovery",
      desc: "Federated metasearch through SearXNG, username profiling across Sherlock & Maigret, public repos via GitHub API.",
      tools: ["SearXNG", "Sherlock", "Maigret", "theHarvester"],
      color: "border-[#9B8CFF]/40 text-[#9B8CFF]",
    },
    {
      stage: "03. DOCUMENT INTEL",
      title: "Docling & OCR Extraction",
      desc: "Text layer parsing, layout analysis, table extraction, and statutory gazette OCR via Tesseract & PaddleOCR.",
      tools: ["Docling", "PyMuPDF", "Tika", "PaddleOCR"],
      color: "border-[#6EE7B7]/40 text-[#6EE7B7]",
    },
    {
      stage: "04. INDIAN DATA",
      title: "Sovereign Open Registries",
      desc: "Connecting permitted national portals: data.gov.in, MCA corporate filings, judicial archives, state startup registries.",
      tools: ["data.gov.in", "MCA21 API", "Court Judgments", "Geospatial PostGIS"],
      color: "border-amber-400/40 text-amber-400",
    },
    {
      stage: "05. RESOLUTION",
      title: "Entity & Conflict Resolution",
      desc: "Multi-signal identity matching, cross-source contradiction detection, explicit audit trail preservation.",
      tools: ["GLiNER", "spaCy", "Scoring Engine", "Conflict Detector"],
      color: "border-pink-400/40 text-pink-400",
    },
    {
      stage: "06. SYNTHESIS",
      title: "Knowledge Graph & Report",
      desc: "Graph relationship storage in Neo4j, vector search in Qdrant, evidence chain generation, strict grounding.",
      tools: ["Neo4j", "Qdrant", "PostgreSQL", "OpenSearch"],
      color: "border-cyan-300/40 text-cyan-300",
    },
  ];

  return (
    <div
      id="architecture"
      className="rounded-2xl border border-white/10 bg-[#0A0D12]/90 p-6 sm:p-8 backdrop-blur-2xl space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#62E6FF] font-bold">
            ENTERPRISE RECONNAISSANCE STACK
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-1">
            Find Someone OSINT Pipeline Architecture
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <Shield className="size-3.5 text-[#6EE7B7]" />
          <span>Zero Hallucination · Strict Evidentiary Grounding</span>
        </div>
      </div>

      {/* Grid of pipeline stages */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pipelineStages.map((stg) => (
          <div
            key={stg.stage}
            className={`rounded-xl border bg-white/[0.02] p-4.5 space-y-3 transition-all hover:bg-white/[0.04] ${stg.color}`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] tracking-wider font-bold">
              <span>{stg.stage}</span>
              <CheckCircle2 className="size-3.5" />
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-foreground">{stg.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-sans">
                {stg.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {stg.tools.map((t) => (
                <span
                  key={t}
                  className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9.5px] text-foreground/80 border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Database & Infrastructure Layer */}
      <div className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Database className="size-4 text-[#62E6FF]" />
          <span>Multi-Engine Storage Topology:</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="text-[#62E6FF]">PostgreSQL (Canonical Entities)</span>
          <span className="text-white/20">/</span>
          <span className="text-[#9B8CFF]">Neo4j (Evidentiary Graph)</span>
          <span className="text-white/20">/</span>
          <span className="text-[#6EE7B7]">Qdrant (Vector Embeddings)</span>
          <span className="text-white/20">/</span>
          <span className="text-amber-400">OpenSearch (Full-Text Metasearch)</span>
        </div>
      </div>
    </div>
  );
}
