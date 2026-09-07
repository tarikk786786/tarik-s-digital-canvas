import { TiltCard3D } from "./TiltCard3D";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { Sparkles, Compass, Shield, Brain, Rocket, Award, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

const PILLARS_ABOUT = [
  {
    icon: Compass,
    title: "Evidence Over Assumptions",
    subtitle: "FORENSIC MINDSET",
    desc: "In forensics, an assumption is an investigation's fatal flaw. I bring that same non-negotiable standard to software engineering: deterministic reproducibility, auditable pipelines, and verifiable data provenance.",
  },
  {
    icon: Shield,
    title: "Security as an Aesthetic Constraint",
    subtitle: "DEFENSE-IN-DEPTH",
    desc: "Security isn't a badge pasted on at the end. It dictates architecture, data flow, API contracts, and user experience. If a system cannot defend itself against adversaries, it isn't ready for production.",
  },
  {
    icon: Brain,
    title: "AI That Earns Its Place",
    subtitle: "INTELLIGENT SYSTEMS",
    desc: "I build autonomous agent architectures, local model workflows, and RAG retrieval pipelines that have measurable leverage — eliminating weeks of human friction rather than producing synthetic hype.",
  },
  {
    icon: Rocket,
    title: "A Small Studio Inside One Mind",
    subtitle: "FOUNDER CRAFT",
    desc: "Founding Dezo.in allows me to operate with relentless momentum. I bridge deep scientific thinking with 0→1 execution, product design, and business architecture without corporate bureaucracy.",
  },
];

const FAST_FACTS = [
  { label: "Identity", value: "Forensic Scientist & AI Architect" },
  { label: "Venture", value: "Founder & CEO, Dezo.in" },
  { label: "Location", value: "India (Operating Globally)" },
  { label: "Timezone", value: "IST (UTC +05:30)" },
  { label: "Core Focus", value: "Forensic Science · AI · Cyber Defense" },
  { label: "Work Ethic", value: "Quiet obsession, audit-grade craft" },
];

export function AboutMe() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-b border-white/5 bg-[#0C0E12] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/3 size-[38rem] rounded-full blur-3xl opacity-15 bg-radial from-accent/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-[32rem] rounded-full blur-3xl opacity-10 bg-radial from-blue-500/20 to-transparent pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
              01 /
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              ABOUT TARIK ISLAM
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-4xl">
            A small studio <br className="hidden sm:block" />
            <span className="italic font-light text-gradient-flow">inside one mind.</span>
          </h2>
        </div>

        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Portrait Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <TiltCard3D glowColor="rgba(232, 168, 56, 0.25)" tiltIntensity={12}>
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#14161C] to-[#0E1015] p-6 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                
                {/* Visual Frame */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-end justify-center">
                  <img
                    src={profileImage}
                    alt="Tarik Islam Portrait"
                    className="relative z-10 object-contain object-bottom w-full h-full max-h-full drop-shadow-2xl filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle amber gradient mask at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0E1015] via-[#0E1015]/80 to-transparent z-20" />
                  
                  {/* Floating Identity Badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-30 p-3 rounded-lg bg-[#14161C]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-foreground">Tarik Islam</h4>
                      <p className="font-mono text-[10px] text-accent">Founder & CEO, Dezo.in</p>
                    </div>
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Quick Bio Footer inside Card */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-muted-foreground font-mono text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3 text-accent" />
                    <span>INDIA (GLOBAL)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3 text-blue-400" />
                    <span>UTC +05:30</span>
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Narrative & Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-[#14161C]/80 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-4">
                <Sparkles className="size-4" />
                <span>MY MANIFESTO</span>
              </div>
              <blockquote className="font-display text-2xl md:text-3xl text-foreground font-bold leading-snug tracking-tight mb-6">
                “Great technology should feel <em className="italic font-light text-gradient-flow">inevitable</em> to the people who rely on it — and invisible to the problems it removes.”
              </blockquote>
              <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
                I operate at the intersection of <strong className="text-foreground">forensic science</strong>, <strong className="text-foreground">cybersecurity</strong>, and <strong className="text-foreground">autonomous artificial intelligence</strong>. What began with investigating physical evidence and digital crime scenes evolved into engineering software systems built with the same uncompromising standard: complete auditability, zero-trust integrity, and relentless utility.
              </p>
            </div>

            {/* Fast Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {FAST_FACTS.map((fact) => (
                <div key={fact.label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-accent mb-1">
                    {fact.label}
                  </p>
                  <p className="font-display font-semibold text-xs text-foreground/90">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Connect Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-[#0C0E12] font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-glow transition-all shadow-[0_0_20px_rgba(232,168,56,0.3)] cursor-pointer"
              >
                <span>CONNECT WITH TARIK</span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/10 bg-white/5 text-foreground font-mono text-xs uppercase tracking-wider hover:border-accent transition-colors"
              >
                <span>VIEW MY JOURNEY</span>
              </a>
            </div>

          </div>

        </div>

        {/* 4 Core Pillars of How Tarik Thinks & Builds */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-8 flex items-center gap-2">
            <span>HOW I THINK & OPERATE</span>
            <span className="h-px flex-1 bg-white/10" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS_ABOUT.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-xl border border-white/10 bg-gradient-to-b from-[#14161C]/80 to-[#101217] backdrop-blur-md hover:border-accent/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-[#0C0E12] transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent/80 block mb-1">
                      {p.subtitle}
                    </span>
                    <h4 className="font-display font-bold text-lg text-foreground mb-3">
                      {p.title}
                    </h4>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
