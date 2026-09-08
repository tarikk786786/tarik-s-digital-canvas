import { useEffect, useState } from "react";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { TarikCore3D } from "./TarikCore3D";
import { TiltCard3D } from "./TiltCard3D";
import { ScrambleText } from "./ScrambleText";
import { MagneticButton } from "./MagneticButton";
import { Shield, Terminal, ArrowUpRight, Cpu, Activity, Clock, Box } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"portrait" | "core">("portrait");

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

  const openBrief = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-project-brief"));
  };

  return (
    <header
      id="top"
      className="relative min-h-[95vh] w-full flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-[#050608] border-b border-white/5"
    >
      {/* Background Ambient Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-32 -left-32 size-[38rem] rounded-full blur-[140px] opacity-20 bg-gradient-to-r from-[#62E6FF] via-[#9B8CFF] to-transparent" />
        <div className="absolute top-1/3 -right-32 size-[42rem] rounded-full blur-[140px] opacity-15 bg-gradient-to-l from-[#9B8CFF] via-[#62E6FF] to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-8 relative z-10">
        {/* LEFT COLUMN: 7 Columns - Hero Copy & Action Deck */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center">
          {/* Verification Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 backdrop-blur-md shadow-[0_0_20px_rgba(98,230,255,0.15)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#62E6FF] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#62E6FF]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF] font-bold">
                PROTOCOL 001 · VERIFIED PRACTITIONER
              </span>
            </div>

            {timeIST && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-muted-foreground">
                <Clock className="size-3 text-[#62E6FF]" />
                <span>IST {timeIST} (INDIA)</span>
              </div>
            )}
          </div>

          {/* Role Ticker */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#62E6FF] shadow-[0_0_8px_#62E6FF]" />
            <div className="h-7 overflow-hidden relative w-full font-mono text-sm md:text-base uppercase tracking-[0.25em] text-[#62E6FF] font-semibold">
              <div
                className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(-${roleIndex * 28}px)` }}
              >
                {ROLES.map((role) => (
                  <span key={role} className="h-7 flex items-center shrink-0 drop-shadow-[0_0_12px_rgba(98,230,255,0.3)]">
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
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#62E6FF] via-white to-[#9B8CFF]">
              see the invisible.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl text-pretty">
            I’m <strong className="text-foreground font-semibold">Tarik Islam</strong> — multidisciplinary technologist, forensic scientist, cybersecurity engineer, and founder of <strong className="text-[#62E6FF] font-semibold">Dezo.in</strong>. Engineering secure intelligent software with an evidence-first mindset.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 md:gap-5 font-mono text-xs uppercase tracking-[0.2em]">
            <MagneticButton
              variant="primary"
              onClick={() => {
                const el = document.querySelector("#work");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="explore"
            >
              <span>EXPLORE WORK</span>
              <ArrowUpRight className="size-4" />
            </MagneticButton>

            <MagneticButton
              variant="glass"
              onClick={openBrief}
              dataCursor="brief"
            >
              <span>CONFIGURE BRIEF</span>
            </MagneticButton>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 bg-white/5 hover:border-[#62E6FF]/50 text-foreground transition-all cursor-pointer"
            >
              <span>CONNECT</span>
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            </a>
          </div>

          {/* Tri-Axiom Footer Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Shield className="size-3.5 text-[#62E6FF]" />
              <span>ZERO-TRUST SECURITY</span>
            </span>
            <span className="text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="size-3.5 text-[#9B8CFF]" />
              <span>AUTONOMOUS AGENTS</span>
            </span>
            <span className="text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <Activity className="size-3.5 text-[#6EE7B7]" />
              <span>DIGITAL EVIDENCE CHAIN</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 Columns - 3D Interactive Portrait or The Tarik Core */}
        <div className="w-full lg:col-span-5 relative flex flex-col items-center justify-center mt-6 lg:mt-0">
          <TiltCard3D
            className="w-full max-w-md lg:max-w-none"
            glowColor="rgba(98, 230, 255, 0.2)"
            tiltIntensity={12}
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A0D12]/95 to-[#050608]/95 p-6 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden group">
              {/* Top HUD Bar with View Toggle */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Terminal className="size-3 text-[#62E6FF]" />
                  <span className="text-foreground font-semibold">
                    {viewMode === "portrait" ? "TARIK.ISLAM.OBJ" : "TARIK.CORE.3D"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode(viewMode === "portrait" ? "core" : "portrait")}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[#62E6FF] transition-colors cursor-pointer"
                  >
                    <Box className="size-3" />
                    <span>{viewMode === "portrait" ? "VIEW 3D CORE" : "VIEW PORTRAIT"}</span>
                  </button>
                </div>
              </div>

              {/* View Switcher: Portrait vs The Tarik Core 3D */}
              <div className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5">
                {viewMode === "core" ? (
                  <TarikCore3D className="w-full h-full" />
                ) : (
                  <>
                    {/* Background 3D Ambient Canvas */}
                    <div className="absolute inset-0 -z-0 opacity-50 pointer-events-none flex items-center justify-center">
                      <TarikCore3D className="w-full h-full opacity-60 scale-75" />
                    </div>

                    {/* Portrait Image */}
                    <img
                      src={profileImage}
                      alt="Tarik Islam — Forensic Scientist, AI Developer & Cybersecurity Engineer"
                      className="relative z-10 object-contain object-bottom w-full h-full max-h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] filter contrast-[1.06] saturate-[1.05] transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Laser Beam Effect */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#62E6FF]/20 to-transparent animate-scan-sweep opacity-70" />

                    {/* Floating Telemetry Chips */}
                    <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded bg-[#0A0D12]/85 border border-white/10 font-mono text-[9px] text-[#62E6FF] backdrop-blur-md">
                      DNA · DIGITAL EVIDENCE
                    </div>

                    <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded bg-[#0A0D12]/85 border border-white/10 font-mono text-[9px] text-[#6EE7B7] backdrop-blur-md flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-[#6EE7B7]" />
                      SHA-256 VERIFIED
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#62E6FF]" />
                  <span>IDENTITY: VERIFIED</span>
                </span>
                <span className="text-foreground/80">INDIA // GLOBAL</span>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </div>
    </header>
  );
}
