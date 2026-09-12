import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Terminal, Search, ExternalLink } from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";

interface FindSomeoneNavProps {
  onOpenSearchModal?: () => void;
  mode?: "demo" | "live";
}

export function FindSomeoneNav({ onOpenSearchModal, mode = "demo" }: FindSomeoneNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#050608]/90 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8">
        {/* Left: Return & Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            onClick={() => soundEngine.playClick()}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:border-[#62E6FF]/40 hover:text-[#62E6FF] transition-all"
            title="Return to Main Enclave"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">PORTFOLIO</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="relative grid size-8 place-items-center rounded-lg border border-[#62E6FF]/40 bg-[#0A0D12] text-[#62E6FF] shadow-[0_0_12px_rgba(98,230,255,0.25)]">
              <Shield className="size-4 text-[#62E6FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-foreground tracking-tight">
                  INTELLIGENCE CONSOLE
                </span>
                <span className="rounded bg-[#62E6FF]/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#62E6FF] border border-[#62E6FF]/30">
                  {mode === "demo" ? "DEMO LAB" : "LIVE · WORKERS OFF"}
                </span>
              </div>
              <p className="hidden md:block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
                Find Someone · Find a Company · Find a Domain · Find Evidence
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right: Quick Action & Safety Notice */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-[#6EE7B7]/20 bg-[#6EE7B7]/5 px-3 py-1 font-mono text-[10px] text-[#6EE7B7]">
            <span className="size-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
            <span>LAWFUL & PUBLIC SOURCES ONLY</span>
          </div>

          <a
            href="https://data.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-[#62E6FF] transition-colors"
          >
            <span>data.gov.in</span>
            <ExternalLink className="size-3" />
          </a>

          <a
            href="#architecture"
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
          >
            <Terminal className="size-3 text-[#9B8CFF]" />
            <span className="hidden sm:inline">PIPELINE ARCHITECTURE</span>
          </a>
        </div>
      </div>
    </header>
  );
}
