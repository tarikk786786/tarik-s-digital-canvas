import { Link } from "@tanstack/react-router";
import { ArrowLeft, Globe2, Search, FlaskConical, ArrowUpRight } from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { SystemStatusBar } from "@/components/system/SystemStatusBar";

const ENGINES = [
  {
    to: "/world-os" as const,
    code: "01",
    title: "WORLD OS",
    subtitle: "Public Earth layers",
    desc: "SPACE · AIR · SEA · EARTH · WEATHER — source-derived objects with ONLINE / DEGRADED / OFFLINE health. No fake counters.",
    icon: Globe2,
  },
  {
    to: "/find-someone" as const,
    code: "02",
    title: "FIND DETAILS",
    subtitle: "Information Engine",
    desc: "Ask anything. The kernel classifies and collects from public sources. Engines stay hidden — you see evidence and provenance.",
    icon: Search,
  },
  {
    to: "/forensic-lab" as const,
    code: "03",
    title: "FORENSIC LAB",
    subtitle: "Intelligence Lab",
    desc: "Synthetic training cases with TOX signature, digital hash chain, and Observation → Analysis → Interpretation → Conclusion.",
    icon: FlaskConical,
  },
];

export function LabHub() {
  return (
    <div className="min-h-screen bg-[#050608] text-foreground">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
          <Link
            to="/"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
          >
            <ArrowLeft className="size-3.5" />
            Portfolio
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#62E6FF]">
            Protocol 001 · Verified practitioner
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#62E6FF]">
          Tarik Digital Canvas
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
          Personal digital
          <span className="block italic font-light text-foreground/80">intelligence laboratory</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Building intelligent systems that see the invisible. Three engines. One evidence language.
          Evidence over assumptions.
        </p>

        <SystemStatusBar className="mt-10" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ENGINES.map((engine) => {
            const Icon = engine.icon;
            return (
              <Link
                key={engine.code}
                to={engine.to}
                search={
                  engine.to === "/find-someone"
                    ? { mode: "live", id: undefined, q: undefined }
                    : undefined
                }
                onClick={() => soundEngine.playNavigation()}
                className="group rounded-2xl border border-white/10 bg-[#0A0D12] p-6 transition-colors hover:border-[#62E6FF]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF]">
                    Engine {engine.code}
                  </span>
                  <Icon className="size-5 text-[#62E6FF]" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight group-hover:text-[#62E6FF] transition-colors">
                  {engine.title}
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {engine.subtitle}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{engine.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[#62E6FF]">
                  Enter <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
