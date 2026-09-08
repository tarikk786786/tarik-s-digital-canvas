import { useState, useEffect } from "react";
import photoLab from "@/assets/tarik-photo-lab.jpg";
import {
  X,
  ShieldCheck,
  Terminal,
  Cpu,
  Monitor,
  Maximize2,
  Minimize2,
  ExternalLink,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";

interface MonitorHotspot {
  id: number;
  name: string;
  subtitle: string;
  tag: string;
  description: string;
  specifications: string[];
  metrics: { label: string; value: string }[];
  pos: { top: string; left: string };
}

const MONITORS: MonitorHotspot[] = [
  {
    id: 1,
    name: "Neural Threat Radar & Anomaly Clustering",
    subtitle: "Spatial Graph Telemetry & Zero-Trust Defense",
    tag: "MONITOR 01 // TOP LEFT",
    description:
      "Real-time heuristic packet inspection and spatial neural graph monitoring anomalous network traffic, automated intrusion deflection, and live threat vectors.",
    specifications: [
      "Sub-millisecond packet triage & flow correlation",
      "Dynamic topological threat clustering using PyTorch",
      "Zero-trust perimeter firewall with automated tarpit redirection",
    ],
    metrics: [
      { label: "Inference Latency", value: "0.85 ms" },
      { label: "Heuristic Anomaly Score", value: "0.02 (Nominal)" },
      { label: "Active Defense State", value: "ENFORCED" },
    ],
    pos: { top: "18%", left: "21%" },
  },
  {
    id: 2,
    name: "Forensic Case Evidence & Bitstream Triage",
    subtitle: "Case File 2024-DFR-1127 // Chain of Custody",
    tag: "MONITOR 02 // CENTER LEFT",
    description:
      "Court-admissible evidentiary examination terminal operating under ISO/IEC 27037 standards. Real-time SHA-256 bitstream twin-hashing and immutable audit trail logging.",
    specifications: [
      "Hardware write-blocked volatile memory ingestion",
      "Automated hexadecimal triage & metadata extraction",
      "Deterministic chain-of-custody cryptographic attestation",
    ],
    metrics: [
      { label: "Standard", value: "ISO/IEC 27037" },
      { label: "Hash Protocol", value: "Twin SHA-256" },
      { label: "Custody State", value: "SEALED" },
    ],
    pos: { top: "48%", left: "28%" },
  },
  {
    id: 3,
    name: "Full-Stack Systems IDE & Runtime",
    subtitle: "Modern Software Architecture & Microsecond Runtimes",
    tag: "MONITOR 03 // CENTER RIGHT",
    description:
      "Primary engineering cockpit. React 19, TypeScript, Rust, and Python codebases compiled with strict type verification, ACID consistency, and edge deployment automation.",
    specifications: [
      "Strict Zod schema contracts from database to client",
      "Concurrent React 19 server components with sub-150ms LCP",
      "Automated CI/CD integration tests & zero compilation drift",
    ],
    metrics: [
      { label: "Type Coverage", value: "100% Strict" },
      { label: "Build Latency", value: "< 1.2s" },
      { label: "Test Assertion Pass", value: "48 / 48" },
    ],
    pos: { top: "44%", left: "72%" },
  },
  {
    id: 4,
    name: "Dezo.in Product Studio & AI Agent Workflows",
    subtitle: "Autonomous Agents & High-Velocity Product Craft",
    tag: "MONITOR 04 // FAR RIGHT",
    description:
      "Incubation environment for Dezo.in software products. Multi-agent orchestration, deterministic prompt synthesis, model benchmarking, and design system governance.",
    specifications: [
      "Deterministic agentic loops with source-grounded RAG",
      "Continuous prompt evaluation against hallucination benchmarks",
      "Venture roadmap, user telemetry & product distribution",
    ],
    metrics: [
      { label: "Studio Venture", value: "Dezo.in" },
      { label: "Agent Orchestration", value: "Active" },
      { label: "Base", value: "India // Global" },
    ],
    pos: { top: "22%", left: "84%" },
  },
];

export function LabLightboxModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMonitorId, setActiveMonitorId] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ monitor?: number }>;
      if (customEvent.detail?.monitor) {
        setActiveMonitorId(customEvent.detail.monitor);
      }
      setIsOpen(true);
      soundEngine.playClick();
    };

    window.addEventListener("tarik:open-lab-lightbox", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("tarik:open-lab-lightbox", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentMonitor = MONITORS.find((m) => m.id === activeMonitorId) || MONITORS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Laboratory Command Center Telemetry"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#050608]/95 backdrop-blur-2xl overflow-y-auto animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-6xl rounded-2xl border border-white/15 bg-[#0A0D12] text-foreground shadow-[0_25px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-[#050608]/80 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-4 text-[#62E6FF]" />
            <span className="font-bold text-foreground uppercase tracking-widest">
              TARIK ISLAM // PHYSICAL WORKSTATION TELEMETRY
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full border border-[#6EE7B7]/30 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[10px] font-semibold">
              AUTHENTIC LAB ENVIRONMENT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-[11px]"
              title={isZoomed ? "Reset View" : "Enlarge Image"}
            >
              {isZoomed ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
              <span>{isZoomed ? "FIT VIEW" : "ZOOM"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Close modal [ESC]"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: High-Res Photo with Interactive Hotspots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Visual Column: 8 Cols */}
          <div className="lg:col-span-8 relative bg-black/60 overflow-hidden flex items-center justify-center p-2 sm:p-4 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className={`relative w-full rounded-xl overflow-hidden border border-white/10 transition-transform duration-300 ${isZoomed ? "scale-125 cursor-move" : ""}`}>
              {/* Authentic Photo of Tarik in his Lab */}
              <img
                src={photoLab}
                alt="Tarik Islam in his physical engineering and forensic command workstation with 4 monitors"
                className="w-full h-auto object-cover object-center filter contrast-[1.06] select-none"
              />

              {/* Animated Laser Scanline Sweep */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#62E6FF]/20 to-transparent animate-scan-sweep opacity-60" />

              {/* Interactive Radar Hotspots */}
              {MONITORS.map((m) => {
                const isActive = m.id === activeMonitorId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setActiveMonitorId(m.id);
                      soundEngine.playClick();
                    }}
                    style={{ top: m.pos.top, left: m.pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    title={`Click to inspect ${m.name}`}
                  >
                    <span className="relative flex size-6 md:size-8 items-center justify-center">
                      <span
                        className={`absolute inline-flex size-full rounded-full transition-opacity ${
                          isActive
                            ? "bg-[#62E6FF] animate-ping opacity-75"
                            : "bg-[#62E6FF]/40 group-hover:animate-ping opacity-40"
                        }`}
                      />
                      <span
                        className={`relative inline-flex size-3.5 md:size-4 rounded-full border-2 border-[#050608] items-center justify-center font-mono text-[9px] font-bold transition-all ${
                          isActive
                            ? "bg-[#62E6FF] text-[#050608] scale-125 shadow-[0_0_15px_#62E6FF]"
                            : "bg-[#0A0D12] text-[#62E6FF] border-[#62E6FF] group-hover:scale-110"
                        }`}
                      >
                        {m.id}
                      </span>
                    </span>

                    {/* Compact Label Chip */}
                    <span
                      className={`hidden sm:block absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2 py-0.5 rounded bg-[#0A0D12]/90 border border-white/10 font-mono text-[9px] whitespace-nowrap backdrop-blur-md transition-all ${
                        isActive ? "text-[#62E6FF] border-[#62E6FF]/50 opacity-100" : "text-muted-foreground opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      M0{m.id}
                    </span>
                  </button>
                );
              })}

              {/* Static Watermark Badges */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-[#050608]/85 border border-white/10 font-mono text-[9px] text-[#62E6FF] backdrop-blur-md flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#62E6FF] animate-pulse" />
                <span>EVIDENTIARY WORKSTATION · VERIFIED</span>
              </div>

              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-[#050608]/85 border border-white/10 font-mono text-[9px] text-muted-foreground backdrop-blur-md">
                TARIK ISLAM // 4-MONITOR COMMAND MATRIX
              </div>
            </div>
          </div>

          {/* Telemetry Detail Column: 4 Cols */}
          <div className="lg:col-span-4 p-6 flex flex-col justify-between space-y-6 bg-[#0A0D12]/95">
            {/* Monitor Selector Tabs */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold block mb-3">
                SELECT DISPLAY NODE TO INSPECT
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {MONITORS.map((m) => {
                  const isActive = m.id === activeMonitorId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setActiveMonitorId(m.id);
                        soundEngine.playClick();
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? "border-[#62E6FF] bg-[#62E6FF]/10 text-foreground font-semibold shadow-[0_0_15px_rgba(98,230,255,0.15)]"
                          : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/25 hover:text-foreground"
                      }`}
                    >
                      <div className="text-[10px] text-[#62E6FF]">M0{m.id}</div>
                      <div className="text-[11px] truncate font-sans font-medium mt-0.5">{m.name.split("&")[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Display Dossier */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF] font-semibold">
                  {currentMonitor.tag}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground leading-snug">
                  {currentMonitor.name}
                </h3>
                <p className="font-sans text-xs text-[#9B8CFF] font-medium">
                  {currentMonitor.subtitle}
                </p>
              </div>

              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                {currentMonitor.description}
              </p>

              {/* Specifications List */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block">
                  CAPABILITY CRITERIA:
                </span>
                {currentMonitor.specifications.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 font-sans text-xs text-foreground/90">
                    <CheckCircle2 className="size-3.5 text-[#6EE7B7] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Telemetry Metrics Table */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-mono text-[11px]">
                {currentMonitor.metrics.map((met) => (
                  <div key={met.label} className="flex items-center justify-between py-1 border-b border-white/[0.03] last:border-0">
                    <span className="text-muted-foreground text-[10px] uppercase">{met.label}</span>
                    <span className="text-[#62E6FF] font-semibold text-[11px]">{met.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Hardware Specs Summary */}
            <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-muted-foreground space-y-1.5">
              <div className="flex items-center justify-between">
                <span>LAB LOCATION:</span>
                <span className="text-foreground">INDIA // GLOBAL EDGE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DISPLAY MATRIX:</span>
                <span className="text-foreground">4x 4K UHD PANELS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CRYPTOGRAPHIC VERIFICATION:</span>
                <span className="text-[#6EE7B7]">SHA-256 TWIN-HASH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#050608]/90 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#6EE7B7]">
              <span className="size-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
              <span>CERTIFIED EVIDENCE WORKSTATION</span>
            </span>
            <span className="text-white/20">/</span>
            <span>NIST SP 800-86 · ISO/IEC 27037</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-foreground font-medium transition-colors cursor-pointer"
          >
            DISMISS [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
