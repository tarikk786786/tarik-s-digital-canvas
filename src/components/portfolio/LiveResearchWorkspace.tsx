import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  GitBranch,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Clock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";

interface SimulatedFinding {
  id: string;
  entity: string;
  type: "Person" | "Organization" | "Domain" | "Telecom Series" | "Chemical Compound";
  status: "VERIFIED" | "SUPPORTED" | "PROBABLE" | "POSSIBLE";
  confidence: number;
  source: string;
  sourceDate: string;
  method: string;
  excerpt: string;
  tags: string[];
}

const SAMPLE_INVESTIGATIONS: Record<string, { query: string; category: string; findings: SimulatedFinding[] }> = {
  person: {
    query: "Rahul Sharma (Research Lead)",
    category: "HUMAN INTELLIGENCE",
    findings: [
      {
        id: "F-01",
        entity: "Rahul Sharma",
        type: "Person",
        status: "VERIFIED",
        confidence: 0.98,
        source: "OpenAlex Scholarly Graph (Author ID: A5082193)",
        sourceDate: "14 Aug 2026",
        method: "DOI Cross-Index Resolution",
        excerpt: "Co-authored 12 peer-reviewed computational biology and neural forensics papers. Affiliation: Centurion University.",
        tags: ["Author", "Scholar", "Verified Identity"],
      },
      {
        id: "F-02",
        entity: "github.com/rsharma-code",
        type: "Person",
        status: "SUPPORTED",
        confidence: 0.92,
        source: "GitHub Public Developer Index",
        sourceDate: "02 Oct 2026",
        method: "Commit GPG Signature & Handle Verification",
        excerpt: "Active maintainer of open Rust parsers with verifiable cryptographic commit signatures.",
        tags: ["Developer", "Open Source"],
      },
    ],
  },
  domain: {
    query: "tarikislam.in",
    category: "DIGITAL ASSETS",
    findings: [
      {
        id: "F-03",
        entity: "tarikislam.in",
        type: "Domain",
        status: "VERIFIED",
        confidence: 1.0,
        source: "Cloudflare Authoritative DoH (1.1.1.1)",
        sourceDate: "06 Oct 2026",
        method: "Recursive DNS A/AAAA & CAA record parse",
        excerpt: "Valid DNSSEC signature, SSL/TLS certificate issued via Cloudflare Edge PKI, DNS propagation verified globally.",
        tags: ["DNSSEC", "Cloudflare", "Production Live"],
      },
      {
        id: "F-04",
        entity: "Sectigo CT Append-Only Log",
        type: "Domain",
        status: "SUPPORTED",
        confidence: 0.95,
        source: "Certificate Transparency Pre-Certificate Stream",
        sourceDate: "12 Sep 2026",
        method: "Append-only cryptographic log audit",
        excerpt: "3 distinct valid certificates observed across 2024-2026 with matching Subject Alternative Names.",
        tags: ["SSL/TLS", "Certificate Transparency"],
      },
    ],
  },
  phone: {
    query: "+91 98100 12345 (National Numbering Plan)",
    category: "TELECOM CIRCLING",
    findings: [
      {
        id: "F-05",
        entity: "Delhi Telecom Circle (DL)",
        type: "Telecom Series",
        status: "VERIFIED",
        confidence: 0.96,
        source: "DoT National Numbering Plan (NNP) Gazette",
        sourceDate: "2026 Gazette Revision",
        method: "National series prefix allocation lookup",
        excerpt: "Series prefix corresponds to Licensed Service Area (LSA) Metro Circle Delhi. Not real-time subscriber GPS.",
        tags: ["DoT LSA", "Metro Circle", "No GPS Tracking"],
      },
      {
        id: "F-06",
        entity: "Mobile Number Portability (MNP) Status",
        type: "Telecom Series",
        status: "PROBABLE",
        confidence: 0.84,
        source: "TRAI Spectrum Block Allocation Table",
        sourceDate: "Q2 2026",
        method: "Historical MSC block registry",
        excerpt: "Originally allocated to Airtel Cellular block. Current active operator subject to MNP subscriber migration.",
        tags: ["TRAI Registry", "MNP Notice"],
      },
    ],
  },
  toxicology: {
    query: "Organophosphate Agricultural Compound",
    category: "SCIENTIFIC & SAFETY",
    findings: [
      {
        id: "F-07",
        entity: "Chlorpyrifos (CAS 2921-88-2)",
        type: "Chemical Compound",
        status: "VERIFIED",
        confidence: 0.99,
        source: "PubChem Compound Database & AIIMS NPIC Protocols",
        sourceDate: "Current Safety Standard",
        method: "GHS Hazard Classification & Clinical Nomogram",
        excerpt: "Irreversible acetylcholinesterase inhibitor causing acute cholinergic crisis (SLUDGE syndrome).",
        tags: ["GHS06 Toxic", "Acetylcholinesterase", "AIIMS NPIC"],
      },
      {
        id: "F-08",
        entity: "Atropine Sulfate + Pralidoxime (2-PAM)",
        type: "Chemical Compound",
        status: "VERIFIED",
        confidence: 1.0,
        source: "WHO Essential Medicines & Indian National Guidelines",
        sourceDate: "Clinical Standard",
        method: "Physiological competitive antagonism",
        excerpt: "Immediate hospital-administered antidote. Titrate atropine until bronchial secretions clear.",
        tags: ["Antidote", "Hospital Only", "Emergency Protocol"],
      },
    ],
  },
};

