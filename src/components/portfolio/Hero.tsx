import { useEffect, useState, useRef } from "react";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { ForensicCanvas3D } from "./ForensicCanvas3D";
import { TiltCard3D } from "./TiltCard3D";
import { Shield, Terminal, ArrowUpRight, Cpu, Activity, Clock } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

const ROLES = [
  "Multidisciplinary Technologist",
  "Forensic Scientist",
  "Cybersecurity Engineer",
  "AI Systems Builder",
  "Founder & CEO, Dezo.in",
  "Full-Stack Systems Architect",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [timeIST, setTimeIST] = useState("");

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, 2800);

    const updateClock = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTimeIST(istString);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => {
      clearInterval(roleInterval);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <header
      id="top"
      className="relative min-h-[95vh] w-full flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-[#0C0E12] border-b border-white/5"
    >
      {/* Background 3D Ambient Canvas Grid & Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-32 -left-32 size-[38rem] rounded-full blur-3xl opacity-30 bg-radial from-accent/25 via-accent/5 to-transparent" />
        <div className="absolute top-1/3 -right-32 size-[42rem] rounded-full blur-3xl opacity-20 bg-radial from-blue-500/20 via-blue-500/5 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-8 relative z-10">
        
        {/* LEFT COLUMN: 7 Columns - Hero Copy & Action Deck */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center">
          
          {/* Holographic Verification Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md shadow-[0_0_20px_rgba(232,168,56,0.2)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                PROTOCOL 001 · VERIFIED PRACTITIONER
              </span>
            </div>

            {timeIST && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-muted-foreground">
                <Clock className="size-3 text-accent" />
                <span>IST {timeIST} (INDIA)</span>
              </div>
            )}
          </div>

          {/* Role Ticker */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-accent shadow-[0_0_8px_var(--accent)]" />
            <div className="h-7 overflow-hidden relative w-full font-mono text-sm md:text-base uppercase tracking-[0.25em] text-accent font-semibold">
              <div
                className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(-${roleIndex * 28}px)` }}
              >
                {ROLES.map((role) => (
                  <span key={role} className="h-7 flex items-center shrink-0 drop-shadow-[0_0_12px_rgba(232,168,56,0.3)]">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tighter leading-[0.96] mb-8 text-foreground">
            Building intelligent <br className="hidden sm:block" />
            systems that{" "}
            <span className="italic font-light text-gradient-flow">
              see the invisible.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl text-pretty">
            I’m <strong className="text-foreground font-semibold">Tarik Islam</strong> — multidisciplinary technologist, forensic scientist, cybersecurity engineer, and founder of <strong className="text-accent font-semibold">Dezo.in</strong>. Engineering secure intelligent software with an evidence-first mindset.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 md:gap-5 font-mono text-xs uppercase tracking-[0.2em]">
            <a
              href="#work"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-md bg-accent text-[#0C0E12] font-bold shadow-[0_0_30px_rgba(232,168,56,0.35)] hover:bg-accent-glow hover:shadow-[0_0_45px_rgba(232,168,56,0.55)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>INSPECT CASE FILES</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-md border border-white/15 bg-white/5 hover:border-accent hover:bg-accent/10 text-foreground transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>DIRECT WHATSAPP</span>
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-4 text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5 underline underline-offset-8 decoration-white/20 hover:decoration-accent"
            >
              <span>DOSSIER / CV</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {/* Live System Tags */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-muted-foreground font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <Shield className="size-3.5 text-accent" />
              <span>ZERO-TRUST ARCHITECTURE</span>
            </span>
            <span className="text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="size-3.5 text-blue-400" />
              <span>AUTONOMOUS AGENTS</span>
            </span>
            <span className="text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <Activity className="size-3.5 text-emerald-400" />
              <span>DIGITAL EVIDENCE CHAIN</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 Columns - 3D Interactive Portrait & Cyber HUD */}
        <div className="w-full lg:col-span-5 relative flex flex-col items-center justify-center mt-6 lg:mt-0">
          <TiltCard3D
            className="w-full max-w-md lg:max-w-none"
            glowColor="rgba(232, 168, 56, 0.25)"
            tiltIntensity={15}
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#14161C]/90 to-[#0C0E12]/95 p-6 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden group">
              
              {/* Top HUD Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Terminal className="size-3 text-accent" />
                  <span className="text-foreground font-semibold">TARIK.ISLAM.OBJ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400">BIOMETRIC MATCH 99.8%</span>
                </div>
              </div>

              {/* Portrait Container with Ambient Holographic Glow & Radar Rings */}
              <div className="relative w-full aspect-[4/5] flex items-end justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5">
                
                {/* Background 3D Mini Particle Sphere in Portrait Frame */}
                <div className="absolute inset-0 -z-0 opacity-40 pointer-events-none">
                  <ForensicCanvas3D className="min-h-full" />
                </div>

                {/* Radar Grid Circles */}
                <svg className="absolute inset-0 size-full pointer-events-none opacity-25" viewBox="0 0 400 500">
                  <circle cx="200" cy="250" r="160" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="3 6" />
                  <circle cx="200" cy="250" r="110" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 4" />
                  <circle cx="200" cy="250" r="60" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
                  <line x1="200" y1="50" x2="200" y2="450" stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.4" />
                  <line x1="40" y1="250" x2="360" y2="250" stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.4" />
                </svg>

                {/* Portrait Image with Mask Blend */}
                <img
                  src={profileImage}
                  alt="Tarik Islam — Forensic Scientist, AI Developer & Cybersecurity Engineer"
                  className="relative z-10 object-contain object-bottom w-full h-full max-h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] filter contrast-[1.08] saturate-[1.05] transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Scanning Laser Beam Effect */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-scan-sweep opacity-70" />

                {/* Floating Telemetry Chips */}
                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded bg-[#0C0E12]/80 border border-white/10 font-mono text-[9px] text-accent backdrop-blur-md">
                  DNA · DIGITAL EVIDENCE
                </div>

                <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded bg-[#0C0E12]/80 border border-white/10 font-mono text-[9px] text-emerald-400 backdrop-blur-md flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-emerald-400" />
                  SHA-256 VERIFIED
                </div>
              </div>

              {/* Bottom Telemetry Gauges */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono text-[9px] text-muted-foreground uppercase">
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <p className="text-foreground font-bold text-xs">FOUNDER</p>
                  <p className="text-[8px] text-accent">DEZO.IN</p>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <p className="text-foreground font-bold text-xs">7 DOMAINS</p>
                  <p className="text-[8px] text-blue-400">FORENSICS</p>
                </div>
                <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                  <p className="text-foreground font-bold text-xs">ZERO-TRUST</p>
                  <p className="text-[8px] text-emerald-400">SECURE</p>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>

      </div>

      {/* BOTTOM RIBBON: Full-Width Forensic Credentials Bar */}
      <div className="w-full mt-14 pt-6 border-t border-white/10 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-y-4 gap-x-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-3 text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>CORE PILLARS</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-foreground font-semibold">01 / DIGITAL FORENSICS</span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-foreground font-semibold">02 / CYBERSECURITY DEFENSE</span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-foreground font-semibold">03 / APPLIED AI & AGENTS</span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-foreground font-semibold">04 / DEZO.IN VENTURE</span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-foreground font-semibold">05 / FULL-STACK SYSTEMS</span>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-[10px] text-accent/80">
            <span>LOCATION: INDIA (GLOBAL CLIENTELE)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
