export function Contact() {
  return (
    <section
      id="contact"
      className="aurora-bg grain-overlay relative overflow-hidden py-32 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Currently accepting Q3 2026 engagements
            </span>
          </div>

          <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-tighter text-balance md:text-7xl lg:text-[8rem]">
            Let's build <span className="italic font-light">something real.</span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            Whether it's a stealth venture, a security audit, or an AI system
            you can't outsource — I'd like to hear about it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="mailto:hello@tarikislam.dev"
              className="group flex items-center gap-4 border border-accent bg-accent px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              hello@tarikislam.dev
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
            >
              Schedule a call ↗
            </a>
          </div>

          <div className="mt-20 grid w-full grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
            <Detail label="Encryption" value="PGP key on request" />
            <Detail label="Signal" value="@tarik.42" />
            <Detail label="LinkedIn" value="/in/tarikislam" />
            <Detail label="GitHub" value="@tarikislam" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-foreground">{value}</p>
    </div>
  );
}
