import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open, close on Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links: { to: string; label: string; route?: boolean }[] = [
    { to: "/#work", label: "Work" },
    { to: "/#capabilities", label: "Capabilities" },
    { to: "/skills", label: "Skills", route: true },
    { to: "/certifications", label: "Credentials", route: true },
    { to: "/news", label: "Intel Feed", route: true },
    { to: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled || open
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="group relative flex items-center gap-3">
          <span className="relative grid size-11 place-items-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-80 animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--accent) 90%, transparent) 90deg, transparent 180deg, color-mix(in oklab, #a48bff 70%, transparent) 270deg, transparent 360deg)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
              }}
            />
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-border-strong bg-background font-mono text-[12px] font-semibold tracking-[0.15em] text-accent shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)] transition-all duration-500 group-hover:shadow-[0_0_32px_-4px_var(--accent)]">
              TI
            </span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
            Tarik Islam / Protocol v4
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            l.route ? (
              <Link
                key={l.to}
                to={l.to}
                className="group relative font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={l.to}
                href={l.to}
                className="group relative font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-2 border border-border bg-surface/50 px-3 py-1.5 transition-colors hover:border-accent hover:bg-accent/5 sm:flex"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
              Available Q3 26
            </span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center border border-border bg-surface/40 text-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <li key={l.to} className="border-b border-border/40 last:border-b-0">
              {l.route ? (
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:text-accent"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:text-accent"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 border border-accent bg-accent px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-foreground"
            >
              <span className="size-1.5 rounded-full bg-accent-foreground" />
              Available Q3 26
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
