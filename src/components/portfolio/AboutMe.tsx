import { TiltCard3D } from "./TiltCard3D";
import {
  Compass,
  Shield,
  Brain,
  Repeat,
  MapPin,
  Clock,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Terminal,
  Cpu,
  Fingerprint,
  Sparkles,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

const PHILOSOPHY_PILLARS = [
  {
    icon: Compass,
    title: "Evidence over assumptions.",
    subtitle: "FORENSIC RIGOR",
    accent: "text-[#62E6FF]",
    borderGlow: "hover:border-[#62E6FF]/50",
    desc: "Question assumptions, understand the underlying system, verify what is true, and build solutions that can withstand scrutiny with mathematical and cryptographic certainty.",
  },
  {
    icon: Shield,
    title: "Security by design.",
    subtitle: "ZERO-TRUST DEFENSE",
    accent: "text-[#62E6FF]",
    borderGlow: "hover:border-[#62E6FF]/50",
    desc: "Defending systems against adversaries from the architectural bedrock. Security is never an afterthought or a badge — it dictates data flow, API contracts, and trust boundaries.",
  },
  {
    icon: Brain,
    title: "Intelligence with purpose.",
    subtitle: "AI SYSTEMS & AGENTS",
    accent: "text-[#9B8CFF]",
    borderGlow: "hover:border-[#9B8CFF]/50",
    desc: "Building systems that reason, retrieve verified knowledge, automate complex workflows, and assist real-world human decisions — not synthetic hype or empty parlor tricks.",
  },
  {
    icon: Repeat,
    title: "Build, measure, improve.",
    subtitle: "CONTINUOUS ITERATION",
    accent: "text-[#6EE7B7]",
    borderGlow: "hover:border-[#6EE7B7]/50",
    desc: "Constantly researching, experimenting, building, testing, breaking, learning, and rebuilding. Relentless momentum applied to craft technology that endures.",
  },
];

const ENCLAVE_SPECS = [
  { label: "Identity", value: "Tarik Islam" },
  { label: "Role", value: "Multidisciplinary Technologist" },
  { label: "Primary Venture", value: "Founder & CEO, Dezo.in" },
  { label: "Disciplines", value: "Forensics · Cyber · AI · Systems" },
  { label: "Base of Operations", value: "India (Operating Globally)" },
  { label: "Timezone", value: "IST (UTC +05:30)" },
];

export function AboutMe() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#050608] overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 size-[40rem] rounded-full blur-3xl opacity-10 bg-radial from-[#62E6FF]/15 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-[36rem] rounded-full blur-3xl opacity-10 bg-radial from-[#9B8CFF]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF]">
              01 /
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              WHO I AM
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-5xl">
            Who I Am — <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">
              Building technology that matters.
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl font-normal leading-relaxed text-pretty">
            I’m <strong className="text-foreground font-semibold">Tarik Islam</strong> — a multidisciplinary technologist, forensic scientist, cybersecurity engineer, AI systems builder, and entrepreneur.
          </p>
        </div>

        {/* Story Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Column: Authentic Identity Enclave & Dossier (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <TiltCard3D glowColor="rgba(98, 230, 255, 0.2)" tiltIntensity={8}>
              <div className="relative rounded-2xl border border-white/10 bg-[#0A0D12] p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-[#62E6FF]">
                    <Fingerprint className="size-4" />
                    <span className="font-bold tracking-widest uppercase">DOSSIER // TARIK.ISLAM</span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold">
                    <span className="size-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
                    ACTIVE ENCLAVE
                  </span>
                </div>

                {/* Identity Card Interior */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-xl border border-[#62E6FF]/30 bg-[#62E6FF]/10 flex items-center justify-center font-display text-2xl font-bold text-[#62E6FF] shadow-[0_0_20px_rgba(98,230,255,0.2)]">
                      TI
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground">Tarik Islam</h3>
                      <p className="font-mono text-xs text-[#62E6FF] font-medium">Founder &amp; CEO, Dezo.in</p>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5">Multidisciplinary Technologist &amp; Systems Engineer</p>
                    </div>
                  </div>

                  {/* Core Pillar Badges */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[10px] text-foreground/90">
                      Forensic Science
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[10px] text-foreground/90">
                      Zero-Trust Security
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[10px] text-[#9B8CFF]">
                      AI Systems &amp; Agents
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[10px] text-[#62E6FF]">
                      Full-Stack Architecture
                    </span>
                  </div>
                </div>

                {/* Enclave Specs Table */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
                  {ENCLAVE_SPECS.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between font-mono text-xs py-1 border-b border-white/[0.03] last:border-0"
                    >
                      <span className="text-muted-foreground text-[11px] uppercase tracking-wider">{spec.label}</span>
                      <span className="text-foreground font-semibold text-[11px] text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Verification Coordinates Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-muted-foreground font-mono text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3 text-[#62E6FF]" />
                    <span>INDIA (GLOBAL ENCLAVE)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3 text-[#9B8CFF]" />
                    <span>IST (UTC +05:30)</span>
                  </span>
                </div>
              </div>
            </TiltCard3D>

            {/* Evidence Standards Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0A0D12]/80 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] mb-3 font-semibold">
                <Terminal className="size-3.5" />
                <span>EVIDENTIARY STANDARDS &amp; PROTOCOLS</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
                Operating under rigorous verification frameworks adapted from forensic crime laboratories to enterprise digital environments.
              </p>
              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                  <div className="text-muted-foreground text-[9px]">METHODOLOGY</div>
                  <div className="text-foreground font-semibold mt-0.5">ISO/IEC 27037</div>
                </div>
                <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                  <div className="text-muted-foreground text-[9px]">SECURITY AUDIT</div>
                  <div className="text-foreground font-semibold mt-0.5">NIST SP 800-86</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Detailed Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Story Card 1: The Evidence-First Mindset */}
            <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12]/90 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-[#62E6FF] font-mono text-xs uppercase tracking-widest font-semibold">
                <Sparkles className="size-4" />
                <span>INTERSECTION OF DISCIPLINES</span>
              </div>
              <p className="font-sans text-base md:text-lg text-foreground/90 leading-relaxed">
                My work sits at the intersection of <strong className="text-foreground font-semibold">forensic science, cybersecurity, artificial intelligence, and full-stack systems engineering</strong>. I approach technology with an evidence-first mindset: question assumptions, understand the underlying system, verify what is true, and build solutions that can withstand scrutiny.
              </p>
            </div>

            {/* Story Card 2: Evolution & The Three Dimensions */}
            <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12]/90 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-[#9B8CFF] font-mono text-xs uppercase tracking-widest font-semibold">
                <Layers className="size-4" />
                <span>THE EVOLUTION</span>
              </div>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                My journey has evolved from understanding <strong className="text-foreground font-semibold">physical and digital evidence</strong> to engineering <strong className="text-foreground font-semibold">secure intelligent systems</strong>.
              </p>
              <div className="space-y-3 pt-2 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="size-4 text-[#62E6FF] shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Forensic Science:</strong> Taught me the non-negotiable importance of evidence, precision, reproducibility, and chain of custody.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="size-4 text-[#62E6FF] shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Cybersecurity:</strong> Extended that investigative thinking into proactively defending systems against adversaries in real time.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="size-4 text-[#9B8CFF] shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Artificial Intelligence:</strong> Opened another dimension — building systems that can reason, retrieve information, automate complex workflows, and assist with real-world decisions.
                  </div>
                </div>
              </div>
              <p className="font-sans text-base md:text-lg text-foreground/90 leading-relaxed pt-2">
                Today, I bring those disciplines together through <strong className="text-foreground font-semibold">software engineering, AI systems, cybersecurity, automation, and product development</strong>.
              </p>
            </div>

            {/* Story Card 3: Dezo.in & Complete Systems Thinking */}
            <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12]/90 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-[#62E6FF] font-mono text-xs uppercase tracking-widest font-semibold">
                <Compass className="size-4" />
                <span>DEZO.IN &amp; SYSTEMS ARCHITECTURE</span>
              </div>
              <p className="font-sans text-base md:text-lg text-foreground/90 leading-relaxed">
                I am also the founder of <strong className="text-[#62E6FF] font-semibold">Dezo.in</strong>, where I am building an AI-native product studio focused on creating secure, intelligent, and useful software products.
              </p>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                I don't see technology as isolated pieces of code. I see it as a <strong className="text-foreground font-semibold">complete system</strong> — the architecture, security, intelligence, user experience, data, automation, business model, and the people who ultimately depend on it.
              </p>
            </div>

            {/* Call to Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.2em]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-[#62E6FF] text-[#050608] font-bold shadow-[0_0_24px_rgba(98,230,255,0.35)] hover:bg-[#A5F3FC] hover:shadow-[0_0_36px_rgba(98,230,255,0.5)] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>CONNECT WITH TARIK</span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/15 bg-white/5 text-foreground hover:border-[#62E6FF] hover:bg-[#62E6FF]/10 transition-colors"
              >
                <span>EXPLORE MY JOURNEY</span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>VIEW CASE FILES</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Core Tenets of the Philosophy */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] mb-2 flex items-center gap-2 font-semibold">
              <span>MY CORE PHILOSOPHY</span>
              <span className="h-px flex-1 bg-white/10" />
            </h3>
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              My philosophy is simple:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`p-7 rounded-2xl border border-white/10 bg-[#0A0D12] backdrop-blur-md transition-all duration-300 flex flex-col justify-between group ${p.borderGlow}`}
                >
                  <div>
                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className={`size-6 ${p.accent}`} />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-2">
                      {p.subtitle}
                    </span>
                    <h4 className="font-display font-bold text-xl text-foreground mb-3 leading-snug">
                      {p.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Concluding Manifesto Callout Banner */}
        <div className="relative rounded-3xl border border-[#62E6FF]/30 bg-gradient-to-br from-[#0A1017] via-[#0A0D12] to-[#050608] p-8 md:p-14 shadow-[0_20px_80px_rgba(98,230,255,0.12)] overflow-hidden">
          {/* Subtle geometric lines */}
          <div className="absolute top-0 right-0 size-96 bg-radial from-[#62E6FF]/10 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#62E6FF] font-semibold">
              DAILY OPERATING IMPERATIVE
            </p>

            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground font-bold leading-tight tracking-tight">
              “I am constantly researching, experimenting, building, testing, breaking, learning, and rebuilding. <br />
              <span className="text-muted-foreground font-light italic">
                My goal is not simply to follow technology.
              </span>”
            </blockquote>

            <div className="pt-2">
              <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.02]">
                My goal is to build{" "}
                <span className="italic font-light text-gradient-flow">
                  technology that matters.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
