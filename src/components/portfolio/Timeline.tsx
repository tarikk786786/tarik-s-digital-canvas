import { SectionHead } from "./Capabilities";

const TIMELINE = [
  {
    year: "2024 —",
    role: "Founder & Principal Engineer",
    org: "Nexus Labs",
    desc: "Building AI-driven cybersecurity protocols and predictive threat modeling for regulated industries.",
    active: true,
  },
  {
    year: "2022 — 24",
    role: "Lead AI Engineer",
    org: "Aethelgard (contract)",
    desc: "Designed the agentic core and RAG pipeline for a context-aware developer OS.",
  },
  {
    year: "2019 — 22",
    role: "Senior Digital Forensic Analyst",
    org: "Independent",
    desc: "Led investigations into high-profile breaches; engineered recovery pipelines for compromised infrastructure.",
  },
  {
    year: "2017 — 19",
    role: "Full Stack Engineer",
    org: "Early-stage automation startup",
    desc: "Shipped scalable infrastructure for fleet management on distributed ledgers.",
  },
  {
    year: "2015 — 17",
    role: "BSc, Forensic Science",
    org: "University research group",
    desc: "Focused on digital evidence, cryptography, and pattern recognition.",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1fr_2fr] md:px-10">
        <div className="md:sticky md:top-32 md:h-fit">
          <SectionHead num="03" label="Logbook">
            A decade of building at the intersection of bits and evidence.
          </SectionHead>
        </div>

        <div className="relative">
          <div className="absolute left-1 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-14">
            {TIMELINE.map((t) => (
              <div key={t.year + t.role} className="relative pl-10">
                <div
                  className={`absolute left-0 top-2 size-[9px] rounded-full ring-4 ring-background ${
                    t.active
                      ? "bg-accent shadow-glow animate-pulse-dot"
                      : "bg-border-strong"
                  }`}
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {t.year}
                </p>
                <h4 className="mt-2 text-xl font-medium tracking-tight text-foreground">
                  {t.role}
                  <span className="text-muted-foreground"> · {t.org}</span>
                </h4>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
