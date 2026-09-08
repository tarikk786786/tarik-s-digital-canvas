import { useState } from "react";
import {
  Radio,
  Cpu,
  Shield,
  Boxes,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Compass,
} from "lucide-react";

interface IntelItem {
  id: string;
  category: "AI & AGENTS" | "CYBER DEFENSE" | "3D & SYSTEMS" | "VENTURES";
  headline: string;
  analysis: string;
  source: string;
  date: string;
  status: "CRITICAL WATCH" | "ACCELERATING" | "INTEGRATING" | "DEEP RESEARCH";
  color: string;
}

const INTEL_FEED: IntelItem[] = [
  {
    id: "INTEL-01",
    category: "AI & AGENTS",
    headline: "Test-Time Compute & Structured Reasoning Loops",
    analysis:
      "The frontier of AI is shifting from static pre-training toward dynamic inference compute — multi-step reflection, verification trees, and hard RAG grounding that eliminates stochastic hallucinations.",
    source: "Frontier AI Research & Dezo Labs",
    date: "SEPTEMBER 2026",
    status: "ACCELERATING",
    color: "#10B981",
  },
  {
    id: "INTEL-02",
    category: "CYBER DEFENSE",
    headline: "Hardware-Attested Zero-Trust & Memory-Safe Forensics",
    analysis:
      "Perimeter defense is obsolete. True protection requires hardware attestation, immutable memory capture, and kernel-level verification built with memory-safe languages like Rust.",
    source: "NIST & Forensic SIG",
    date: "SEPTEMBER 2026",
    status: "CRITICAL WATCH",
    color: "#38BDF8",
  },
  {
    id: "INTEL-03",
    category: "3D & SYSTEMS",
    headline: "WebGPU Transition & Zero-Allocation Render Pipelines",
    analysis:
      "High-performance web experiences are decoupling from naive DOM animations toward typed memory buffers, compute shaders, and spatial Three.js engines that pause when offscreen.",
    source: "W3C WebGPU Working Group",
    date: "SEPTEMBER 2026",
    status: "INTEGRATING",
    color: "#A855F7",
  },
  {
    id: "INTEL-04",
    category: "VENTURES",
    headline: "Audit-Grade AI Software & Sovereign Venture Studios",
    analysis:
      "The next generation of high-impact startups will not build generic wrappers; they will build defensible, audit-grade platforms where evidence, precision, and business utility converge.",
    source: "Dezo.in Internal Dispatches",
    date: "SEPTEMBER 2026",
    status: "DEEP RESEARCH",
    color: "#E8A838",
  },
];

export function TarikIntelligence() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredItems =
    activeFilter === "ALL"
      ? INTEL_FEED
      : INTEL_FEED.filter((item) => item.category === activeFilter);

  return (
    <section
      id="intelligence"
      aria-label="Tarik Intelligence Radar"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0C0E12] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">07 /</span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                INTELLIGENCE RADAR
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight">
              What I'm Watching
            </h2>
            <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl">
              A curated dispatch of frontier breakthroughs, defense models, and system shifts actively influencing my architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {["ALL", "AI & AGENTS", "CYBER DEFENSE", "3D & SYSTEMS", "VENTURES"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "border-accent bg-accent text-[#0C0E12] font-bold shadow-[0_0_12px_rgba(232,168,56,0.3)]"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Radar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#14161C]/80 hover:bg-[#14161C] hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
                    <span
                      className="size-2 rounded-full animate-pulse"
                      style={{ backgroundColor: item.color }}
                    />
                    <span style={{ color: item.color }} className="font-bold">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                    {item.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors leading-snug">
                  {item.headline}
                </h3>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {item.analysis}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
