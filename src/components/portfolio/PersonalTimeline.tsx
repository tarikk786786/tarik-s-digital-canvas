import { ShieldCheck, Terminal, Brain, Rocket, Clock, CheckCircle2 } from "lucide-react";

interface Milestone {
  era: string;
  year: string;
  title: string;
  role: string;
  category: string;
  narrative: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: Milestone[] = [
  {
    era: "CHAPTER 01",
    year: "FOUNDATIONS",
    title: "Forensic Science & Evidence Analysis",
    role: "Investigative Scientist & Researcher",
    category: "FORENSIC SCIENCES",
    narrative:
      "Grounded in physical, chemical, and digital evidence analysis. Studied crime scene preservation, chain-of-custody protocols, DNA profiling, and digital forensic extraction. This scientific training permanently instilled an evidence-first, zero-assumption methodology.",
    highlights: [
      "Rigorous ISO/IEC 27037 & NIST evidence preservation standards",
      "Crime scene reconstruction & biological fluid classification",
      "Digital artifact recovery across file systems & volatile memory",
    ],
    icon: ShieldCheck,
  },
  {
    era: "CHAPTER 02",
    year: "SYSTEMS SECURITY",
    title: "Cybersecurity & Defensive Engineering",
    role: "Cybersecurity Engineer & Threat Hunter",
    category: "ZERO-TRUST CYBER",
    narrative:
      "Transitioned forensic investigation principles directly into offensive and defensive cybersecurity. Engineered zero-trust network perimeter models, automated threat detection rules using the MITRE ATT&CK matrix, and built forensic triage tooling for security operations.",
    highlights: [
      "Proactive threat modeling, AppSec, and API contract hardening",
      "Real-time packet inspection & SIEM anomaly correlation",
      "Cryptographic integrity chaining with SHA-256 Merkle trees",
    ],
    icon: Terminal,
  },
  {
    era: "CHAPTER 03",
    year: "DEEP TECH & ML",
    title: "Applied AI & Autonomous Agent Architecture",
    role: "AI Systems Architect & Researcher",
    category: "INTELLIGENT SYSTEMS",
    narrative:
      "Designed and deployed production-grade AI systems, multi-agent orchestrations, and deterministic RAG retrieval pipelines. Applied deep learning computer vision to forensic image analysis and automated multi-modal evidence parsing.",
    highlights: [
      "Autonomous agent workflows with verifiable tool calling",
      "Deterministic citation-grounded RAG architectures",
      "Sub-second edge model serving and prompt injection defense",
    ],
    icon: Brain,
  },
  {
    era: "CHAPTER 04",
    year: "2026 — PRESENT",
    title: "Founding Dezo.in — AI Product Studio",
    role: "Founder & CEO, Dezo.in",
    category: "VENTURE & PRODUCT",
    narrative:
      "United forensic rigor, cybersecurity defense, and artificial intelligence under one founding roof: Dezo.in. Building AI-native products with an audit-grade standard, delivering high-velocity software for high-stakes environments globally.",
    highlights: [
      "0→1 product engineering, brand strategy, and venture leadership",
      "Architecting secure-by-design intelligent software platforms",
      "Operating from India with global clientele and partnerships",
    ],
    icon: Rocket,
  },
];

export function PersonalTimeline() {
  return (
    <section id="journey" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0C0E12] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 size-[32rem] rounded-full blur-3xl opacity-10 bg-radial from-accent/20 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
                02 /
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                PERSONAL CHRONOLOGY
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
              My Evolution & Journey <br className="hidden sm:block" />
              <span className="italic font-light text-gradient-flow">From Forensic Evidence to AI Systems</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Clock className="size-4 text-accent" />
            <span>AUTHENTIC TIMELINE · FIELD RECORD</span>
          </div>
        </div>

        {/* Chronology List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-px before:bg-white/10 before:-translate-x-1/2 before:pointer-events-none">
          {MILESTONES.map((m, idx) => {
            const Icon = m.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={m.era}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node on Timeline */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 size-12 rounded-full border border-accent/40 bg-[#14161C] flex items-center justify-center text-accent shadow-[0_0_20px_rgba(232,168,56,0.3)] z-20">
                  <Icon className="size-5" />
                </div>

                {/* Content Card (Half Width) */}
                <div className="w-full md:w-[calc(50%-3rem)] ml-16 md:ml-0">
                  <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-[#14161C]/90 to-[#0F1116] backdrop-blur-xl shadow-xl hover:border-accent/40 transition-all duration-300 group">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                        {m.era} · {m.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        {m.category}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-1">
                      {m.title}
                    </h3>
                    <p className="font-mono text-xs text-accent/90 mb-4 tracking-wide">
                      {m.role}
                    </p>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                      {m.narrative}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                      {m.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 font-sans text-xs text-foreground/80">
                          <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Half spacer for alternate layout */}
                <div className="hidden md:block w-[calc(50%-3rem)]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
