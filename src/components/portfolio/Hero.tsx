import { useEffect, useState } from "react";
import { Search, ArrowRight, Shield, Activity, Terminal } from "lucide-react";
import { TarikCore3D } from "./TarikCore3D";
import { LivingBackground } from "./LivingBackground";
import { soundEngine } from "@/lib/sound-engine";
import { TechnicalLabel } from "@/components/system";

const RESEARCH_CHIPS = [
  { label: "Person", placeholder: "e.g. Rahul Sharma or developer handle" },
  { label: "Company", placeholder: "e.g. Acme Technologies or corporate domain" },
  { label: "Domain", placeholder: "e.g. example.com or cloud infrastructure" },
  { label: "Phone", placeholder: "e.g. +91 98100 12345 (National Numbering Plan)" },
  { label: "Document", placeholder: "e.g. PDF SHA-256 hash or gazette inquiry" },
  { label: "Research", placeholder: "e.g. forensic toxicology or AI publication DOI" },
  { label: "Location", placeholder: "e.g. Bhubaneswar, Odisha or open spatial coordinates" },
  { label: "Image", placeholder: "e.g. EXIF metadata or GHS chemical label" },
];

export function Hero() {
  const [activeChip, setActiveChip] = useState("Person");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST",
      );
    };
    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    soundEngine.playClick();
    if (q) {
      window.location.href = `/find-someone?mode=live&q=${encodeURIComponent(q)}`;
    } else {
      window.location.href = `/find-someone?mode=live`;
    }
  };

  const handleChipClick = (chip: typeof RESEARCH_CHIPS[0]) => {
    setActiveChip(chip.label);
    soundEngine.playClick();
  };

  const openCommandPalette = () => {
    soundEngine.playClick();
    window.dispatchEvent(new CustomEvent("tarik:open-command-palette"));
  };

  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#050608] pt-28 pb-16 md:pt-32"
    >
      <LivingBackground />
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-40">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/70 via-transparent to-[#1a0a08]/35" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: Core Platform Headline & Universal Engine */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Small Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF]">
                <span className="size-1.5 rounded-full bg-[#62E6FF] animate-pulse" />
                TARIK ISLAM · INTELLIGENCE · FORENSICS · AI · CYBER
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 hidden sm:inline">
                {currentTime} · BHUBANESWAR
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Explore. Connect.
              <span className="block italic font-light text-[#62E6FF]">Understand.</span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              Research systems built around evidence, engineering and scientific method. One platform to discover, investigate, understand and connect public information.
            </p>

            {/* Universal Research Engine Interface Card */}
            <div className="mt-8 rounded-2xl border border-white/15 bg-[#0A0D12]/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6 transition-all hover:border-[#62E6FF]/35">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#62E6FF] flex items-center gap-1.5">
                  <Activity className="size-3" />
                  What do you want to investigate?
                </span>
                <button
                  type="button"
                  onClick={openCommandPalette}
                  className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground hidden sm:flex items-center gap-1"
                >
                  <span>Quick launch:</span>
                  <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">Ctrl+K</kbd>
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      RESEARCH_CHIPS.find((c) => c.label === activeChip)?.placeholder ||
                      "Search a person, company, domain, phone, document, topic…"
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/50 py-3.5 pl-11 pr-36 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-[#62E6FF]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-lg border border-[#62E6FF]/50 bg-[#62E6FF] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-black shadow-[0_0_16px_rgba(98,230,255,0.4)] hover:bg-[#62E6FF]/90 transition-all cursor-pointer"
                  >
                    <span>START RESEARCH</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>

                {/* Pill Selectors */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mr-1">
                    TARGET:
                  </span>
                  {RESEARCH_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                        activeChip === chip.label
                          ? "border border-[#62E6FF]/60 bg-[#62E6FF]/15 text-[#62E6FF]"
                          : "border border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/25 hover:text-foreground"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Quick Status / Ethos Footer */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-emerald-400" />
                ISO/IEC 27037 Custody Principles
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5 text-[#62E6FF]" />
                Evidence over assumptions
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <a
                href="/lab"
                className="text-[#62E6FF] hover:underline"
              >
                Explore all 6 Divisions →
              </a>
            </div>
          </div>

          {/* RIGHT: Live Architectural Telemetry & 3D Core Visual */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-[#0A0D12] shadow-[0_0_80px_rgba(98,230,255,0.08)] lg:aspect-[5/6] lg:max-w-none">
              {/* 3D Background */}
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <TarikCore3D className="size-full" />
              </div>

              {/* Technical Overlay HUD */}
              <div className="absolute inset-x-0 top-0 p-5 border-b border-white/10 bg-[#050608]/70 backdrop-blur-md flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF]">
                    UNIVERSAL INTELLIGENCE KERNEL
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    Live Public Research Workspace
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[10px] text-emerald-400">OPERATIONAL</span>
                </div>
              </div>

              {/* Live Capabilities Matrix */}
              <div className="absolute inset-x-0 bottom-0 p-5 border-t border-white/10 bg-[#050608]/85 backdrop-blur-md space-y-2.5">
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                  <div className="rounded-lg border border-white/10 bg-black/40 p-2">
                    <span className="text-muted-foreground block text-[9px]">HUMAN INTELLIGENCE</span>
                    <span className="text-[#62E6FF] font-bold">Disambiguation</span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/40 p-2">
                    <span className="text-muted-foreground block text-[9px]">TELECOM CIRCLING</span>
                    <span className="text-emerald-400 font-bold">22 DoT LSAs</span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/40 p-2">
                    <span className="text-muted-foreground block text-[9px]">DIGITAL ASSETS</span>
                    <span className="text-amber-400 font-bold">Provenance Chain</span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/40 p-2">
                    <span className="text-muted-foreground block text-[9px]">SCIENTIFIC INDEX</span>
                    <span className="text-purple-400 font-bold">Peer-Reviewed</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    TARIK ISLAM · FORENSIC & AI RESEARCH
                  </span>
                  <a
                    href="/#architecture"
                    className="font-mono text-[9px] text-[#62E6FF] hover:underline"
                  >
                    View System Map →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
