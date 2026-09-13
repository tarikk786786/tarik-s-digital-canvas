const PERSONAL_IDENTITY_ITEMS = [
  "TARIK DIGITAL CANVAS",
  "PROTOCOL 001 · VERIFIED PRACTITIONER",
  "FORENSIC SCIENCE · INVESTIGATION & TOXICOLOGY",
  "MCA · M.TECH CYBER SECURITY & AI / DIGITAL FORENSICS",
  "BUILDING INTELLIGENT SYSTEMS THAT SEE THE INVISIBLE",
  "EVIDENCE OVER ASSUMPTIONS",
  "ZERO TRUST BY DEFAULT",
  "WORLD OS · FIND DETAILS · FORENSIC LAB",
  "FOUNDER @ DEZO.IN",
  "BHUBANESWAR · INDIA",
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
