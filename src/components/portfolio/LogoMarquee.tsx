const PERSONAL_IDENTITY_ITEMS = [
  "TARIK ISLAM",
  "FORENSIC SCIENTIST",
  "CYBERSECURITY ENGINEER",
  "AI SYSTEMS ARCHITECT",
  "FOUNDER @ DEZO.IN",
  "DIGITAL EVIDENCE SPECIALIST",
  "ZERO-TRUST DEFENDER",
  "CHAIN-OF-CUSTODY AUDIT",
  "AUTONOMOUS AI AGENTS",
  "BASED IN INDIA (UTC+05:30)",
];

export function LogoMarquee() {
  const doubled = [...PERSONAL_IDENTITY_ITEMS, ...PERSONAL_IDENTITY_ITEMS];

  return (
    <section
      aria-label="Tarik Islam professional identity ticker"
      className="relative overflow-hidden border-y border-white/5 bg-[#101217]/50 py-3.5 select-none"
    >
      <div className="mask-fade-r flex">
        <div className="flex shrink-0 animate-marquee items-center gap-8 md:gap-12 pr-8 md:pr-12">
          {doubled.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-4">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent font-medium">
                {item}
              </span>
              <span className="size-1 rounded-full bg-accent/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
