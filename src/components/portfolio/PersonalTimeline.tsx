import {
  ShieldCheck,
  Terminal,
  Brain,
  Layers,
  Rocket,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  Cpu,
} from "lucide-react";

interface JourneyChapter {
  chapter: string;
  tag: string;
  title: string;
  subtitle: string;
  narrative: string[];
  keyPrinciple?: string;
  inquiries?: string[];
  formula?: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderColor: string;
}

const JOURNEY_STEPS = [
  "Forensic Science",
  "Digital Forensics",
  "Cybersecurity",
  "Artificial Intelligence",
  "Full-Stack Engineering",
  "Product Development",
  "Entrepreneurship",
];

const CHAPTERS: JourneyChapter[] = [
  {
    chapter: "CHAPTER 01",
    tag: "FOUNDATIONS & SCIENTIFIC METHOD",
    title: "Forensic Science & Evidence Analysis",
    subtitle: "Observation, Accuracy & Logical Reasoning",
    narrative: [
      "I began with an interest in forensic science, where accuracy, observation, evidence, documentation, and logical reasoning are fundamental.",
      "Forensics taught me an important principle that continues to influence the way I work today: Never assume when you can investigate. That mindset naturally led me toward the digital world.",
    ],
    keyPrinciple: "Never assume when you can investigate.",
    highlights: [
      "Evidence preservation & chain-of-custody discipline",
      "Empirical testing and deterministic reproducibility",
      "Rigorous documentation that withstands adversarial scrutiny",
    ],
    icon: Search,
    accentColor: "text-[#62E6FF]",
    borderColor: "hover:border-[#62E6FF]/50",
  },
  {
    chapter: "CHAPTER 02",
    tag: "DIGITAL INFRASTRUCTURE & DEFENSE",
    title: "Digital Forensics & Cybersecurity",
    subtitle: "From 'What happened?' to 'How can it be prevented?'",
    narrative: [
      "As technology became increasingly connected to crime, privacy, identity, and security, I became deeply interested in digital forensics and cybersecurity. I started looking beyond individual devices and toward the larger systems behind them—networks, applications, infrastructure, data, identities, and the ways those systems can be attacked or defended.",
      "Cybersecurity introduced me to a different kind of thinking. That transition from investigation to defense became an essential cornerstone of my journey.",
    ],
    inquiries: [
      "How did it happen?",
      "Why was it possible?",
      "What evidence remains?",
      "How can it be prevented?",
    ],
    highlights: [
      "Proactive zero-trust defense & threat modeling",
      "Memory forensics, packet inspection & log correlation",
      "Securing infrastructure across identity, network & application layers",
    ],
    icon: Lock,
    accentColor: "text-[#62E6FF]",
    borderColor: "hover:border-[#62E6FF]/50",
  },
  {
    chapter: "CHAPTER 03",
    tag: "INTELLIGENT SYSTEMS & REASONING",
    title: "Artificial Intelligence & Agent Systems",
    subtitle: "Building Software That Can Reason & Assist",
    narrative: [
      "Then came artificial intelligence. AI changed the way I thought about software. It wasn't simply another technology to learn. It introduced the possibility of creating systems capable of processing information, reasoning over complex problems, interacting with tools, automating workflows, and assisting humans in ways traditional software could not.",
      "I began exploring AI systems, agents, automation, retrieval systems, intelligent applications, and AI-native product architectures.",
    ],
    formula: "Evidence + Security + Intelligence + Software",
    highlights: [
      "Autonomous agent architectures with verifiable tool use",
      "Citation-grounded RAG pipelines & knowledge retrieval",
      "AI-native workflow automation that removes weeks of friction",
    ],
    icon: Brain,
    accentColor: "text-[#9B8CFF]",
    borderColor: "hover:border-[#9B8CFF]/50",
  },
  {
    chapter: "CHAPTER 04",
    tag: "SYSTEMS ARCHITECTURE & CRAFT",
    title: "Full-Stack Engineering & Production Craft",
    subtitle: "Combining Disciplines into Complete Systems",
    narrative: [
      "At the same time, I became increasingly interested in the process of actually building products. I began working with modern development ecosystems, full-stack technologies, APIs, open-source projects, cloud platforms, databases, payment infrastructure, UI systems, and AI development tools.",
      "I became less interested in simply learning technologies individually and more interested in understanding how they could be combined into complete, production-oriented systems.",
    ],
    highlights: [
      "TypeScript, React, Python, Rust & modern cloud databases",
      "Designing resilient APIs, state flows & zero-trust boundaries",
      "End-to-end architecture from data ingestion to user experience",
    ],
    icon: Layers,
    accentColor: "text-[#62E6FF]",
    borderColor: "hover:border-[#62E6FF]/50",
  },
  {
    chapter: "CHAPTER 05",
    tag: "ENTREPRENEURSHIP & PRODUCT CREATION",
    title: "Entrepreneurship & Founding Dezo.in",
    subtitle: "Creating Products and Systems with Real-World Potential",
    narrative: [
      "That eventually led me toward entrepreneurship. I realized that building technology is only one part of creating something valuable. A successful product also needs a real problem, a good user experience, reliable engineering, security, distribution, monetization, and continuous improvement.",
      "This became the foundation for my work as a founder and builder. Through Dezo.in and my other projects, I began moving from experimenting with technology toward creating products and systems with real-world potential.",
    ],
    keyPrinciple: "A small studio inside one mind — building with velocity & audit-grade craft.",
    highlights: [
      "Founder & CEO of Dezo.in (AI-native product studio)",
      "0→1 execution across product architecture, design & market distribution",
      "Building software that solves high-stakes problems with measurable leverage",
    ],
    icon: Rocket,
    accentColor: "text-[#6EE7B7]",
    borderColor: "hover:border-[#6EE7B7]/50",
  },
];

