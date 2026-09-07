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
  const doubled = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Ventures and clients"
      className="relative overflow-hidden border-y border-border bg-surface/30 py-4 select-none"
    >
      <div className="mask-fade-r flex">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12 md:gap-16 md:pr-16">
          {doubled.map((l, i) => (
            <span
              key={`${l}-${i}`}
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
