import { useState } from "react";
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
  FileText,
  FlaskConical,
  Dna,
  FileSearch,
  ShieldAlert,
  Scale,
  Search,
  Microscope,
  ChevronRight,
  Beaker,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { soundEngine } from "@/lib/sound-engine";
import { PROFILE } from "@/lib/profile";
import { ForensicLabSimulator } from "./ForensicLabSimulator";
import {
  FORENSIC_SPECIALTIES,
  WHY_I_CHOSE_TECH,
  type ForensicSpecialty,
} from "@/content/forensic-specialties";

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

const SPECIALTY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  toxicology: FlaskConical,
  dactyloscopy: Fingerprint,
  "serology-dna": Dna,
  "questioned-documents": FileSearch,
  ballistics: ShieldAlert,
  "crime-scene": Scale,
  "digital-forensics": Terminal,
};

export function AboutMe() {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("toxicology");

  const openLabLightbox = () => {
    soundEngine.playClick();
    window.dispatchEvent(
      new CustomEvent("tarik:open-lab-lightbox", { detail: { monitor: 1 } })
    );
  };

  const activeSpecialty =
    FORENSIC_SPECIALTIES.find((s) => s.id === selectedSpecialtyId) ||
    FORENSIC_SPECIALTIES[0];

  const ActiveIcon = SPECIALTY_ICONS[activeSpecialty.id] || Microscope;

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
              ABOUT &amp; INVESTIGATIVE ORIGIN
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-5xl">
            Driven by Curiosity — <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">
              To research, investigate &amp; engineer truth.
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl font-normal leading-relaxed text-pretty">
            I’m <strong className="text-foreground font-semibold">Tarik Islam</strong> — a forensic scientist, cybersecurity engineer, and AI systems builder. My journey started with a deep, instinctive curiosity to explore beneath the surface, investigate complex systems, and discover the truth through empirical research.
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
                    ACTIVE PRACTITIONER
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

            {/* Authentic Lab Command Center Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-white/15 bg-[#0A0D12]/90 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold">
                <div className="flex items-center gap-2">
                  <Monitor className="size-3.5" />
                  <span>INVESTIGATION COMMAND MATRIX</span>
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
                  <span>INSPECT FULL HD WORKSTATION</span>
                </div>

                <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded bg-[#050608]/85 border border-white/10 font-mono text-[9px] text-[#6EE7B7] flex items-center gap-1">
                  <span className="size-1 rounded-full bg-[#6EE7B7]" />
                  <span>BITSTREAM &amp; AI TELEMETRY</span>
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
                  <div className="text-muted-foreground text-[9px]">DIGITAL EVIDENCE</div>
                  <div className="text-foreground font-semibold mt-0.5">ISO/IEC 27037</div>
                </div>
                <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                  <div className="text-muted-foreground text-[9px]">CRIME LAB TESTING</div>
                  <div className="text-foreground font-semibold mt-0.5">ISO/IEC 17025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why I Chose Tech & The Investigative Journey (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Story Card: Why I Chose Tech Main Feature */}
            <div className="p-8 md:p-10 rounded-2xl border border-[#62E6FF]/30 bg-gradient-to-br from-[#0A1017] via-[#0A0D12] to-[#050608] shadow-[0_10px_40px_rgba(98,230,255,0.08)] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#62E6FF] font-mono text-xs uppercase tracking-widest font-bold">
                  <Search className="size-4" />
                  <span>INVESTIGATIVE ORIGIN</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#62E6FF]/10 text-[#62E6FF] text-[10px] font-mono font-semibold border border-[#62E6FF]/20">
                  THE TRANSITION TO TECH
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                  {WHY_I_CHOSE_TECH.headline}
                </h3>
                <p className="font-sans text-sm md:text-base text-[#62E6FF]/90 mt-2 font-medium">
                  {WHY_I_CHOSE_TECH.subheadline}
                </p>
              </div>

              {/* Narrative Blocks */}
              <div className="space-y-4 pt-2">
                {WHY_I_CHOSE_TECH.narrative.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#62E6FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="size-3 text-[#62E6FF]" />
                        {item.title}
                      </span>
                      <span className="text-muted-foreground px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {item.tag}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.blurb}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="pt-2 border-t border-white/10">
                <blockquote className="font-sans italic text-sm text-foreground/90 border-l-2 border-[#62E6FF] pl-4 py-1">
                  {WHY_I_CHOSE_TECH.quote.text}
                </blockquote>
                <p className="font-mono text-[10px] text-muted-foreground mt-2 pl-4">
                  — {WHY_I_CHOSE_TECH.quote.author} · <span className="text-[#62E6FF]">{WHY_I_CHOSE_TECH.quote.role}</span>
                </p>
              </div>
            </div>

            {/* Story Card 2: Dezo.in & The Complete System */}
            <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0A0D12]/90 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-[#9B8CFF] font-mono text-xs uppercase tracking-widest font-semibold">
                <Compass className="size-4" />
                <span>DEZO.IN &amp; PRODUCT CRAFT</span>
              </div>
              <p className="font-sans text-base md:text-lg text-foreground/90 leading-relaxed">
                As the founder of <strong className="text-[#62E6FF] font-semibold">Dezo.in</strong>, I translate this investigative rigor into building AI-native products. I treat software not as disconnected code, but as a <strong className="text-foreground font-semibold">complete empirical system</strong>.
              </p>
              <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                From low-level data telemetry and zero-trust perimeter defenses to autonomous agent orchestration and high-fidelity user experiences — every component is designed with the same audit-grade integrity required of court-admissible evidence.
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
                href="#forensic-specialties"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/15 bg-white/5 text-foreground hover:border-[#62E6FF] hover:bg-[#62E6FF]/10 transition-colors"
              >
                <span>EXPLORE FORENSIC SPECIALTIES</span>
              </a>

              <a
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>VIEW RÉSUMÉ</span>
              </a>
            </div>
          </div>
        </div>

        {/* Forensic Specialties Showcase Section */}
        <div id="forensic-specialties" className="mb-24 scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#62E6FF]">
                SCIENTIFIC RIGOR /
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                LABORATORY EXPERTISE
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Forensic Science Specialties &amp; Analytical Mastery
            </h3>
            <p className="font-sans text-base text-muted-foreground mt-3 max-w-4xl">
              Deep scientific background spanning chemical, biological, physical, and digital forensic disciplines. Every specialty represents hands-on instrumentation mastery, empirical testing principles, and court-admissible standards.
            </p>
          </div>

          {/* Interactive Discipline Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {FORENSIC_SPECIALTIES.map((spec) => {
              const Icon = SPECIALTY_ICONS[spec.id] || Microscope;
              const isSelected = spec.id === selectedSpecialtyId;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedSpecialtyId(spec.id);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "border-[#62E6FF] bg-[#62E6FF]/15 text-[#62E6FF] font-bold shadow-[0_0_20px_rgba(98,230,255,0.2)]"
                      : "border-white/10 bg-[#0A0D12] text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{spec.title.split("&")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Specialty Detailed Dossier */}
          <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A1017] via-[#0A0D12] to-[#050608] shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-2xl bg-[#62E6FF]/10 border border-[#62E6FF]/30 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(98,230,255,0.2)]">
                  <ActiveIcon className="size-8 text-[#62E6FF]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] px-2.5 py-0.5 rounded-full bg-[#62E6FF]/10 border border-[#62E6FF]/20 font-bold">
                      {activeSpecialty.category.toUpperCase()} FORENSICS
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      SPEC-ID // {activeSpecialty.id.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
                    {activeSpecialty.title}
                  </h4>
                  <p className="font-mono text-xs sm:text-sm text-[#9B8CFF] font-medium mt-1">
                    {activeSpecialty.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-center font-mono text-xs text-right">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">LEGAL STANDARD</span>
                <span className="text-[#6EE7B7] font-semibold mt-0.5 max-w-xs">{activeSpecialty.legalEvidentiaryStandard.split("&")[0]}</span>
              </div>
            </div>

            {/* Summary description */}
            <p className="font-sans text-base sm:text-lg text-foreground/90 leading-relaxed">
              {activeSpecialty.summary}
            </p>

            {/* 3-Column Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              {/* Column 1: Analytical Instrumentation */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#62E6FF] uppercase tracking-wider">
                  <Beaker className="size-4" />
                  <span>INSTRUMENTATION &amp; APPARATUS</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs text-muted-foreground">
                  {activeSpecialty.instrumentation.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="size-3.5 text-[#62E6FF] shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Core Competencies */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#6EE7B7] uppercase tracking-wider">
                  <CheckCircle2 className="size-4" />
                  <span>LABORATORY COMPETENCIES</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs text-muted-foreground">
                  {activeSpecialty.coreCompetencies.map((comp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Scientific Principles & Admissibility */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F6C85F] uppercase tracking-wider">
                    <Scale className="size-4" />
                    <span>FOUNDATIONAL SCIENTIFIC LAW</span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed italic bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    {activeSpecialty.scientificPrinciple}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                    JUDICIAL ADMISSIBILITY STANDARD
                  </span>
                  <p className="font-mono text-xs text-[#6EE7B7] font-semibold">
                    {activeSpecialty.legalEvidentiaryStandard}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Interactive Forensic Laboratory Suite */}
          <div className="mt-8">
            <ForensicLabSimulator />
          </div>
        </div>

        {/* Academic Degrees & Scientific Qualifications */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] mb-2 flex items-center gap-2 font-semibold">
              <GraduationCap className="size-4" />
              <span>ACADEMIC DEGREES &amp; QUALIFICATIONS</span>
              <span className="h-px flex-1 bg-white/10" />
            </h3>
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Multidisciplinary Academic Mastery: Forensic Science × Cybersecurity &amp; AI
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-2 max-w-3xl">
              An intentional, high-rigor academic foundation uniting physical forensic science and chemical investigation with postgraduate computer applications and artificial intelligence engineering.
            </p>
          </div>

          {/* Degrees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {PROFILE.education.map((deg) => (
              <div
                key={deg.degree}
                className="p-6 rounded-2xl border border-white/15 bg-[#0A0D12] hover:border-[#62E6FF]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[10px]">
                    <span className="font-bold tracking-wider text-[#62E6FF]">
                      {deg.level.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#6EE7B7]/10 text-[#6EE7B7] border border-[#6EE7B7]/20 font-semibold text-[9px]">
                      {deg.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-2xl text-foreground">
                    {deg.degree}
                  </h4>
                  <p className="font-mono text-xs font-semibold text-[#9B8CFF] mt-0.5">
                    {deg.field}
                  </p>

                  <p className="mt-4 pt-3 border-t border-white/5 font-sans text-xs text-muted-foreground leading-relaxed">
                    {deg.highlights}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-mono text-[10px]">
                  <span className="text-muted-foreground text-[9px] uppercase tracking-wider block">CORE COMPETENCIES:</span>
                  <div className="flex flex-wrap gap-1">
                    {deg.competencies.map((c, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-foreground/80">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Certifications & Tech Training */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Professional Certifications Featured on Resume (6 cols) */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#62E6FF]">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                  <Award className="size-4" />
                  <span>PRIMARY PROFESSIONAL CERTIFICATIONS</span>
                </div>
                <span className="text-[#6EE7B7] text-[10px]">VERIFIED</span>
              </div>
              <div className="space-y-3 font-sans text-xs">
                {PROFILE.resumeCertifications.map((c) => (
                  <div key={c.code} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-foreground">{c.code}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">({c.issuer})</span>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5">{c.name}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 font-mono text-[9px] text-[#6EE7B7] font-semibold shrink-0">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Training & Engineering Tracks (6 cols) */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#0A0D12] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#9B8CFF]">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                    <Cpu className="size-4" />
                    <span>TECHNICAL SYSTEMS &amp; COMPUTING TRACKS</span>
                  </div>
                  <span className="text-muted-foreground text-[10px]">ADVANCED</span>
                </div>
                <div className="space-y-2.5">
                  {PROFILE.technicalTraining.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] font-sans text-xs">
                      <h5 className="font-display font-semibold text-foreground text-xs">{t.domain}</h5>
                      <p className="text-muted-foreground text-[11px] mt-0.5 leading-relaxed">{t.focus}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Résumé Link Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">
                  Complete Curriculum Vitae &amp; Research Portfolio
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

        {/* 4 Core Tenets of the Philosophy */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] mb-2 flex items-center gap-2 font-semibold">
              <span>MY CORE PHILOSOPHY</span>
              <span className="h-px flex-1 bg-white/10" />
            </h3>
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Operating principles rooted in scientific certainty:
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
