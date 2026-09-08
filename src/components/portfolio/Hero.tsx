import { useEffect, useState } from "react";
import photoLab from "@/assets/tarik-photo-lab.jpg";
import photoWorking from "@/assets/tarik-photo-working.jpg";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { TarikCore3D } from "./TarikCore3D";
import { TiltCard3D } from "./TiltCard3D";
import { MagneticButton } from "./MagneticButton";
import {
  Shield,
  Terminal,
  ArrowUpRight,
  Cpu,
  Activity,
  Clock,
  Box,
  Monitor,
  User,
  Maximize2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { soundEngine } from "@/lib/sound-engine";

const ROLES = [
  "Multidisciplinary Technologist",
  "Forensic Scientist",
  "Cybersecurity Engineer",
  "AI Systems Builder",
  "Founder & CEO, Dezo.in",
  "Full-Stack Systems Architect",
];

const LAB_HOTSPOTS = [
  {
    id: 1,
    name: "NEURAL THREAT RADAR",
    tag: "MONITOR 01 // TOP LEFT",
    desc: "Heuristic packet triage, spatial graph clustering & sub-ms inference.",
    pos: { top: "18%", left: "21%" },
  },
  {
    id: 2,
    name: "CASE EVIDENCE CHAIN",
    tag: "MONITOR 02 // CENTER LEFT",
    desc: "ISO/IEC 27037 compliant bitstream audit & SHA-256 twin-hash logging.",
    pos: { top: "48%", left: "27%" },
  },
  {
    id: 3,
    name: "SYSTEMS RUNTIME",
    tag: "MONITOR 03 // CENTER RIGHT",
    desc: "React 19, TypeScript, Rust & Python with zero compilation drift.",
    pos: { top: "43%", left: "73%" },
  },
  {
    id: 4,
    name: "DEZO.IN PRODUCT LAB",
    tag: "MONITOR 04 // FAR RIGHT",
    desc: "AI product studio incubation, agent workflows & design systems.",
    pos: { top: "22%", left: "84%" },
  },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [timeIST, setTimeIST] = useState("");
  const [viewMode, setViewMode] = useState<"lab" | "core" | "portrait">("lab");
  const [activePin, setActivePin] = useState<number | null>(null);

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

  const openLabLightbox = (monitorId?: number) => {
    window.dispatchEvent(
      new CustomEvent("tarik:open-lab-lightbox", { detail: { monitor: monitorId || 1 } })
    );
  };

  const currentHotspot = activePin ? LAB_HOTSPOTS.find((h) => h.id === activePin) : null;

  return (
    <header
      id="top"
      className="relative min-h-[95vh] w-full flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-[#050608] border-b border-white/5"
    >
      {/* Background Ambient Gradient Mesh — Pure Optical Radial Falloff without GPU Blur Banding */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0 ambient-mesh-hero">
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-8 relative z-10">
        {/* LEFT COLUMN: 7 Columns - Hero Copy & Action Deck */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center">
          {/* Verification Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill">
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
                  <span key={role} className="h-7 flex items-center shrink-0">
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

        {/* RIGHT COLUMN: 5 Columns - 3D Interactive Portrait / Lab Workstation Matrix */}
        <div className="w-full lg:col-span-5 relative flex flex-col items-center justify-center mt-6 lg:mt-0">
          <TiltCard3D
            className="w-full max-w-md lg:max-w-none"
            glowColor="rgba(98, 230, 255, 0.25)"
            tiltIntensity={10}
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A0D12] to-[#050608] p-5 sm:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.85)] overflow-hidden group">
              {/* Top HUD Bar with 3-Way Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5 mb-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Terminal className="size-3 text-[#62E6FF]" />
                  <span className="text-foreground font-semibold">
                    {viewMode === "lab"
                      ? "LAB.WORKSTATION.OBJ"
                      : viewMode === "core"
                      ? "TARIK.CORE.3D"
                      : "TARIK.PORTRAIT.OBJ"}
                  </span>
                </div>

                {/* 3-Way Mode Selector Pills */}
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("lab");
                      soundEngine.playClick();
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer text-[10px] font-semibold ${
                      viewMode === "lab"
                        ? "bg-[#62E6FF] text-[#050608] shadow-[0_0_12px_rgba(98,230,255,0.4)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Monitor className="size-3" />
                    <span>LAB</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("core");
                      soundEngine.playClick();
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer text-[10px] font-semibold ${
                      viewMode === "core"
                        ? "bg-[#62E6FF] text-[#050608] shadow-[0_0_12px_rgba(98,230,255,0.4)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Box className="size-3" />
                    <span>3D CORE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("portrait");
                      soundEngine.playClick();
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer text-[10px] font-semibold ${
                      viewMode === "portrait"
                        ? "bg-[#62E6FF] text-[#050608] shadow-[0_0_12px_rgba(98,230,255,0.4)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <User className="size-3" />
                    <span>PORTRAIT</span>
                  </button>
                </div>
              </div>

              {/* View Container */}
              <div className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-xl bg-black/50 border border-white/10">
                {/* 1. LAB WORKSTATION VIEW (AUTHENTIC 4-MONITOR COMMAND LAB) */}
                {viewMode === "lab" && (
                  <div className="relative size-full overflow-hidden flex items-center justify-center">
                    {/* Authentic Photo */}
                    <img
                      src={photoLab}
                      alt="Tarik Islam at his multi-monitor engineering and forensic workstation"
                      className="size-full object-cover object-center filter contrast-[1.07] saturate-[1.04] select-none transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Precision Laser Scanline — Crisp 2px Optical Sweep */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#62E6FF] to-transparent shadow-[0_0_12px_#62E6FF] animate-scan-sweep opacity-90" />

                    {/* Interactive Telemetry Hotspot Pins */}
                    {LAB_HOTSPOTS.map((h) => {
                      const isActive = activePin === h.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => {
                            setActivePin(isActive ? null : h.id);
                            soundEngine.playClick();
                          }}
                          onMouseEnter={() => setActivePin(h.id)}
                          style={{ top: h.pos.top, left: h.pos.left }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer"
                          title={`Click to inspect ${h.name}`}
                        >
                          <span className="relative flex size-5 md:size-6 items-center justify-center">
                            <span
                              className={`absolute inline-flex size-full rounded-full transition-opacity ${
                                isActive
                                  ? "bg-[#62E6FF] animate-ping opacity-80"
                                  : "bg-[#62E6FF]/50 group-hover/pin:animate-ping opacity-40"
                              }`}
                            />
                            <span
                              className={`relative inline-flex size-3 md:size-3.5 rounded-full border-2 border-[#050608] items-center justify-center font-mono text-[8px] font-bold transition-all ${
                                isActive
                                  ? "bg-[#62E6FF] text-[#050608] scale-125 shadow-[0_0_12px_#62E6FF]"
                                  : "bg-[#0A0D12] text-[#62E6FF] border-[#62E6FF] group-hover/pin:scale-110"
                              }`}
                            >
                              {h.id}
                            </span>
                          </span>

                          {/* Hover Tooltip */}
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-44 p-2.5 rounded-lg glass-panel-dark text-left font-mono shadow-2xl transition-all pointer-events-none z-30 ${
                              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 group-hover/pin:opacity-100 group-hover/pin:translate-y-0"
                            }`}
                          >
                            <div className="text-[9px] text-[#62E6FF] font-bold">{h.tag}</div>
                            <div className="text-[10px] text-foreground font-sans font-semibold mt-0.5">{h.name}</div>
                            <div className="text-[9px] text-muted-foreground font-sans mt-0.5 leading-snug">{h.desc}</div>
                          </div>
                        </button>
                      );
                    })}

                    {/* Top Watermark Badge */}
                    <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded glass-panel-dark font-mono text-[9px] text-[#62E6FF] flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-[#62E6FF] animate-pulse" />
                      <span>4-MONITOR COMMAND MATRIX</span>
                    </div>

                    {/* Expand Fullscreen Button */}
                    <button
                      type="button"
                      onClick={() => openLabLightbox(activePin || 1)}
                      className="absolute top-3 right-3 z-10 p-1.5 rounded-lg glass-panel-dark text-muted-foreground hover:text-[#62E6FF] hover:border-[#62E6FF]/50 transition-colors cursor-pointer"
                      title="Inspect Workstation in High Resolution"
                    >
                      <Maximize2 className="size-3.5" />
                    </button>

                    {/* Bottom Dynamic Hotspot Telemetry Drawer */}
                    <div className="absolute inset-x-3 bottom-3 z-10 p-2.5 rounded-lg glass-panel-dark font-mono text-[10px] text-muted-foreground flex items-center justify-between">
                      {currentHotspot ? (
                        <div className="truncate flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[#6EE7B7]" />
                          <span className="text-[#62E6FF] font-bold">{currentHotspot.tag}:</span>
                          <span className="text-foreground truncate">{currentHotspot.name}</span>
                        </div>
                      ) : (
                        <div className="truncate flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[#62E6FF] animate-pulse" />
                          <span>HOVER OR TAP PINS TO INSPECT TELEMETRY</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => openLabLightbox(activePin || 1)}
                        className="shrink-0 text-[9px] text-[#62E6FF] hover:underline uppercase ml-2 cursor-pointer font-bold"
                      >
                        INSPECT [HD] ↗
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. 3D CORE VIEW */}
                {viewMode === "core" && (
                  <TarikCore3D className="size-full" />
                )}

                {/* 3. PORTRAIT VIEW */}
                {viewMode === "portrait" && (
                  <div className="relative size-full overflow-hidden flex items-center justify-center">
                    {/* Background 3D Ambient Canvas */}
                    <div className="absolute inset-0 -z-0 opacity-50 pointer-events-none flex items-center justify-center">
                      <TarikCore3D className="w-full h-full opacity-60 scale-75" />
                    </div>

                    {/* Ambient Glow behind Cutout */}
                    <div className="absolute inset-0 bg-radial from-[#62E6FF]/10 via-transparent to-transparent pointer-events-none" />

                    {/* Cutout Portrait Image */}
                    <img
                      src={profileImage}
                      alt="Tarik Islam — Forensic Scientist, AI Developer & Cybersecurity Engineer"
                      className="relative z-10 object-contain object-bottom w-full h-full max-h-full filter contrast-[1.06] saturate-[1.05] transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Precision Laser Scanline — Crisp 2px Optical Sweep */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#62E6FF] to-transparent shadow-[0_0_12px_#62E6FF] animate-scan-sweep opacity-80" />

                    {/* Floating Telemetry Chips */}
                    <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded glass-panel-dark font-mono text-[9px] text-[#62E6FF]">
                      DNA · DIGITAL EVIDENCE
                    </div>

                    <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded glass-panel-dark font-mono text-[9px] text-[#6EE7B7] flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-[#6EE7B7]" />
                      SHA-256 VERIFIED
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#6EE7B7]" />
                  <span>IDENTITY: VERIFIED PRACTITIONER</span>
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
