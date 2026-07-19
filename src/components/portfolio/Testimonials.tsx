import { SectionHead } from "./Capabilities";

const QUOTES = [
  {
    quote:
      "Tarik is that rare engineer who understands the core of the problem before writing a single line of code.",
    who: "CSO, FinTech firm",
  },
  {
    quote:
      "He shipped in a week what our team scoped for a quarter — and it was better than what we'd designed.",
    who: "Head of Product, health-tech scale-up",
  },
  {
    quote:
      "Forensic depth, product taste, and founder instincts in one person. Rare combination.",
    who: "Managing Partner, seed VC",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <SectionHead num="05" label="Field Reports">
          What the people I've worked with say.
        </SectionHead>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="flex flex-col gap-8 border border-border bg-surface/40 p-8"
            >
              <blockquote className="font-display text-xl leading-snug text-foreground text-pretty">
                <span className="mr-1 text-accent">“</span>
                {q.quote}
                <span className="text-accent">”</span>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="h-px w-6 bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {q.who}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
