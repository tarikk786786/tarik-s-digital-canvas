import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#capabilities", label: "Capabilities" },
    { href: "#timeline", label: "Timeline" },
    { href: "#lab", label: "AI Lab" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid size-7 place-items-center border border-border-strong bg-surface font-mono text-[10px] font-medium text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
            TI
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
            Tarik Islam / Protocol v4
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group flex items-center gap-2 border border-border bg-surface/50 px-3 py-1.5 transition-colors hover:border-accent hover:bg-accent/5"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
            Available Q3 26
          </span>
        </a>
      </div>
    </nav>
  );
}
