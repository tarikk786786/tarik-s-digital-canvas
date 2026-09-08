import { ScrambleText } from "./ScrambleText";
import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight, Sparkles, Terminal, FileText } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

export function WorldCollapseClimax() {
  const openBrief = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-project-brief"));
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-terminal"));
  };

  return (
    <section className="relative py-28 px-6 border-t border-b border-white/[0.08] bg-[#050608] overflow-hidden">
      {/* Ambient Convergence Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="size-[600px] rounded-full bg-gradient-to-r from-[#62E6FF]/10 via-[#9B8CFF]/10 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/5 text-[#62E6FF] font-mono text-[11px] uppercase tracking-[0.25em]">
          <Sparkles className="size-3.5" />
          <span>WHERE IT ALL CONNECTS</span>
        </div>

        {/* 4 Pillars Convergence Visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto font-mono text-xs text-muted-foreground">
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
            <p className="text-[#62E6FF] font-bold">FORENSICS</p>
            <p className="text-[10px] mt-0.5">Evidence & Rigor</p>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
            <p className="text-[#9B8CFF] font-bold">SECURITY</p>
            <p className="text-[10px] mt-0.5">Zero Trust Defense</p>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
            <p className="text-[#62E6FF] font-bold">INTELLIGENCE</p>
            <p className="text-[10px] mt-0.5">Autonomous AI</p>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
            <p className="text-[#6EE7B7] font-bold">ENGINEERING</p>
            <p className="text-[10px] mt-0.5">Full Stack Scale</p>
          </div>
        </div>

        {/* Central Statement */}
        <div className="space-y-4">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.08]">
            <ScrambleText text="Ideas are easy." className="block text-muted-foreground" />
            <span className="text-foreground">Execution is the difference.</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            From forensic chain-of-custody to autonomous neural systems, everything I build is engineered to withstand scrutiny, defend against adversaries, and deliver verifiable impact.
          </p>
        </div>

        {/* Magnetic Action Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <MagneticButton
            variant="primary"
            onClick={openBrief}
            dataCursor="brief"
          >
            <FileText className="size-4" />
            <span>Configure Project Brief</span>
          </MagneticButton>

          <MagneticButton
            variant="glass"
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
            dataCursor="whatsapp"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="size-4" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={openTerminal}
            dataCursor="shell"
          >
            <Terminal className="size-4 text-[#62E6FF]" />
            <span>Interrogate Shell [~]</span>
          </MagneticButton>
        </div>

        {/* Canonical Formula */}
        <div className="pt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60">
          LEARN → BUILD → TEST → FAIL → UNDERSTAND → IMPROVE
        </div>
      </div>
    </section>
  );
}
