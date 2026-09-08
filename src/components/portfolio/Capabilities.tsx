import { useState } from "react";
import { TiltCard3D } from "./TiltCard3D";
import {
  ShieldAlert,
  Lock,
  BrainCircuit,
  Layers,
  Workflow,
  Rocket,
  ArrowUpRight,
  Compass,
  Award,
  Terminal,
} from "lucide-react";
import { ForensicDomains } from "./ForensicDomains";
import { TechCertifications } from "./TechCertifications";
import { OsintArsenal } from "./OsintArsenal";

const CAPABILITIES = [
  {
    id: "01",
    title: "Forensic Science",
    icon: ShieldAlert,
    desc: "Deep investigations across digital artifacts, cryptographic integrity, and evidence preservation. NIST SP 800-86 and ISO/IEC 27037 compliant chain-of-custody workflows.",
    tags: ["Threat Hunting", "Memory Forensics", "Incident Response", "Chain of Custody"],
    deliverables: "Court-ready dossiers, root-cause autopsy reports, evidentiary hashing",
    accentColor: "rgba(98, 230, 255, 0.2)",
  },
  {
    id: "02",
    title: "Cybersecurity Engineering",
    icon: Lock,
    desc: "Zero Trust architecture, proactive threat modeling, AppSec, red/blue team toolchains, and defense-in-depth security architectures for mission-critical enterprise systems.",
    tags: ["Zero Trust", "OWASP Top 10", "SIEM/SOAR", "Penetration Testing"],
    deliverables: "Threat surface minimization, hardened API contracts, automated defense",
    accentColor: "rgba(98, 230, 255, 0.2)",
  },
  {
    id: "03",
    title: "AI Systems & Research",
    icon: BrainCircuit,
    desc: "Autonomous agentic workflows, deterministic RAG pipelines, fine-tuned transformer models, and applied computer vision — from research prototypes to production inference.",
    tags: ["Autonomous LLMs", "PyTorch", "RAG Pipelines", "Agentic Workflows"],
    deliverables: "Domain-adapted neural agents, vector retrieval engines, model safety",
    accentColor: "rgba(155, 140, 255, 0.2)",
  },
  {
    id: "04",
    title: "Full Stack Systems",
    icon: Layers,
    desc: "High-performance, type-safe full-stack platforms with strict performance budgets, microsecond state hydration, responsive aesthetics, and robust API design.",
    tags: ["TypeScript", "React 19", "Rust", "PostgreSQL", "TanStack"],
    deliverables: "Deterministic web platforms, edge computing layers, scalable databases",
    accentColor: "rgba(98, 230, 255, 0.2)",
  },
  {
    id: "05",
    title: "Automation & Orchestration",
    icon: Workflow,
    desc: "Eliminating manual operational friction with resilient event-driven pipelines, ETL ingestion pipelines, automated compliance testing, and microservice orchestration.",
    tags: ["Distributed Workflows", "Serverless", "Event Streaming", "ETL"],
    deliverables: "Resilient asynchronous jobs, real-time alerting, continuous audits",
    accentColor: "rgba(110, 231, 183, 0.2)",
  },
  {
    id: "06",
    title: "Founding & Product Craft",
    icon: Rocket,
    desc: "Building Dezo.in from 0→1. Bridging deep technical engineering with sharp product instincts, user experience, strategic go-to-market, and sustainable unit economics.",
    tags: ["0→1 Strategy", "Dezo.in", "Product Engineering", "Venture Execution"],
    deliverables: "Audited production MVPs, brand narrative, scalable architecture",
    accentColor: "rgba(98, 230, 255, 0.2)",
  },
];

export function Capabilities() {
  const [activeTab, setActiveTab] = useState<"capabilities" | "osint" | "domains" | "certifications">("capabilities");

  return (
    <section id="expertise" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#050608] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[42rem] rounded-full blur-3xl opacity-10 bg-radial from-[#62E6FF]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHead num="03" label="EXPERTISE // DOMAINS & ROADMAP">
            Multidisciplinary Engineering <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">Across Forensics, Cyber, AI & Systems</span>
          </SectionHead>

          {/* Interactive Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#0A0D12] backdrop-blur-md font-mono text-[11px] uppercase tracking-wider self-start lg:self-end">
            {[
              { id: "capabilities", label: "CORE MATRIX", icon: BrainCircuit },
              { id: "osint", label: "OSINT ARSENAL", icon: Terminal },
              { id: "domains", label: "FORENSIC ATLAS", icon: Compass },
              { id: "certifications", label: "CREDENTIAL ROADMAP", icon: Award },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-accent text-[#050608] font-bold shadow-[0_0_16px_rgba(98,230,255,0.35)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <TabIcon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Core Matrix */}
        {activeTab === "capabilities" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {CAPABILITIES.map((c) => {
              const Icon = c.icon;
              return (
                <TiltCard3D
                  key={c.id}
                  className="h-full"
                  glowColor={c.accentColor}
                  tiltIntensity={8}
                >
                  <article className="h-full flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-[#0A0D12]/95 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-[#62E6FF]/40 group">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#050608] transition-colors shadow-inner">
                          <Icon className="size-5" />
                        </div>
                        <span className="font-mono text-xs font-bold tracking-[0.25em] text-accent/80">
                          {c.id} / 06
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-3">
                        {c.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                        {c.desc}
                      </p>

                      {/* Deliverables snippet */}
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5 mb-6">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-accent mb-1">
                          PRIMARY DELIVERABLES:
                        </p>
                        <p className="font-mono text-[11px] text-foreground/80">
                          {c.deliverables}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </TiltCard3D>
              );
            })}
          </div>
        )}

        {/* Tab 2: OSINT & Information Gathering Arsenal */}
        {activeTab === "osint" && (
          <div className="mt-8 animate-fade-in">
            <OsintArsenal />
          </div>
        )}

        {/* Tab 3: Forensic Domains Atlas */}
        {activeTab === "domains" && (
          <div className="mt-8 animate-fade-in">
            <ForensicDomains embedded />
          </div>
        )}

        {/* Tab 3: Credential Roadmap */}
        {activeTab === "certifications" && (
          <div className="mt-8 animate-fade-in">
            <TechCertifications embedded />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {num} /
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {label}
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
          {children}
        </h2>
      </div>
    </div>
  );
}
