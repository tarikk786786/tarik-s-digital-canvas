import { SectionHead } from "./Capabilities";

const PROJECTS = [
  {
    id: "01",
    name: "Sentinel Shield",
    tag: "Cybersecurity · AI",
    year: "2024",
    description:
      "Enterprise-grade platform that monitors network traffic in real time and uses custom neural nets to surface zero-day vulnerabilities before exploitation.",
    metric: "38ms mean detection",
    stack: ["Rust", "PyTorch", "Kafka", "Postgres"],
    href: "#",
  },
  {
    id: "02",
    name: "Aethelgard",
    tag: "AI Operating System",
    year: "2024",
    description:
      "A context-aware automation engine acting as a digital twin for senior engineers. Local-first, integrates with existing dev workflows.",
    metric: "62% task automation",
    stack: ["TypeScript", "Ollama", "LangGraph"],
    href: "#",
  },
  {
    id: "03",
    name: "Fragmenta",
    tag: "Digital Forensics",
    year: "2023",
    description:
      "Automated forensics toolset for recovering, correlating, and visualizing fragmented evidence across heterogenous storage.",
    metric: "12× analyst throughput",
    stack: ["Python", "DuckDB", "React"],
    href: "#",
  },
  {
    id: "04",
    name: "Ghost Node",
    tag: "Privacy Infrastructure",
    year: "2023",
    description:
      "Encrypted tunneling layer for clinical and legal data sovereignty. End-to-end, zero-knowledge, and audit-ready.",
    metric: "SOC 2 ready in 90 days",
    stack: ["Go", "WireGuard", "HSM"],
    href: "#",
  },
];

export function Projects() {
  return (
    <section id="work" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHead num="02" label="Selected Evidence">
          Systems built for stakes where the wrong second costs real money.
        </SectionHead>

        <div className="mt-16 border-t border-border">
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="group relative grid grid-cols-12 items-start gap-6 border-b border-border py-10 transition-colors hover:bg-surface/60 md:py-12"
            >
              {/* index + year */}
              <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {p.id}
                </span>
              </div>

              {/* title block */}
              <div className="col-span-10 md:col-span-4">
                <h3 className="text-3xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent md:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {p.tag} · {p.year}
                </p>
              </div>

              {/* description */}
              <p className="col-span-12 max-w-2xl text-sm leading-relaxed text-muted-foreground md:col-span-4 md:text-base">
                {p.description}
              </p>

              {/* metric + stack */}
              <div className="col-span-12 md:col-span-3">
                <p className="text-xl font-medium tracking-tight text-foreground">
                  {p.metric}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* arrow */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-10 hidden text-2xl text-muted-foreground transition-all duration-500 group-hover:right-2 group-hover:text-accent md:block"
              >
                →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="#"
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent"
          >
            View full archive
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
