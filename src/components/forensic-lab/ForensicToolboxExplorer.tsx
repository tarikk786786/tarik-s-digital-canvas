import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  FlaskConical,
  Library,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Database,
  Radio,
  FileSearch,
  Code2,
} from "lucide-react";
import {
  DFIR_TOOLBOX,
  DFIR_PIPELINE_STAGES,
  TOOL_STATUS_COUNTS,
  type DfirTool,
  type ToolUsageStatus,
  type ToolCategory,
} from "@/content/forensic-toolbox";
import { soundEngine } from "@/lib/sound-engine";
import { TechnicalLabel } from "@/components/system";

const STATUS_CONFIG: Record<
  ToolUsageStatus,
  { label: string; badgeClass: string; icon: typeof CheckCircle2; description: string }
> = {
  Used: {
    label: "Actively Used",
    badgeClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    icon: CheckCircle2,
    description:
      "Tools actively applied in Tarik's laboratory workflows and hands-on investigation.",
  },
  Familiar: {
    label: "Practiced / Familiar",
    badgeClass: "border-[#62E6FF]/40 bg-[#62E6FF]/10 text-[#62E6FF]",
    icon: BookOpen,
    description: "Evaluated and practiced in DFIR lab environments with full command knowledge.",
  },
  Researching: {
    label: "Active Research",
    badgeClass: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    icon: FlaskConical,
    description: "Currently under lab benchmarking, experimental evaluation, or research review.",
  },
  Ecosystem: {
    label: "Ecosystem Reference",
    badgeClass: "border-white/20 bg-white/5 text-muted-foreground",
    icon: Library,
    description:
      "Catalogued open-source DFIR tools available in the broader cybersecurity landscape.",
  },
};

const CATEGORY_ICONS: Record<ToolCategory, typeof Terminal> = {
  "Disk & File Systems": Database,
  "Memory Forensics": Cpu,
  "Timeline & Reconstruction": Layers,
  "Network & Telemetry": Radio,
  "Endpoint & Triage": Terminal,
  "Metadata & Carving": FileSearch,
  "Reverse Engineering & Malware": ShieldAlert,
  "Data Manipulation & Decoding": Code2,
};

