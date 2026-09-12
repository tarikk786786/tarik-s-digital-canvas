import { useMemo, useState } from "react";
import { ExternalLink, Search, Shield, Layers, MapPin, ArrowRight } from "lucide-react";
import {
  INTELLIGENCE_TOOLS,
  SHORTLIST_TOOLS,
  TOOL_FAMILIES,
  INDIA_SOURCE_MATRIX,
  ROUTER_LAYERS,
  type ToolFamily,
  type IntelligenceTool,
} from "@/content/osint-tools";
import { soundEngine } from "@/lib/sound-engine";

export function OsintArsenal() {
  const [family, setFamily] = useState<ToolFamily | "all">("all");
  const [query, setQuery] = useState("");
  const [shortlistOnly, setShortlistOnly] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(SHORTLIST_TOOLS[0]?.id ?? "searxng");

  const filtered = useMemo(() => {
    const pool = shortlistOnly ? SHORTLIST_TOOLS : INTELLIGENCE_TOOLS;
    return pool.filter((tool) => {
      const matchesFamily = family === "all" || tool.family === family;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.purpose.toLowerCase().includes(q) ||
        tool.family.includes(q);
      return matchesFamily && matchesQuery;
    });
  }, [family, query, shortlistOnly]);

  const selected: IntelligenceTool =
    filtered.find((t) => t.id === selectedId) || filtered[0] || INTELLIGENCE_TOOLS[0];

  const link = selected.githubUrl || selected.sourceUrl;

  return (
    <div id="osint" className="space-y-10">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#62E6FF] mb-3">
          Hidden engines · India-first
        </p>
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Information-gathering stack behind FIND DETAILS
        </h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Visitors only see FIND DETAILS. Behind the router sit curated open-source engines
          plus Indian public-data adapters. Open-source does not mean every API or live feed
          is free — credentials and rate limits stay on the worker host. Never install all
          493 catalogue repos; ship ~30–50 shortlisted engines.
        </p>
      </div>

      {/* Router diagram */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">
          Intelligence router (internal)
        </p>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#62E6FF] mb-6">
          <span className="rounded-full border border-[#62E6FF]/30 px-3 py-1">Any input</span>
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <span className="rounded-full border border-white/15 px-3 py-1 text-foreground">Router</span>
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <span className="rounded-full border border-white/15 px-3 py-1 text-foreground">
            Evidence · Graph · Timeline
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ROUTER_LAYERS.map((layer) => (
            <div key={layer.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF]">
                {layer.label}
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                {layer.activates.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* India matrix */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="size-4 text-[#62E6FF]" />
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            India public-source matrix
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INDIA_SOURCE_MATRIX.map((row) => (
            <div
              key={row.domain}
              className="flex items-start justify-between gap-3 rounded-lg border border-white/5 bg-black/20 px-4 py-3"
            >
              <span className="text-sm text-foreground">{row.domain}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground text-right shrink-0">
                {row.source}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Official portals are data adapters, not GitHub projects. No private Aadhaar / PAN /
          subscriber tracking. Cell towers are infrastructure — never live device location.
        </p>
      </div>

      {/* Inventory browser */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0D12] overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-[#62E6FF]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
              Engine inventory · {filtered.length} shown
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <input
                type="checkbox"
                checked={shortlistOnly}
                onChange={(e) => {
                  soundEngine.playClick();
                  setShortlistOnly(e.target.checked);
                }}
                className="accent-[#62E6FF]"
              />
              Production shortlist only
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter engines…"
                className="w-56 rounded-lg border border-white/10 bg-black/40 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#62E6FF]/40"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-4 py-3 border-b border-white/5 scrollbar-none">
          {TOOL_FAMILIES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setFamily(f.id);
              }}
              className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                family === f.id
                  ? "bg-[#62E6FF] text-[#050608] font-bold"
                  : "border border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[28rem]">
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 max-h-[28rem] overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No engines match this filter.</p>
            ) : (
              filtered.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedId(tool.id);
                  }}
                  className={`w-full text-left px-5 py-3.5 border-b border-white/5 transition-colors ${
                    selected?.id === tool.id
                      ? "bg-[#62E6FF]/10 border-l-2 border-l-[#62E6FF]"
                      : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground">{tool.name}</span>
                    {tool.shortlist && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#62E6FF]">
                        Core
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.purpose}</p>
                </button>
              ))
            )}
          </div>

          <div className="lg:col-span-7 p-6 md:p-8 space-y-5">
            {selected && (
              <>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF]">
                    {selected.family}
                    {selected.kind === "india-source" ? " · India adapter" : ""}
                    {selected.kind === "reference" ? " · Catalogue" : ""}
                  </p>
                  <h4 className="mt-2 font-display text-2xl font-bold tracking-tight">
                    {selected.name}
                  </h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {selected.purpose}
                  </p>
                </div>

                {selected.constraint && (
                  <div className="flex gap-2 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
                    <Shield className="size-4 shrink-0 mt-0.5" />
                    <span>{selected.constraint}</span>
                  </div>
                )}

                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#62E6FF] hover:underline"
                  >
                    {selected.githubUrl ? "Repository" : "Official source"}
                    <ExternalLink className="size-3.5" />
                  </a>
                )}

                <p className="text-xs text-muted-foreground border-t border-white/10 pt-5">
                  FIND DETAILS never shows this name in the visitor chrome. The router selects
                  engines; the evidence panel shows provenance, not tool directories.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