export function LiveResearchWorkspace() {
  const [activeTab, setActiveTab] = useState<"person" | "domain" | "phone" | "toxicology">("person");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const currentSample = SAMPLE_INVESTIGATIONS[activeTab];
  const findings = currentSample.findings.filter((f) =>
    filterStatus === "ALL" ? true : f.status === filterStatus
  );

  return (
    <section id="research" className="relative py-28 px-6 md:px-12 lg:px-16 bg-[#050608] border-t border-white/5">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#62E6FF]">
              <span className="size-2 rounded-full bg-[#62E6FF] animate-pulse" />
              LIVE RESEARCH WORKSPACE · DISCOVER → ANALYZE → CORRELATE → VERIFY
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Evidence Engine In Motion
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Every query classifies targets, routes to background adapters, normalizes sources, and outputs
              provenance-backed findings with explicit confidence levels.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/find-someone"
              search={{ mode: "live", id: undefined, q: undefined }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#62E6FF]/50 bg-[#62E6FF]/10 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#62E6FF] transition-all hover:bg-[#62E6FF]/20"
            >
              <span>Launch Live Kernel</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Live Workspace Container */}
        <div className="mt-12 rounded-3xl border border-white/15 bg-[#0A0D12] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Top Bar: Live Investigation Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "person", label: "Person Target", icon: Activity },
                { id: "domain", label: "Domain Infrastructure", icon: Layers },
                { id: "phone", label: "Telecom Series LSA", icon: Cpu },
                { id: "toxicology", label: "Chemical Hazard", icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                      active
                        ? "border border-[#62E6FF]/60 bg-[#62E6FF]/15 text-[#62E6FF] shadow-[0_0_12px_rgba(98,230,255,0.2)]"
                        : "border border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Target Query Pill */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase text-muted-foreground">ACTIVE TARGET:</span>
              <span className="rounded-lg border border-white/15 bg-black/60 px-3 py-1 font-mono text-xs text-white">
                {currentSample.query}
              </span>
            </div>
          </div>

          {/* Workflow Stage Telemetry Tracker */}
          <div className="my-8 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="size-3" /> PHASE 01
                </span>
                <p className="text-white font-semibold">UNDERSTANDING</p>
                <p className="text-[10px] text-muted-foreground">Classified as {currentSample.category}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="size-3" /> PHASE 02
                </span>
                <p className="text-white font-semibold">COLLECTING</p>
                <p className="text-[10px] text-muted-foreground">Parallel workers dispatched</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="size-3" /> PHASE 03
                </span>
                <p className="text-white font-semibold">CORRELATING</p>
                <p className="text-[10px] text-muted-foreground">Entity disambiguation &amp; dedupe</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#62E6FF] font-bold flex items-center justify-center gap-1">
                  <Activity className="size-3 animate-spin" /> PHASE 04
                </span>
                <p className="text-[#62E6FF] font-semibold">VERIFYING</p>
                <p className="text-[10px] text-muted-foreground">Confidence scored (0.00 – 1.00)</p>
              </div>
            </div>
          </div>

          {/* Evidence Cards Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                PROVENANCE-BACKED FINDINGS ({findings.length})
              </h3>

              {/* Status Filter */}
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {["ALL", "VERIFIED", "SUPPORTED", "PROBABLE"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      soundEngine.playClick();
                      setFilterStatus(st);
                    }}
                    className={`rounded px-2 py-0.5 transition-all ${
                      filterStatus === st
                        ? "bg-[#62E6FF]/20 text-[#62E6FF] font-bold"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {findings.map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl border border-white/10 bg-[#0E1219] p-6 space-y-4 hover:border-[#62E6FF]/40 transition-colors"
                >
                  {/* Card Header: Finding ID, Entity, Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#62E6FF]">
                          {f.id}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">
                          {f.type}
                        </span>
                      </div>
                      <h4 className="mt-1 text-lg font-bold font-display text-white">
                        {f.entity}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          f.status === "VERIFIED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : f.status === "SUPPORTED"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {f.status}
                      </span>
                      <span className="block font-mono text-[10px] text-muted-foreground mt-0.5">
                        CONF {(f.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {f.excerpt}
                  </p>

                  {/* Provenance Box */}
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-mono font-medium text-white truncate max-w-[70%]">
                        Source: {f.source}
                      </span>
                      <span className="font-mono text-[10px]">{f.sourceDate}</span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-400">
                      Methodology: {f.method}
                    </div>
                  </div>

                  {/* Footer Tags & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {f.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9px] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/find-someone"
                      search={{ mode: "live", id: undefined, q: f.entity }}
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-[#62E6FF] hover:underline"
                    >
                      Pivots &amp; Graph →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
