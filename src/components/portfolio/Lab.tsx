import { SectionHead } from "./Capabilities";

const EXPERIMENTS = [
  {
    id: "LAB-001",
    title: "Latent-space anomaly triage",
    desc: "Embedding-based outlier scoring for enterprise log streams. 40× faster than rule-based baselines on tested corpora.",
    status: "Live",
  },
  {
    id: "LAB-002",
    title: "Forensic diffusion",
    desc: "Reconstructing partially destroyed evidence artifacts using constrained diffusion — evaluated on synthetic control sets.",
    status: "Research",
  },
  {
    id: "LAB-003",
    title: "Agent handoff protocol",
    desc: "A typed message bus and trust model for multi-agent workflows that survive real-world tool failure.",
    status: "Open source",
  },
  {
    id: "LAB-004",
    title: "Local-first LLM sandbox",
    desc: "Sub-second, air-gapped inference environment for sensitive analyst work — no data ever leaves the host.",
    status: "Alpha",
  },
];

export function Lab() {
  return (
    <section
      id="lab"
      className="grain-overlay relative border-b border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHead num="04" label="AI Lab">
          Open research, experiments, and tools I ship between projects.
        </SectionHead>

        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {EXPERIMENTS.map((e) => (
            <article
              key={e.id}
              className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-surface/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {e.id}
                </span>
                <span className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {e.status}
                </span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-foreground">
                {e.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {e.desc}
              </p>
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-accent">
                  Read notes
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
