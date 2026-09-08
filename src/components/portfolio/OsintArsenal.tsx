import { useState, useMemo } from "react";
import {
  Terminal,
  Search,
  Copy,
  Check,
  ExternalLink,
  Star,
  ShieldCheck,
  Layers,
  Filter,
  ArrowUpRight,
  Fingerprint,
  User,
  Mail,
  Phone,
  FileCode,
  Network,
  KeyRound,
  FileSearch,
  Sparkles,
  Command,
} from "lucide-react";
import {
  OSINT_TOOLS,
  OSINT_CATEGORIES,
  type OsintTool,
  type OsintCategory,
} from "@/content/osint-tools";
import { soundEngine } from "@/lib/sound-engine";

export function OsintArsenal() {
  const [selectedToolId, setSelectedToolId] = useState<string>("sherlock");
  const [activeCategory, setActiveCategory] = useState<OsintCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"terminal" | "grid">("terminal");

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return OSINT_TOOLS.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.targetVector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Active selected tool for terminal view
  const activeTool: OsintTool = useMemo(() => {
    const found = OSINT_TOOLS.find((t) => t.id === selectedToolId);
    return found || filteredTools[0] || OSINT_TOOLS[0];
  }, [selectedToolId, filteredTools]);

  const handleCopyCommand = (cmd: string, id: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "username":
        return User;
      case "email":
        return Mail;
      case "phone":
        return Phone;
      case "metadata":
        return FileSearch;
      case "network":
        return Network;
      case "breach":
        return KeyRound;
      default:
        return Terminal;
    }
  };

  return (
    <div className="w-full space-y-10">
      {/* Top Banner / Concept Header */}
      <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A0D12] via-[#0D1117] to-[#050608] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 size-80 bg-radial from-[#62E6FF]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#62E6FF]">
              <Fingerprint className="size-4" />
              <span>DIGITAL FOOTPRINT &amp; OSINT RECONNAISSANCE</span>
              <span className="px-2 py-0.5 rounded-full bg-[#6EE7B7]/10 text-[#6EE7B7] text-[10px] font-semibold border border-[#6EE7B7]/20">
                14 OPEN-SOURCE ARSENAL
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Curated Open-Source Intelligence Toolchain
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Forensic tools from GitHub designed for digital profiling, target footprinting, and forensic investigations. Used ethically to uncover accounts across 500+ services, parse image GPS metadata, discover registered phone carriers, and assemble verifiable evidence dossiers under ISO/IEC 27037 standards.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-[#050608] self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setViewMode("terminal");
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === "terminal"
                  ? "bg-[#62E6FF] text-[#050608] shadow-[0_0_15px_rgba(98,230,255,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="size-3.5" />
              <span>TERMINAL VIEW</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setViewMode("grid");
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === "grid"
                  ? "bg-[#62E6FF] text-[#050608] shadow-[0_0_15px_rgba(98,230,255,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="size-3.5" />
              <span>BENTO GRID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {OSINT_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.id);
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "border-[#62E6FF]/60 bg-[#62E6FF]/10 text-[#62E6FF] shadow-[0_0_12px_rgba(98,230,255,0.2)] font-bold"
                      : "border-white/10 bg-[#0A0D12] text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tool or vector..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-[#0A0D12] font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#62E6FF] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hover:text-foreground"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive Forensic Terminal Console */}
      {viewMode === "terminal" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tool Switcher Sidebar (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#0A0D12] p-3 space-y-2 max-h-[720px] overflow-y-auto scrollbar-thin">
            <div className="p-2 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span className="uppercase tracking-widest font-semibold text-[#62E6FF]">
                ARSENAL SELECTOR ({filteredTools.length})
              </span>
              <span>GITHUB RECON</span>
            </div>

            {filteredTools.map((tool) => {
              const isSelected = tool.id === activeTool.id;
              const Icon = getCategoryIcon(tool.category);
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedToolId(tool.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? "border-[#62E6FF]/50 bg-gradient-to-r from-[#62E6FF]/10 to-transparent shadow-[0_0_20px_rgba(98,230,255,0.15)]"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className={`size-3.5 ${isSelected ? "text-[#62E6FF]" : "text-muted-foreground"}`} />
                      <span className="font-display font-bold text-sm text-foreground">
                        {tool.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-white/5 text-[9px] font-mono text-muted-foreground">
                        {tool.stars}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[#9B8CFF] truncate max-w-[200px]">
                      {tool.targetVector}
                    </p>
                    <p className="font-sans text-[11px] text-muted-foreground line-clamp-1">
                      {tool.tagline}
                    </p>
                  </div>

                  {isSelected && (
                    <span className="size-2 rounded-full bg-[#62E6FF] animate-pulse mt-1 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Terminal Screen & Extracted Dossier (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Terminal Window */}
            <div className="rounded-2xl border border-white/15 bg-[#050608] shadow-2xl overflow-hidden font-mono">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-[#0A0D12] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#FF7070]/80" />
                  <span className="size-3 rounded-full bg-[#F6C85F]/80" />
                  <span className="size-3 rounded-full bg-[#6EE7B7]/80" />
                  <span className="ml-3 text-xs text-muted-foreground font-semibold">
                    tarik@forensic-node: ~/{activeTool.githubRepo}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 text-[10px] text-[#62E6FF]">
                    {activeTool.forensicStandard}
                  </span>
                  <a
                    href={activeTool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#62E6FF] hover:text-[#A5F3FC] transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              {/* Command Recipe Bar with 1-Click Copy */}
              <div className="p-4 bg-[#0A0D12]/70 border-b border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                  <span className="text-[#62E6FF] font-bold">$</span>
                  <code className="text-foreground/90 font-semibold tracking-wide whitespace-nowrap">
                    {activeTool.terminalSim.command}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyCommand(activeTool.terminalSim.command, activeTool.id)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-muted-foreground hover:text-foreground transition-all shrink-0 cursor-pointer"
                >
                  {copiedId === activeTool.id ? (
                    <>
                      <Check className="size-3 text-[#6EE7B7]" />
                      <span className="text-[#6EE7B7] text-[10px] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span className="text-[10px]">COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Simulated Terminal Output Body */}
              <div className="p-5 sm:p-6 space-y-2 text-xs leading-relaxed max-h-[360px] overflow-y-auto bg-black/60 scrollbar-thin select-text">
                <div className="text-muted-foreground/60 text-[11px] pb-2 border-b border-white/5">
                  # Executing automated OSINT reconnaissance on target identifier...
                </div>
                {activeTool.terminalSim.outputLines.map((line, idx) => {
                  let colorClass = "text-muted-foreground";
                  if (line.type === "success") colorClass = "text-[#6EE7B7] font-semibold";
                  if (line.type === "warn") colorClass = "text-[#F6C85F]";
                  if (line.type === "accent") colorClass = "text-[#62E6FF] font-bold";
                  if (line.type === "info") colorClass = "text-foreground";
                  if (line.type === "dim") colorClass = "text-muted-foreground/50";

                  return (
                    <div key={idx} className={`${colorClass} flex items-start gap-2`}>
                      <span className="select-none text-muted-foreground/40 font-mono text-[10px] pt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="break-all">{line.text}</span>
                    </div>
                  );
                })}
                <div className="pt-2 flex items-center gap-1 text-[#62E6FF]">
                  <span className="size-2 rounded-full bg-[#62E6FF] animate-ping" />
                  <span className="text-[11px]">Ready for next pipeline stage_</span>
                </div>
              </div>
            </div>

            {/* Extracted Intelligence Details Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-lg font-bold text-foreground">
                      {activeTool.name}
                    </h4>
                    <span className="font-mono text-xs text-muted-foreground">
                      by @{activeTool.githubOwner}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#62E6FF] mt-0.5">
                    Target Input Vector: <strong className="text-foreground">{activeTool.targetVector}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="flex items-center gap-1 text-[#F6C85F]">
                    <Star className="size-3.5 fill-[#F6C85F]" />
                    <span>{activeTool.stars} GitHub Stars</span>
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeTool.description}
              </p>

              {/* What It Extracts List */}
              <div className="space-y-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  INTELLIGENCE ARTIFACTS EXTRACTED:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs">
                  {activeTool.whatItExtracts.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex items-start gap-2.5 text-foreground/90"
                    >
                      <Check className="size-3.5 text-[#62E6FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CLI Flags Grid */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  RECOMMENDED FORENSIC FLAGS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                  {activeTool.cliFlags.map((f, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-white/5 bg-[#050608] flex items-start justify-between gap-2"
                    >
                      <code className="text-[#62E6FF] font-semibold">{f.flag}</code>
                      <span className="text-muted-foreground text-[10px] text-right font-sans">
                        {f.purpose}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: Bento Grid of all 14 Arsenal Tools */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const Icon = getCategoryIcon(tool.category);
            return (
              <div
                key={tool.id}
                className="p-6 rounded-2xl border border-white/10 bg-[#0A0D12] hover:border-[#62E6FF]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#62E6FF]">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-foreground group-hover:text-[#62E6FF] transition-colors">
                          {tool.name}
                        </h4>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          @{tool.githubOwner}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-xs text-[#F6C85F]">
                      <Star className="size-3 fill-[#F6C85F]" />
                      <span>{tool.stars}</span>
                    </div>
                  </div>

                  {/* Target Vector Tag */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#62E6FF]/10 border border-[#62E6FF]/20 font-mono text-[10px] text-[#62E6FF] font-semibold">
                      VECTOR: {tool.targetVector}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {tool.tagline}
                  </p>

                  {/* Artifacts Bullet preview */}
                  <div className="space-y-1 pt-1 font-sans text-[11px] text-foreground/80">
                    <div className="flex items-center gap-1.5 truncate">
                      <Check className="size-3 text-[#6EE7B7] shrink-0" />
                      <span className="truncate">{tool.whatItExtracts[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Check className="size-3 text-[#6EE7B7] shrink-0" />
                      <span className="truncate">{tool.whatItExtracts[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CLI and Link Action */}
                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(tool.cliCommand, tool.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  >
                    {copiedId === tool.id ? (
                      <>
                        <Check className="size-3 text-[#6EE7B7]" />
                        <span className="text-[#6EE7B7] text-[10px] font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span className="text-[10px]">COMMAND</span>
                      </>
                    )}
                  </button>

                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#62E6FF] hover:text-[#A5F3FC] transition-colors"
                  >
                    <span>View Repo</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Forensic Protocol & Chain of Custody Standard Banner */}
      <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0D12]/80 backdrop-blur-md">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#62E6FF] mb-3 font-semibold">
          <ShieldCheck className="size-4" />
          <span>INVESTIGATION METHODOLOGY // CHAIN OF CUSTODY STANDARD</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs mt-4">
          {[
            { step: "01", title: "Target Ingestion", desc: "Identifier validation & passive vector triage" },
            { step: "02", title: "Passive Recon", desc: "Non-alerting cross-platform account correlation" },
            { step: "03", title: "Exif & Artifacts", desc: "GPS coordinates, timestamps & document metadata" },
            { step: "04", title: "Link Graph", desc: "Correlating multi-source findings into relational map" },
            { step: "05", title: "Court-Grade Custody", desc: "Cryptographic SHA-256 evidence sealing (ISO/IEC 27037)" },
          ].map((s) => (
            <div key={s.step} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="text-[#62E6FF] font-bold">{s.step} //</div>
              <div className="text-foreground font-semibold mt-1">{s.title}</div>
              <div className="text-[10px] text-muted-foreground font-sans mt-1 leading-snug">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