export function ForensicToolboxExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ToolUsageStatus | "ALL">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "ALL">("ALL");
  const [activePipelineStage, setActivePipelineStage] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<DfirTool | null>(DFIR_TOOLBOX[0]);

  const categories = useMemo(() => {
    const set = new Set<ToolCategory>();
    DFIR_TOOLBOX.forEach((t) => set.add(t.category));
    return Array.from(set);
  }, []);

  const filteredTools = useMemo(() => {
    return DFIR_TOOLBOX.filter((tool) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.forensicRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keyCapabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = selectedStatus === "ALL" || tool.status === selectedStatus;
      const matchesCategory = selectedCategory === "ALL" || tool.category === selectedCategory;
      const matchesStage =
        !activePipelineStage ||
        tool.pipelineStage.toLowerCase() === activePipelineStage.toLowerCase();

      return matchesSearch && matchesStatus && matchesCategory && matchesStage;
    });
  }, [searchQuery, selectedStatus, selectedCategory, activePipelineStage]);

  return (
    <section className="space-y-6">
      {/* Header and Integrity Notice */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#62E6FF]">
              <Terminal className="size-3" />
              Open-Source DFIR & Forensic Toolbox
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Empirical Tools & Forensic Capability Architecture
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Evidence-first transparency: In adherence to ISO/IEC 27037 and NIST SP 800-86
              standards, this catalog strictly delineates between tools Tarik{" "}
              <strong className="text-emerald-300 font-medium">actively uses</strong>, tools he is{" "}
              <strong className="text-[#62E6FF] font-medium">familiar with</strong>, tools under
              <strong className="text-amber-300 font-medium"> active research</strong>, and tools
              catalogued as
              <strong className="text-muted-foreground font-medium"> ecosystem standards</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["Used", "Familiar", "Researching", "Ecosystem"] as ToolUsageStatus[]).map(
              (status) => {
                const cfg = STATUS_CONFIG[status];
                const Icon = cfg.icon;
                return (
                  <div
                    key={status}
                    className="rounded-xl border border-white/5 bg-black/40 p-3 text-center sm:text-left"
                  >
                    <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                      <Icon className="size-3 text-muted-foreground" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {status}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-lg font-bold text-foreground">
                      {TOOL_STATUS_COUNTS[status]}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>

        {/* 8-Stage Canonical DFIR Pipeline Visualizer */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between mb-3">
            <TechnicalLabel className="text-[#62E6FF]">
              Canonical 8-Stage DFIR Workflow
            </TechnicalLabel>
            {activePipelineStage && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActivePipelineStage(null);
                }}
                className="font-mono text-[10px] text-amber-300 hover:underline uppercase"
              >
                Clear Stage Filter ({activePipelineStage})
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {DFIR_PIPELINE_STAGES.map((stg) => {
              const isActive = activePipelineStage?.toLowerCase() === stg.id.toLowerCase();
              return (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setActivePipelineStage(isActive ? null : stg.id);
                  }}
                  className={`group rounded-xl border p-2.5 text-left transition-all ${
                    isActive
                      ? "border-[#62E6FF] bg-[#62E6FF]/15 text-[#62E6FF] shadow-lg shadow-[#62E6FF]/10"
                      : "border-white/10 bg-black/20 text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    {stg.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-tight text-muted-foreground/80">
                    {stg.summary}
                  </p>
                  <p className="mt-1.5 font-mono text-[8px] text-[#62E6FF]/80">{stg.standard}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0A0D12] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search DFIR tools, capabilities, MFT, volatile memory, YARA..."
            className="w-full rounded-lg border border-white/10 bg-black/40 py-2 pl-9 pr-4 text-xs font-mono text-foreground placeholder:text-muted-foreground/60 focus:border-[#62E6FF]/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setSelectedStatus("ALL");
              }}
              className={`rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                selectedStatus === "ALL"
                  ? "bg-[#62E6FF]/20 text-[#62E6FF]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Statuses
            </button>
            {(["Used", "Familiar", "Researching"] as ToolUsageStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedStatus(st);
                }}
                className={`rounded px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                  selectedStatus === st
                    ? "bg-[#62E6FF]/20 text-[#62E6FF]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Category Dropdown/Pills */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              soundEngine.playClick();
              setSelectedCategory(e.target.value as ToolCategory | "ALL");
            }}
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground focus:border-[#62E6FF]/50 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Tool Cards (Left) & Deep Inspector (Right) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Tool Cards List */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredTools.length} tools</span>
            <span className="font-mono text-[10px]">
              Click any card to inspect forensic metadata
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {filteredTools.map((tool) => {
              const isSelected = selectedTool?.id === tool.id;
              const statusCfg = STATUS_CONFIG[tool.status];
              const CategoryIcon = CATEGORY_ICONS[tool.category] || Terminal;

              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedTool(tool);
                  }}
                  className={`group relative cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-[#62E6FF] bg-[#62E6FF]/10 shadow-lg shadow-[#62E6FF]/5"
                      : "border-white/10 bg-[#0A0D12] hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-[#62E6FF]">
                        <CategoryIcon className="size-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold tracking-tight text-foreground group-hover:text-[#62E6FF]">
                          {tool.name}
                        </h3>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          {tool.category}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${statusCfg.badgeClass}`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {tool.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 font-mono text-[9px] text-muted-foreground">
                    <span className="text-[#62E6FF]/80">Stage: {tool.pipelineStage}</span>
                    <span className="inline-flex items-center gap-1 group-hover:text-foreground">
                      Details <ArrowRight className="size-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/15 bg-black/20 p-8 text-center">
              <ShieldAlert className="mx-auto size-8 text-muted-foreground/60" />
              <p className="mt-2 text-sm font-medium text-foreground">No DFIR tools match query</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try clearing search terms or selecting &quot;All Statuses&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Selected Tool Inspector Panel */}
        <div className="lg:col-span-5">
          {selectedTool ? (
            <div className="sticky top-20 space-y-4 rounded-2xl border border-white/15 bg-[#0A0D12] p-6 shadow-xl">
              <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        STATUS_CONFIG[selectedTool.status].badgeClass
                      }`}
                    >
                      {STATUS_CONFIG[selectedTool.status].label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      License: {selectedTool.license}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
                    {selectedTool.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-[#62E6FF]">
                    {selectedTool.category}
                  </p>
                </div>

                <a
                  href={selectedTool.officialRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 bg-black/40 p-2 text-muted-foreground hover:border-[#62E6FF]/40 hover:text-[#62E6FF]"
                  title="Official Open-Source Repository"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>

              {/* Status explanation */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-muted-foreground">
                <strong className="text-foreground font-mono uppercase text-[10px] block mb-1">
                  Practitioner Status Grounding:
                </strong>
                {STATUS_CONFIG[selectedTool.status].description}
              </div>

              {/* Forensic Role */}
              <div>
                <TechnicalLabel className="text-muted-foreground">
                  Forensic Role in Investigations
                </TechnicalLabel>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {selectedTool.forensicRole}
                </p>
              </div>

              {/* Key Capabilities */}
              <div>
                <TechnicalLabel className="text-muted-foreground">
                  Key Technical Capabilities
                </TechnicalLabel>
                <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  {selectedTool.keyCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#62E6FF] font-mono select-none">▸</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evidentiary Standards & Pipeline Specs */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 font-mono text-[10px]">
                <div className="rounded-lg border border-white/5 bg-black/20 p-2.5">
                  <span className="text-muted-foreground block uppercase">Pipeline Stage</span>
                  <span className="text-[#62E6FF] font-bold mt-1 block">
                    {selectedTool.pipelineStage}
                  </span>
                </div>
                <div className="rounded-lg border border-white/5 bg-black/20 p-2.5">
                  <span className="text-muted-foreground block uppercase">Standard</span>
                  <span
                    className="text-amber-300 font-bold mt-1 block truncate"
                    title={selectedTool.evidentiaryStandard}
                  >
                    {selectedTool.evidentiaryStandard}
                  </span>
                </div>
                <div className="rounded-lg border border-white/5 bg-black/20 p-2.5 col-span-2">
                  <span className="text-muted-foreground block uppercase">
                    Runtime Architecture
                  </span>
                  <span className="text-foreground mt-1 block">
                    {selectedTool.executionEnvironment} ({selectedTool.integrationState})
                  </span>
                </div>
              </div>

              {/* Official Links */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href={selectedTool.officialRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:border-[#62E6FF]/40 hover:text-[#62E6FF]"
                >
                  <ExternalLink className="size-3" />
                  GitHub Repository
                </a>
                {selectedTool.documentationUrl && (
                  <a
                    href={selectedTool.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:border-[#62E6FF]/40 hover:text-[#62E6FF]"
                  >
                    <BookOpen className="size-3" />
                    Documentation
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-8 text-center text-muted-foreground">
              Select any tool to inspect technical specifications.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
