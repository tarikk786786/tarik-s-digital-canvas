import { SectionHead } from "./Capabilities";
import { TiltCard3D } from "./TiltCard3D";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { ArrowUpRight, Sparkles, Shield, Cpu, ExternalLink } from "lucide-react";

const PILLARS = [
  {
    k: "FOUNDING CHARTER",
    v: "An elite product studio engineering AI-native products at the seam of machine intelligence, cryptography, and systems design.",
  },
  {
    k: "FORENSIC RIGOR",
    v: "Evidence-backed reproducibility, zero fabricated benchmark claims, and audit-grade software architectures.",
  },
  {
    k: "OPERATING CADENCE",
    v: "Small autonomous pods, high-signal releases, and founder-led delivery. We only ship what we can defend under scrutiny.",
  },
];

const PRINCIPLES = [
  "Truth over theater — zero fabricated claims, zero synthetic vanity metrics.",
  "Security is a foundational design constraint, not an afterthought bolt-on.",
  "Automation should feel invisible; machine intelligence should feel inevitable.",
  "If it can be measured, we calibrate it. If it cannot, we instrument the telemetry.",
];

export function Dezo() {
  return (
    <section
      id="dezo"
      className="relative overflow-hidden border-b border-white/5 py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0C0E12]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 size-[36rem] rounded-full blur-3xl opacity-15 bg-radial from-accent/20 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px]">
        <SectionHead num="03" label="VENTURE LOG · DEZO.IN">
          Founding <span className="italic font-light text-gradient-flow">Dezo</span> — An AI-Native, <br className="hidden sm:block" />
          Secure-By-Design Product Studio
        </SectionHead>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          
          {/* Left: Dossier Card with 3D Tilt (7 cols) */}
          <div className="lg:col-span-7">
            <TiltCard3D glowColor="rgba(232, 168, 56, 0.2)" tiltIntensity={8} className="h-full">
              <div className="h-full relative rounded-2xl border border-white/10 border-l-4 border-l-accent bg-gradient-to-br from-[#14161C]/95 to-[#101217] p-8 md:p-10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                    <span className="text-accent font-bold flex items-center gap-2">
                      <Sparkles className="size-3.5" />
                      DEZO.IN
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                      IN ACTIVE BUILD
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                    Where Forensic Thinking Meets Product Craft.
                  </h3>

                  <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                    Dezo.in is my founding vehicle for building intelligent systems that hold up under extreme adversarial scrutiny — from the underlying neural weights to the user-facing interface, ensuring an unbroken evidence trail behind every automated decision.
                  </p>

                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 mb-8">
                    {PILLARS.map((p) => (
                      <div key={p.k} className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">
                          {p.k}
                        </dt>
                        <dd className="font-sans text-xs leading-relaxed text-foreground/85">
                          {p.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <a
                    href="https://dezo.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(232,168,56,0.3)] hover:bg-accent-glow hover:shadow-[0_0_30px_rgba(232,168,56,0.45)] transition-all cursor-pointer"
                  >
                    <span>VISIT DEZO.IN</span>
                    <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/15 bg-white/5 hover:border-accent hover:text-accent font-mono text-xs uppercase tracking-widest text-foreground transition-colors cursor-pointer"
                  >
                    <span>BRIEF THE STUDIO</span>
                  </a>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Right: Operating Principles & Studio Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-8 rounded-2xl border border-white/10 bg-[#14161C]/80 backdrop-blur-xl">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-6 flex items-center gap-2">
                <Shield className="size-4" />
                <span>OPERATING PRINCIPLES</span>
              </p>

              <ul className="space-y-5">
                {PRINCIPLES.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-start gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-xs tracking-wider text-accent font-bold mt-0.5">
                      0{i + 1}
                    </span>
                    <p className="font-sans text-sm leading-relaxed text-foreground/90">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio Metrics Deck */}
            <div className="grid grid-cols-3 gap-3 p-6 rounded-2xl border border-white/10 bg-[#14161C]/80 backdrop-blur-xl text-center">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                  STAGE
                </p>
                <p className="font-display text-lg font-bold text-accent">Founding</p>
              </div>
              <div className="border-x border-white/10">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                  HEADQUARTERS
                </p>
                <p className="font-display text-lg font-bold text-foreground">India</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                  MODEL
                </p>
                <p className="font-display text-lg font-bold text-blue-400">AI Studio</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
