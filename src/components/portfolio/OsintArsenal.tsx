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
  Share2,
  Workflow,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Compass,
} from "lucide-react";
import {
  OSINT_TOOLS,
  OSINT_CATEGORIES,
  OSINT_WORKFLOWS,
  type OsintTool,
  type OsintCategory,
  type OsintWorkflow,
} from "@/content/osint-tools";
import { soundEngine } from "@/lib/sound-engine";

export function OsintArsenal() {
  const [selectedToolId, setSelectedToolId] = useState<string>("sherlock");
  const [activeCategory, setActiveCategory] = useState<OsintCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"terminal" | "grid" | "pipeline">("terminal");

  // Investigation Pipeline Simulator State
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>("suspect-persona");
  const [simRunning, setSimRunning] = useState(false);
  const [activeSimStep, setActiveSimStep] = useState<number>(4); // Default to full completed state
  const [copiedDossier, setCopiedDossier] = useState(false);

  // Active workflow
  const activeWorkflow: OsintWorkflow = useMemo(() => {
    return OSINT_WORKFLOWS.find((w) => w.id === activeWorkflowId) || OSINT_WORKFLOWS[0];
  }, [activeWorkflowId]);

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

  const handleCopyDossier = () => {
    soundEngine.playClick();
    const dossierText = `=== FORENSIC OSINT INVESTIGATION DOSSIER ===
Target: ${activeWorkflow.sampleTarget}
Scenario: ${activeWorkflow.scenario}
Pipeline Standard: ISO/IEC 27037 Evidence Preservation

EXTRACTED ENTITIES:
${activeWorkflow.extractedEntities.map((e) => `- [${e.confidence}] ${e.type}: ${e.value}`).join("\n")}

INVESTIGATION VERDICT:
${activeWorkflow.verdict}
============================================`;
    navigator.clipboard.writeText(dossierText);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  const handleRunSimulation = () => {
    soundEngine.playClick();
    setSimRunning(true);
    setActiveSimStep(0);

    const stepInterval = setInterval(() => {
      setActiveSimStep((prev) => {
        if (prev >= activeWorkflow.steps.length - 1) {
          clearInterval(stepInterval);
          setSimRunning(false);
          return activeWorkflow.steps.length;
        }
        return prev + 1;
      });
    }, 600);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "username":
        return User;
      case "email":
        return Mail;
      case "phone":
        return Phone;
      case "socmint":
        return Share2;
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
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#62E6FF]">
              <Fingerprint className="size-4" />
              <span>DIGITAL FOOTPRINT &amp; OSINT RECONNAISSANCE</span>
              <span className="px-2 py-0.5 rounded-full bg-[#6EE7B7]/10 text-[#6EE7B7] text-[10px] font-semibold border border-[#6EE7B7]/20">
                27 OPEN-SOURCE ARSENAL
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#9B8CFF]/10 text-[#9B8CFF] text-[10px] font-semibold border border-[#9B8CFF]/20">
                ISO/IEC 27037 COMPLIANT
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Curated Open-Source Intelligence &amp; Forensics Toolchain
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
              GitHub-curated open-source intelligence utilities covering 7 reconnaissance vectors: username enumeration across 400+ services, email recovery leak mapping, carrier E.164 discovery, SOCMINT timelines, EXIF GPS extraction, attack surface subdomains, and credential breach detection.
            </p>
          </div>

          {/* View Mode Toggle: 3 Modes */}
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
              <span>TERMINAL</span>
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
              <span>ARSENAL GRID (27)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setViewMode("pipeline");
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                viewMode === "pipeline"
                  ? "bg-[#62E6FF] text-[#050608] shadow-[0_0_15px_rgba(98,230,255,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Workflow className="size-3.5" />
              <span>RECON SIMULATOR</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 3: PIPELINE SIMULATOR */}
      {viewMode === "pipeline" && (
        <div className="space-y-6 animate-fade-in">
          {/* Target Scenario Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground mr-1">INVESTIGATION VECTOR:</span>
              {OSINT_WORKFLOWS.map((wf) => (
                <button
                  key={wf.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveWorkflowId(wf.id);
                    setActiveSimStep(wf.steps.length);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                    activeWorkflowId === wf.id
                      ? "bg-[#62E6FF]/20 text-[#62E6FF] border border-[#62E6FF]/40 font-bold"
                      : "bg-white/5 text-muted-foreground hover:text-foreground border border-white/5"
                  }`}
                >
                  {wf.title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={simRunning}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#62E6FF] hover:bg-[#A5F3FC] text-[#050608] font-mono text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(98,230,255,0.3)] disabled:opacity-50"
              >
                {simRunning ? (
                  <>
                    <RotateCcw className="size-3.5 animate-spin" />
                    <span>RUNNING RECON...</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 fill-current" />
                    <span>EXECUTE SIMULATOR</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyDossier}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                title="Copy structured forensic dossier"
              >
                {copiedDossier ? (
                  <>
                    <Check className="size-3 text-[#6EE7B7]" />
                    <span className="text-[#6EE7B7] text-[11px] font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span className="text-[11px]">DOSSIER</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scenario Overview Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Interactive Step Execution Timeline */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 rounded-xl border border-white/10 bg-[#0A0D12]">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#62E6FF]">
                    <Clock className="size-3.5" />
                    <span>TARGET IDENTIFIER:</span>
                    <code className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[#6EE7B7] font-bold">
                      {activeWorkflow.sampleTarget}
                    </code>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">
                    Vector: {activeWorkflow.targetType}
                  </span>
                </div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {activeWorkflow.scenario}
                </p>
              </div>

              {/* Steps Cards */}
              <div className="space-y-3">
                {activeWorkflow.steps.map((step, idx) => {
                  const tool = OSINT_TOOLS.find((t) => t.id === step.toolId);
                  const isDone = activeSimStep > idx;
                  const isCurrent = activeSimStep === idx && simRunning;

                  return (
                    <div
                      key={step.toolId}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? "border-[#62E6FF] bg-[#62E6FF]/5 shadow-[0_0_15px_rgba(98,230,255,0.15)]"
                          : isDone
                          ? "border-white/10 bg-[#0A0D12]"
                          : "border-white/5 bg-[#0A0D12]/40 opacity-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`size-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border ${
                              isDone
                                ? "bg-[#6EE7B7]/10 text-[#6EE7B7] border-[#6EE7B7]/30"
                                : isCurrent
                                ? "bg-[#62E6FF]/20 text-[#62E6FF] border-[#62E6FF] animate-pulse"
                                : "bg-white/5 text-muted-foreground border-white/10"
                            }`}
                          >
                            {isDone ? "✓" : idx + 1}
                          </span>
                          <span className="font-mono text-xs font-bold text-foreground">
                            {tool?.name || step.toolId}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            ({tool?.stars || "GitHub"})
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-accent uppercase tracking-wider">
                          STAGE 0{idx + 1}
                        </span>
                      </div>

                      <div className="text-xs text-foreground/90 font-mono mb-2">
                        {step.action}
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 font-mono text-[11px] text-[#6EE7B7] flex items-center justify-between gap-2">
                        <span className="truncate">{step.outputPreview}</span>
                        {tool && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedToolId(tool.id);
                              setViewMode("terminal");
                            }}
                            className="text-[10px] text-[#62E6FF] hover:underline whitespace-nowrap cursor-pointer"
                          >
                            Open CLI →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Col: Extracted Entities Dossier & Attribution Verdict */}
            <div className="space-y-4">
              {/* Entities Card */}
              <div className="p-5 rounded-xl border border-white/10 bg-[#0A0D12] space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                    <Fingerprint className="size-4 text-[#62E6FF]" />
                    <span>EXTRACTED ENTITIES ({activeWorkflow.extractedEntities.length})</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6EE7B7]">EVIDENTIARY HASH OK</span>
                </div>

                <div className="space-y-2.5">
                  {activeWorkflow.extractedEntities.map((ent, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                        <span>{ent.type}</span>
                        <span className="text-[#62E6FF] font-bold">{ent.confidence} CONFIDENCE</span>
                      </div>
                      <code className="text-xs font-mono text-foreground font-semibold break-all">
                        {ent.value}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verdict Card */}
              <div className="p-5 rounded-xl border border-[#6EE7B7]/30 bg-gradient-to-br from-[#0A0D12] to-[#6EE7B7]/5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#6EE7B7]">
                  <CheckCircle2 className="size-4 text-[#6EE7B7]" />
                  <span>INVESTIGATION VERDICT</span>
                </div>
                <p className="font-sans text-xs text-foreground/90 leading-relaxed">
                  {activeWorkflow.verdict}
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>STANDARD: ISO/IEC 27037 §6</span>
                  <span className="text-[#6EE7B7]">STATUS: VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH BAR (Available in Terminal & Grid Modes) */}
      {viewMode !== "pipeline" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {OSINT_CATEGORIES.map((cat) => {
                const Icon = getCategoryIcon(cat.id);
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? OSINT_TOOLS.length
                    : OSINT_TOOLS.filter((t) => t.category === cat.id).length;

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
                    <span className="text-[10px] opacity-70">({count})</span>
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
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-[#0A0D12] font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#62E6FF]/50 focus:ring-1 focus:ring-[#62E6FF]/30 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                >
                  ESC
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: INTERACTIVE CLI TERMINAL (Default) */}
      {viewMode === "terminal" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* Left Column: Tool Selector List (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0A0D12] overflow-hidden flex flex-col max-h-[640px]">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-[#050608]/80 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Terminal className="size-4 text-[#62E6FF]" />
                <span>SELECT ARSENAL UTILITY</span>
              </div>
              <span className="font-mono text-[11px] text-[#62E6FF] font-semibold">
                {filteredTools.length} {filteredTools.length === 1 ? "TOOL" : "TOOLS"}
              </span>
            </div>

            {/* Scrollable Tool Items */}
            <div className="overflow-y-auto divide-y divide-white/5 scrollbar-thin">
              {filteredTools.map((tool) => {
                const Icon = getCategoryIcon(tool.category);
                const isSelected = tool.id === activeTool.id;

                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedToolId(tool.id);
                    }}
                    className={`w-full text-left p-4 transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#62E6FF]/10 border-l-2 border-l-[#62E6FF]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className={`size-3.5 ${isSelected ? "text-[#62E6FF]" : "text-muted-foreground"}`} />
                        <span className={`font-mono text-sm font-bold truncate ${isSelected ? "text-foreground" : "text-foreground/90"}`}>
                          {tool.name}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/10">
                          ★ {tool.stars}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {tool.tagline}
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-muted-foreground/80">
                        <span className="text-[#62E6FF]">{tool.targetVector}</span>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`size-4 shrink-0 transition-transform ${
                        isSelected
                          ? "text-[#62E6FF] translate-x-0.5 -translate-y-0.5"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                );
              })}

              {filteredTools.length === 0 && (
                <div className="p-8 text-center font-mono text-xs text-muted-foreground">
                  No tools found matching &quot;{searchQuery}&quot;. Clear filters to see all 27 tools.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Forensics Terminal Display (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Terminal Window */}
            <div className="rounded-2xl border border-white/10 bg-[#050608] shadow-2xl overflow-hidden font-mono">
              {/* Terminal Titlebar */}
              <div className="px-4 py-3 border-b border-white/10 bg-[#0A0D12] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-[#FF7070]" />
                  <div className="size-2.5 rounded-full bg-[#F6C85F]" />
                  <div className="size-2.5 rounded-full bg-[#6EE7B7]" />
                  <span className="text-xs text-muted-foreground ml-2 font-semibold">
                    {activeTool.id}.sh — {activeTool.name} OSINT Engine
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(activeTool.cliCommand, activeTool.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  >
                    {copiedId === activeTool.id ? (
                      <>
                        <Check className="size-3 text-[#6EE7B7]" />
                        <span className="text-[#6EE7B7]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy CLI</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeTool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#62E6FF]/30 bg-[#62E6FF]/10 text-[11px] text-[#62E6FF] hover:bg-[#62E6FF]/20 transition-all"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-5 space-y-4 text-xs">
                {/* Command prompt line */}
                <div className="flex items-center gap-2 text-foreground/90 font-semibold flex-wrap">
                  <span className="text-[#6EE7B7]">tarik@forensic-lab</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-[#62E6FF]">~/recon</span>
                  <span className="text-muted-foreground">$</span>
                  <span className="text-foreground">{activeTool.terminalSim.command}</span>
                </div>

                {/* Simulated Output Stream */}
                <div className="p-4 rounded-xl bg-[#0A0D12]/90 border border-white/5 space-y-1.5 leading-relaxed">
                  {activeTool.terminalSim.outputLines.map((line, idx) => {
                    let colorClass = "text-muted-foreground";
                    if (line.type === "success") colorClass = "text-[#6EE7B7]";
                    if (line.type === "warn") colorClass = "text-[#F6C85F]";
                    if (line.type === "accent") colorClass = "text-[#62E6FF]";
                    if (line.type === "info") colorClass = "text-foreground font-semibold";
                    if (line.type === "dim") colorClass = "text-muted-foreground/60";

                    return (
                      <div key={idx} className={`${colorClass} font-mono text-[11px] break-all`}>
                        {line.text}
                      </div>
                    );
                  })}
                </div>

                {/* Extracted Artifacts Checklist */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    <Sparkles className="size-3 text-[#62E6FF]" />
                    <span>EXTRACTED INTELLIGENCE VECTORS:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {activeTool.whatItExtracts.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-muted-foreground font-sans">
                        <span className="text-[#6EE7B7] font-mono shrink-0">✓</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forensic Standard Badge */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-[#6EE7B7]" />
                    <span>EVIDENTIARY COMPLIANCE: {activeTool.forensicStandard}</span>
                  </div>
                  <span className="text-foreground/80 font-mono">STARS: {activeTool.stars}</span>
                </div>
              </div>
            </div>

            {/* CLI Flags Reference Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#0A0D12]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                CLI FLAGS // SYNTAX REFERENCE
              </h4>
              <div className="space-y-2">
                {activeTool.cliFlags.map((flag, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-black/40 border border-white/5 font-mono text-xs">
                    <code className="text-[#62E6FF] font-semibold">{flag.flag}</code>
                    <span className="text-muted-foreground text-[11px] font-sans">{flag.purpose}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BENTO GRID VIEW (All 27 Tools) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {filteredTools.map((tool) => {
            const Icon = getCategoryIcon(tool.category);

            return (
              <div
                key={tool.id}
                className="flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-[#0A0D12] hover:border-[#62E6FF]/40 hover:bg-[#0D1117] transition-all group"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#62E6FF] group-hover:bg-[#62E6FF] group-hover:text-[#050608] transition-colors">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h4 className="font-mono text-base font-bold text-foreground group-hover:text-[#62E6FF] transition-colors">
                          {tool.name}
                        </h4>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {tool.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10 flex items-center gap-1">
                      <Star className="size-2.5 text-[#F6C85F] fill-current" />
                      {tool.stars}
                    </span>
                  </div>

                  {/* Target Vector Tag */}
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#62E6FF]">
                    TARGET: {tool.targetVector}
                  </div>

                  {/* Tagline */}
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {tool.tagline}
                  </p>

                  {/* Key Extracts Preview */}
                  <div className="pt-2 border-t border-white/5 space-y-1 font-mono text-[10px] text-muted-foreground/90">
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
