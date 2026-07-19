import { SectionHead } from "./Capabilities";
import { WHATSAPP_URL } from "@/lib/contact-links";

const PILLARS = [
  {
    k: "Charter",
    v: "A studio building AI-native products at the seam of intelligence, security, and design.",
  },
  {
    k: "Discipline",
    v: "Forensic rigor applied to software — evidence, reproducibility, and audit-grade craft.",
  },
  {
    k: "Operating cadence",
    v: "Small teams, short cycles, high signal. We ship what we can defend.",
  },
];

const PRINCIPLES = [
  "Truth over theater — no fabricated claims, no vanity metrics.",
  "Security is a design constraint, not a bolt-on.",
  "Automation should feel invisible; intelligence should feel inevitable.",
  "If it can be measured, it can be improved. If it can't, we instrument it.",
];

export function Dezo() {
  return (
    <section
      id="dezo"
      className="relative overflow-hidden border-b border-border py-24 md:py-32"
    >
      {/* Ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-0 size-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHead num="02" label="Founder Log · Dezo.in">
          Founding <span className="italic font-light">Dezo</span> — a studio for
          AI-native, secure-by-design products.
        </SectionHead>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Left: dossier card */}
          <div className="relative border border-border-strong bg-surface/60 p-8 backdrop-blur md:p-10">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-accent">Dezo.in</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                In build
              </span>
            </div>

            <h3 className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Where forensic thinking meets product craft.
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Dezo.in is my founding vehicle for building intelligent systems
              that hold up under scrutiny — from the model, to the interface, to
              the evidence trail behind every decision.
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.k}>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    {p.k}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground">
                    {p.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://dezo.in"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open Dezo.in"
                className="group flex items-center gap-3 border border-accent bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Visit Dezo.in
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Message on WhatsApp"
                className="border border-border-strong px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                Brief the studio
              </a>
            </div>
          </div>

          {/* Right: operating principles */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Operating principles
              </p>
              <ul className="mt-6 space-y-5">
                {PRINCIPLES.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-start gap-4 border-b border-border pb-5 last:border-0"
                  >
                    <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-accent">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
              <Stat k="Stage" v="Founding" />
              <Stat k="Base" v="India" />
              <Stat k="Model" v="Studio" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {k}
      </p>
      <p className="mt-1.5 text-sm text-foreground">{v}</p>
    </div>
  );
}
