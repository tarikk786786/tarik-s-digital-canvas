const LOGOS = [
  "NEXUS LABS",
  "AETHELGARD",
  "SENTINEL",
  "FRAGMENTA",
  "GHOST NODE",
  "NEURO-FX",
  "MONOLITH",
  "PROTOCOL 7",
];

export function LogoMarquee() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section
      aria-label="Ventures and clients"
      className="relative overflow-hidden border-y border-border bg-surface/40 py-6"
    >
      <div className="mask-fade-r flex">
        <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
          {doubled.map((l, i) => (
            <span
              key={`${l}-${i}`}
              className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
