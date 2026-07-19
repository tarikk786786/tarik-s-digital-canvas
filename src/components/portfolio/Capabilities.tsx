const CAPABILITIES = [
  {
    id: "01",
    title: "Forensic Science",
    desc: "Deep investigations across digital evidence, malware, and cryptographic systems. Chain-of-custody workflows for high-value data.",
    tags: ["Threat Hunting", "Memory Forensics", "Incident Response"],
  },
  {
    id: "02",
    title: "Cybersecurity Engineering",
    desc: "Threat modeling, red/blue team tooling, and defense-in-depth architectures for products that must not fail.",
    tags: ["Zero Trust", "OWASP", "SIEM/SOAR"],
  },
  {
    id: "03",
    title: "AI Systems & Research",
    desc: "LLM architectures, RAG pipelines, and agentic workflows — from research prototypes to production inference.",
    tags: ["LLMs", "RAG", "Agents", "PyTorch"],
  },
  {
    id: "04",
    title: "Full Stack Engineering",
    desc: "Type-safe end-to-end platforms with a bias for performance, accessibility, and clean design systems.",
    tags: ["TypeScript", "React", "Rust", "Postgres"],
  },
  {
    id: "05",
    title: "Automation",
    desc: "Replacing weeks of manual labor with milliseconds of compute — internal tools, ETL, and workflow engines.",
    tags: ["Workflows", "Serverless", "ETL"],
  },
  {
    id: "06",
    title: "Founding & Product",
    desc: "From 0→1 product, brand, and go-to-market. Building companies at the edge of AI, security, and data.",
    tags: ["0→1", "Strategy", "GTM"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHead num="01" label="Capabilities">
          A multidisciplinary practice across forensics, security, AI, and
          software.
        </SectionHead>

        <div className="mt-16 grid grid-cols-1 border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <article
              key={c.id}
              className="group relative flex flex-col gap-4 border-b border-border p-8 transition-colors hover:bg-surface/60 md:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {c.id}
                </span>
                <span className="text-xl text-muted-foreground opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                  →
                </span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-foreground">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {c.desc}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {num} /
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-balance md:text-5xl">
        {children}
      </h2>
    </div>
  );
}
