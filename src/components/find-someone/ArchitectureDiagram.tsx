import { Shield } from "lucide-react";

/**
 * Capability-facing pipeline diagram — no engine/tool brand names in visitor chrome.
 */
export function ArchitectureDiagram() {
  const pipelineStages = [
    {
      stage: "01. INGESTION",
      title: "Query Understanding",
      desc: "Natural-language entity classification, Indic script / dialect detection, and Unicode normalization before collection.",
      tools: ["Entity classify", "Indic normalize", "Input sanitize"],
      color: "border-[#62E6FF]/40 text-[#62E6FF]",
    },
    {
      stage: "02. DISCOVERY",
      title: "Public Source Collection",
      desc: "Hidden adapters query public DNS, registration directories, certificate logs, archives, and AUTH_DEPENDENT portals when online.",
      tools: ["DNS / RDAP", "CT / Archive", "AUTH_DEPENDENT"],
      color: "border-[#9B8CFF]/40 text-[#9B8CFF]",
    },
    {
      stage: "03. DOCUMENTS",
      title: "Document Extraction",
      desc: "Working-copy text extraction and OCR workers when provisioned. Uploads stay quarantined — never execute in the web process.",
      tools: ["Text extract", "OCR (pending)", "Quarantine"],
      color: "border-[#6EE7B7]/40 text-[#6EE7B7]",
    },
    {
      stage: "04. INDIA LAYER",
      title: "Sovereign Open Registries",
      desc: "Permitted national portals when lawfully reachable. Corporate / judicial adapters stay AUTH_DEPENDENT until interactive auth is available.",
      tools: ["Corporate", "Judicial", "Geospatial"],
      color: "border-amber-400/40 text-amber-400",
    },
    {
      stage: "05. RESOLUTION",
      title: "Entity & Conflict Resolution",
      desc: "Multi-signal identity matching, cross-source contradiction detection, and explicit audit trail preservation.",
      tools: ["Match scoring", "Conflict flag", "Audit trail"],
      color: "border-pink-400/40 text-pink-400",
    },
    {
      stage: "06. SYNTHESIS",
      title: "Evidence · Graph · Report",
      desc: "Evidence cards with provenance, relationship graph, timeline, and grounded report export — no fabricated LIVE counters.",
      tools: ["Evidence", "Graph", "Report"],
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
            INFORMATION KERNEL PIPELINE
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-1">
            FIND DETAILS — how collection is planned
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <Shield className="size-3.5 text-[#6EE7B7]" />
          <span>Evidence over assumptions · adapters stay hidden</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pipelineStages.map((stg) => (
          <article
            key={stg.stage}
            className={`rounded-xl border bg-black/30 p-4 space-y-3 ${stg.color.split(" ")[0]}`}
          >
            <p className={`font-mono text-[10px] uppercase tracking-widest ${stg.color.split(" ").slice(1).join(" ")}`}>
              {stg.stage}
            </p>
            <h4 className="font-display text-base font-bold text-foreground">{stg.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{stg.desc}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {stg.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
