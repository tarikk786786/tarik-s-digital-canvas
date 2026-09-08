import { TiltCard3D } from "./TiltCard3D";
import photoLab from "@/assets/tarik-photo-lab.jpg";
import photoWorking from "@/assets/tarik-photo-working.jpg";
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
  Maximize2,
  Monitor,
  GraduationCap,
  Award,
  BookOpen,
  FileText,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { soundEngine } from "@/lib/sound-engine";

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
  { label: "Base", value: "Bhubaneswar, India" },
  { label: "Email", value: "princetarikislam@gmail.com" },
  { label: "Contact", value: "+91 8984473230" },
  { label: "Timezone", value: "IST (UTC +05:30)" },
];

export function AboutMe() {
  const openLabLightbox = () => {
    soundEngine.playClick();
    window.dispatchEvent(
      new CustomEvent("tarik:open-lab-lightbox", { detail: { monitor: 1 } })
    );
  };

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
              ABOUT
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-5xl">
            Who I Am — <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">
              Building technology that matters.
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl font-normal leading-relaxed text-pretty">
            I’m <strong className="text-foreground font-semibold">Tarik Islam</strong> — a multidisciplinary technologist, forensic scientist, cybersecurity engineer, AI systems builder, and founder of <strong className="text-[#62E6FF] font-semibold">Dezo.in</strong>.
          </p>
        </div>

        {/* Story Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Column: Authentic Identity Enclave & Dossier (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <TiltCard3D glowColor="rgba(98, 230, 255, 0.2)" tiltIntensity={8}>
              <div className="relative rounded-2xl border border-white/15 bg-[#0A0D12] p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-[#62E6FF]">
                    <Fingerprint className="size-4" />
                    <span className="font-bold tracking-widest uppercase">DOSSIER // TARIK.ISLAM</span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold">
                    <span className="size-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
                    VERIFIED PRACTITIONER
                  </span>
                </div>

                {/* Identity Card Interior with Authentic Working Photo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {/* Authentic Portrait Image of Tarik Working */}
                    <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-[#62E6FF]/40 shadow-[0_0_24px_rgba(98,230,255,0.25)] shrink-0 group/avatar">
                      <img
                        src={photoWorking}
                        alt="Tarik Islam — Multidisciplinary Technologist & Systems Engineer"
                        className="size-full object-cover object-center filter contrast-[1.08] saturate-[1.03] transition-transform duration-500 group-hover/avatar:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1 right-1 size-3 rounded-full bg-[#6EE7B7] border-2 border-[#0A0D12]" title="Active Practitioner" />
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">Tarik Islam</h3>
                      <p className="font-mono text-xs text-[#62E6FF] font-medium mt-0.5">Founder &amp; CEO, Dezo.in</p>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5">Forensic Scientist · Cyber Engineer · AI Builder</p>
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
                    <span>BHUBANESWAR, INDIA</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3 text-[#9B8CFF]" />
                    <span>IST (UTC +05:30)</span>
                  </span>
                </div>
              </div>
            </TiltCard3D>

            {/* Authentic Lab Command Center Card (Real Photo Evidence) */}
            <div className="p-5 sm:p-6 rounded-2xl border border-white/15 bg-[#0A0D12]/90 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold">
                <div className="flex items-center gap-2">
                  <Monitor className="size-3.5" />
                  <span>AUTHENTIC WORKSTATION EVIDENCE</span>
                </div>
                <span className="text-[#6EE7B7]">4-DISPLAYS</span>
              </div>

              {/* Photo Preview Container */}
              <div
                onClick={openLabLightbox}
                className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer aspect-[16/10]"
              >
                <img
                  src={photoLab}
                  alt="Tarik Islam engineering workstation with 4 monitors"
                  className="size-full object-cover object-center filter contrast-[1.06] transition-transform duration-500 group-hover:scale-105"
                />
                {/* Laser scanline */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#62E6FF]/20 to-transparent animate-scan-sweep opacity-75" />

                {/* Hover inspect banner */}
                <div className="absolute inset-0 bg-[#050608]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-mono text-xs text-[#62E6FF] font-bold">
                  <Maximize2 className="size-4" />
                  <span>INSPECT FULL HD TELEMETRY</span>
                </div>

                <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded bg-[#050608]/85 border border-white/10 font-mono text-[9px] text-[#6EE7B7] flex items-center gap-1">
                  <span className="size-1 rounded-full bg-[#6EE7B7]" />
                  <span>SHA-256 VERIFIED</span>
                </div>
              </div>

              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Tarik's multi-display digital laboratory in India. Dedicated physical command matrix for forensic bitstream analysis, AI agent orchestration, and full-stack software development.
              </p>

              <button
                type="button"
                onClick={openLabLightbox}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#62E6FF]/30 bg-[#62E6FF]/5 hover:bg-[#62E6FF]/15 text-[#62E6FF] font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
              >
                <span>INSPECT COMMAND MATRIX (HD)</span>
                <Maximize2 className="size-3.5" />
              </button>
            </div>

            {/* Evidence Standards Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0A0D12]/80 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] mb-3 font-semibold">
                <Terminal className="size-3.5" />
                <span>EVIDENTIARY STANDARDS &amp; PROTOCOLS</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
                Operating under rigorous verification frameworks adapted from forensic crime laboratories to enterprise digital software environments.
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

        {/* Evolution Milestones */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] mb-2 flex items-center gap-2 font-semibold">
              <span>PATHWAY OF EXPERTISE</span>
              <span className="h-px flex-1 bg-white/10" />
            </h3>
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Evolution across 5 core disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "Forensic Science",
                role: "Foundational Rigor",
                desc: "Empirical observation, evidence preservation, and chain-of-custody discipline.",
                accent: "text-[#62E6FF]",
                tag: "FORENSICS",
              },
              {
                step: "02",
                title: "Cybersecurity",
                role: "Defensive Architecture",
                desc: "Zero Trust paradigms, threat modeling, packet analysis, and root-cause triage.",
                accent: "text-[#62E6FF]",
                tag: "SECURITY",
              },
              {
                step: "03",
                title: "AI & Agents",
                role: "Intelligent Systems",
                desc: "Deterministic RAG pipelines, autonomous tool loops, and verifiable inference.",
                accent: "text-[#9B8CFF]",
                tag: "AI / ML",
              },
              {
                step: "04",
                title: "Full-Stack Systems",
                role: "Production Scale",
                desc: "Strict type contracts, edge deployment, microsecond state, and high availability.",
                accent: "text-[#6EE7B7]",
                tag: "ENGINEERING",
              },
              {
                step: "05",
                title: "Dezo.in Studio",
                role: "Founder & CEO",
                desc: "Building commercial AI products with forensic auditability and venture craft.",
                accent: "text-[#F6C85F]",
                tag: "VENTURE",
              },
            ].map((m) => (
              <div
                key={m.step}
                className="p-5 rounded-xl border border-white/10 bg-[#0A0D12] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`font-mono text-xs font-bold ${m.accent}`}>
                      {m.step} //
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {m.tag}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-foreground mb-1">
                    {m.title}
                  </h4>
                  <p className="font-mono text-[10px] text-accent uppercase tracking-wider mb-2">
                    {m.role}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Foundation & Institutional Records */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] mb-2 flex items-center gap-2 font-semibold">
              <GraduationCap className="size-4" />
              <span>ACADEMIC FOUNDATION &amp; INSTITUTIONAL RECORDS</span>
              <span className="h-px flex-1 bg-white/10" />
            </h3>
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Dual Academic Rigor: Forensic Science × Cybersecurity &amp; AI
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-2 max-w-3xl">
              Academic progression completing in 2024–25. A rare multidisciplinary trajectory pairing natural forensic science investigation with advanced masters-level computer applications and artificial intelligence engineering.
            </p>
          </div>

          {/* Degrees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                degree: "M.Tech",
                field: "Cybersecurity & AI",
                institution: "GIET Gandhi College, Bhubaneswar",
                years: "2022 – 2024-25",
                tag: "ADVANCED MASTER",
                color: "border-[#62E6FF]/30 hover:border-[#62E6FF]/60",
                accent: "text-[#62E6FF]",
                badge: "COMPLETED",
                highlights: "Advanced defensive cyber architecture, neural inference & automated threat mitigation",
              },
              {
                degree: "MCA",
                field: "Computer Applications",
                institution: "SOA University, Bhubaneswar",
                years: "2021 – 2023",
                rollNo: "SOA-MCA-2020-334781",
                tag: "MASTER DEGREE",
                color: "border-[#9B8CFF]/30 hover:border-[#9B8CFF]/60",
                accent: "text-[#9B8CFF]",
                badge: "COMPLETED",
                highlights: "Distributed software architectures, database systems, algorithms & enterprise platforms",
              },
              {
                degree: "M.Sc",
                field: "Forensic Science",
                institution: "Lakshay Institute",
                years: "2020 – 2021",
                rollNo: "MSC-FS-2021-559922",
                tag: "MASTER OF SCIENCE",
                color: "border-[#6EE7B7]/30 hover:border-[#6EE7B7]/60",
                accent: "text-[#6EE7B7]",
                badge: "COMPLETED",
                highlights: "Advanced evidence analysis, chain-of-custody protocols, toxicological & criminal autopsy rigor",
              },
              {
                degree: "B.Sc",
                field: "Forensic Science",
                institution: "Forensic Science Academy",
                years: "2016 – 2019",
                rollNo: "MSC-FS-2021-665843",
                tag: "BACHELOR OF SCIENCE",
                color: "border-[#F6C85F]/30 hover:border-[#F6C85F]/60",
                accent: "text-[#F6C85F]",
                badge: "COMPLETED",
                highlights: "Scientific methodology, forensic ballistics, fingerprint minutiae & empirical evidence analysis",
              },
            ].map((deg) => (
              <div
                key={deg.degree}
                className={`p-6 rounded-2xl border bg-[#0A0D12] transition-all duration-300 flex flex-col justify-between group shadow-lg ${deg.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[10px]">
                    <span className={`font-bold tracking-wider ${deg.accent}`}>
                      {deg.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#6EE7B7]/10 text-[#6EE7B7] border border-[#6EE7B7]/20 font-semibold text-[9px]">
                      {deg.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-2xl text-foreground">
                    {deg.degree}
                  </h4>
                  <p className={`font-mono text-xs font-semibold ${deg.accent} mt-0.5`}>
                    {deg.field}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/5 space-y-1 font-mono text-xs text-muted-foreground">
                    <p className="text-foreground font-medium">{deg.institution}</p>
                    <p className="text-[11px] text-muted-foreground">{deg.years}</p>
                    {deg.rollNo && (
                      <p className="text-[10px] text-muted-foreground/70">
                        Roll: <span className="text-foreground/90 font-semibold">{deg.rollNo}</span>
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-4 pt-3 border-t border-white/5 font-sans text-xs text-muted-foreground leading-relaxed">
                  {deg.highlights}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary Education & Specialized Training Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Specialized Training Institutes (6 cols) */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#62E6FF]">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                  <Award className="size-4" />
                  <span>SPECIALIZED COMPUTING &amp; TECHNICAL TRAINING</span>
                </div>
                <span className="text-muted-foreground text-[10px]">BHUBANESWAR</span>
              </div>
              <div className="space-y-3 font-sans text-xs">
                {[
                  {
                    name: "Lakshay Institute",
                    desc: "Intensive Programming & Advanced Technical Training covering core system algorithms and software development.",
                    tag: "Programming",
                  },
                  {
                    name: "Seeree Institute, Bhubaneswar",
                    desc: "Applied computing, web architecture, and full-stack software development pipelines.",
                    tag: "Software Engineering",
                  },
                  {
                    name: "AAC Institute, Bhubaneswar",
                    desc: "Advanced Computing Training with focus on modern systems, architecture, and network security foundations.",
                    tag: "Advanced Computing",
                  },
                ].map((t) => (
                  <div key={t.name} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-start justify-between gap-3">
                    <div>
                      <h5 className="font-display font-bold text-sm text-foreground">{t.name}</h5>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.desc}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[9px] text-[#62E6FF] shrink-0">
                      {t.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Foundational Schooling & Verified Credentials (6 cols) */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#9B8CFF]">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                    <BookOpen className="size-4" />
                    <span>FOUNDATIONAL ACADEMIC RIGOR</span>
                  </div>
                  <span className="text-muted-foreground text-[10px]">CHSE / CBSE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9B8CFF] font-bold">12th SCIENCE</span>
                      <span className="text-[#6EE7B7] font-semibold text-[11px]">67%</span>
                    </div>
                    <div className="text-foreground font-semibold mt-1">Sagar College of Science</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">CHSE Odisha · 2015 · Roll: 202305120</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9B8CFF] font-bold">10th MATRICULATION</span>
                      <span className="text-[#6EE7B7] font-semibold text-[11px]">79%</span>
                    </div>
                    <div className="text-foreground font-semibold mt-1">Maharishi Vidya Mandir</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">CBSE Board · 2013 · Roll: 610113</div>
                  </div>
                </div>

                {/* Core Resume Certifications */}
                <div className="pt-3 border-t border-white/5 space-y-2 font-mono text-xs">
                  <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
                    OFFICIAL RESUME CERTIFICATIONS (VERIFIED ON RECORD):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { code: "CEH", label: "Certified Ethical Hacker" },
                      { code: "CHFI", label: "Computer Hacking Forensic Investigator" },
                      { code: "OSCP", label: "Offensive Security Certified Professional" },
                    ].map((c) => (
                      <span
                        key={c.code}
                        className="px-3 py-1.5 rounded-lg border border-[#62E6FF]/30 bg-[#62E6FF]/5 text-xs text-foreground flex items-center gap-2"
                      >
                        <span className="font-bold text-[#62E6FF]">{c.code}</span>
                        <span className="text-muted-foreground text-[11px]">({c.label})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* PDF Resume Link Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">
                  Official CV &amp; Institutional transcripts
                </span>
                <a
                  href="/resume"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#62E6FF]/40 bg-[#62E6FF]/10 hover:bg-[#62E6FF]/20 text-[#62E6FF] font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <FileText className="size-3.5" />
                  <span>VIEW FULL RÉSUMÉ</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
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