export function PersonalTimeline() {
  return (
    <section
      id="journey"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#050608] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 size-[36rem] rounded-full blur-3xl opacity-10 bg-radial from-[#62E6FF]/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 size-[36rem] rounded-full blur-3xl opacity-10 bg-radial from-[#9B8CFF]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF]">
              02 /
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              MY STORY &amp; JOURNEY
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            My Story &amp; Journey — <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">
              How things work, why they fail, and building what matters.
            </span>
          </h2>
          <div className="mt-8 p-6 md:p-8 rounded-2xl border border-white/10 bg-[#0A0D12] backdrop-blur-xl shadow-xl">
            <p className="font-sans text-lg sm:text-xl text-foreground/90 leading-relaxed font-normal">
              “My journey has never been about following a single path. It has been about understanding{" "}
              <strong className="text-foreground font-semibold">
                how things work, why they fail, how evidence reveals the truth, and how technology can be used to build better systems.
              </strong>”
            </p>
          </div>
        </div>

        {/* Interconnected Path Tracker Ribbon */}
        <div className="mb-20 p-6 rounded-2xl border border-white/10 bg-[#0A0D12]/80 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-widest text-[#62E6FF]">
            <Sparkles className="size-3.5" />
            <span>INTERCONNECTED DISCIPLINARY TRAJECTORY</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-mono">
            {JOURNEY_STEPS.map((step, idx) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span
                  className={`px-3 py-1.5 rounded-lg border ${
                    idx === JOURNEY_STEPS.length - 1
                      ? "border-[#62E6FF] bg-[#62E6FF]/15 text-[#62E6FF] font-bold shadow-[0_0_15px_rgba(98,230,255,0.3)]"
                      : "border-white/10 bg-white/[0.03] text-foreground/90 hover:border-white/20"
                  }`}
                >
                  {step}
                </span>
                {idx < JOURNEY_STEPS.length - 1 && (
                  <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Chronology Timeline Cards */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-px before:bg-white/10 before:-translate-x-1/2 before:pointer-events-none">
          {CHAPTERS.map((m, idx) => {
            const Icon = m.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={m.chapter}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node on Timeline Spine */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 size-14 rounded-2xl border border-[#62E6FF]/40 bg-[#0A0D12] flex items-center justify-center text-[#62E6FF] shadow-[0_0_24px_rgba(98,230,255,0.35)] z-20">
                  <Icon className="size-6" />
                </div>

                {/* Content Card (Half Width) */}
                <div className="w-full md:w-[calc(50%-3.5rem)] ml-16 md:ml-0">
                  <div
                    className={`p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12] backdrop-blur-xl shadow-xl transition-all duration-300 group ${m.borderColor}`}
                  >
                    {/* Chapter & Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] font-bold">
                        {m.chapter}
                      </span>
                      <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        {m.tag}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-[#62E6FF] transition-colors mb-1">
                      {m.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mb-6">
                      {m.subtitle}
                    </p>

                    {/* Narrative Paragraphs */}
                    <div className="space-y-4 font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                      {m.narrative.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    {/* Key Principle Highlight (if any) */}
                    {m.keyPrinciple && (
                      <div className="mb-6 p-4 rounded-xl border border-[#62E6FF]/30 bg-[#62E6FF]/10 font-mono text-xs text-[#62E6FF]">
                        <span className="uppercase tracking-widest text-[9px] block text-[#62E6FF]/70 mb-1">
                          OPERATING PRINCIPLE
                        </span>
                        <p className="font-semibold text-foreground text-sm">
                          “{m.keyPrinciple}”
                        </p>
                      </div>
                    )}

                    {/* Cybersecurity 4 Inquiries Box (if any) */}
                    {m.inquiries && (
                      <div className="mb-6 p-5 rounded-xl border border-[#62E6FF]/25 bg-[#62E6FF]/5 space-y-2.5">
                        <span className="font-mono uppercase tracking-widest text-[10px] text-[#62E6FF] block font-semibold">
                          CYBERSECURITY INQUIRY FRAMEWORK
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.inquiries.map((q) => (
                            <div
                              key={q}
                              className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-foreground/90 flex items-center gap-2"
                            >
                              <span className="size-1.5 rounded-full bg-[#62E6FF]" />
                              <span>“{q}”</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Synthesis Formula (if any) */}
                    {m.formula && (
                      <div className="mb-6 p-4 rounded-xl border border-[#9B8CFF]/25 bg-[#9B8CFF]/5">
                        <span className="font-mono uppercase tracking-widest text-[10px] text-[#9B8CFF] block mb-1 font-semibold">
                          THE SYNTHESIS FORMULA
                        </span>
                        <p className="font-mono text-xs sm:text-sm font-bold text-foreground">
                          {m.formula}
                        </p>
                      </div>
                    )}

                    {/* Highlights List */}
                    <div className="space-y-2 pt-5 border-t border-white/10">
                      {m.highlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 font-sans text-xs text-foreground/85"
                        >
                          <CheckCircle2 className="size-3.5 text-[#62E6FF] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Half spacer for alternate layout */}
                <div className="hidden md:block w-[calc(50%-3.5rem)]" />
              </div>
            );
          })}
        </div>

        {/* Concluding Journey Statement & North Star */}
        <div className="mt-20 relative rounded-3xl border border-white/15 bg-[#0A0D12] p-8 md:p-14 shadow-2xl overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 bg-radial from-[#62E6FF]/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 font-mono text-[10px] uppercase tracking-widest text-accent">
              <Sparkles className="size-3" />
              <span>THE HORIZON</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug">
              “I don't consider this journey finished. In many ways, I'm still at the beginning.”
            </h3>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every project gives me another problem to investigate. Every failure gives me another system to understand. Every technology I learn creates another possibility to explore. And that is what keeps me moving forward.
            </p>

            <div className="pt-4 border-t border-white/10">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                I don't want to simply learn what already exists. <br />
                <span className="italic font-light text-gradient-flow">
                  I want to understand it, improve it, and eventually build what doesn't exist yet.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
