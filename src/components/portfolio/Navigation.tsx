import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";

const NAV_LINKS = [
  { label: "Who I Am", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
  { label: "How I Build", href: "#how-i-build" },
  { label: "Screens", href: "#showroom" },
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Forensics", href: "#domains" },
  { label: "Dezo.in", href: "#dezo" },
  { label: "Skills", href: "/skills", isRoute: true },
  { label: "Credentials", href: "/certifications", isRoute: true },
  { label: "Execution", href: "#execution" },
  { label: "Radar", href: "#intelligence" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefers = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReducedMotion(prefers);
    }
  }, []);

  const toggleReducedMotion = () => {
    const nextState = !reducedMotion;
    setReducedMotion(nextState);
    if (typeof document !== "undefined") {
      if (nextState) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    }
    window.dispatchEvent(new CustomEvent("tarik:toggle-motion", { detail: { reduced: nextState } }));
  };

  const linkClass =
    "group relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent font-medium";
  const underline = (
    <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full shadow-[0_0_8px_var(--accent)]" />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#0C0E12]/85 backdrop-blur-xl shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        {/* LEFT: Logo mark */}
        <a href="/#top" className="flex items-center gap-3.5 group">
          <span className="relative grid size-9 place-items-center rounded-full border border-accent/40 bg-[#14161C] font-mono text-xs font-bold text-accent shadow-[0_0_16px_rgba(232,168,56,0.25)] group-hover:border-accent group-hover:shadow-[0_0_24px_rgba(232,168,56,0.45)] transition-all">
            TI
          </span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-foreground tracking-tight group-hover:text-accent transition-colors">
              Tarik Islam
            </span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Forensics · Cyber · AI
            </span>
          </div>
        </a>

        {/* CENTER/RIGHT: Nav links */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((item) =>
            item.isRoute ? (
              <Link key={item.href} to={item.href} className={linkClass}>
                {item.label}
                {underline}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={linkClass}>
                {item.label}
                {underline}
              </a>
            )
          )}
        </nav>

        {/* FAR RIGHT: Reduce Motion Toggle & Availability Badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleReducedMotion}
            aria-label={reducedMotion ? "Enable full motion" : "Reduce motion for accessibility"}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-white/20 transition-all cursor-pointer"
          >
            <span className={`size-1.5 rounded-full ${reducedMotion ? "bg-amber-400" : "bg-emerald-400"}`} />
            <span>{reducedMotion ? "MOTION: REDUCED" : "MOTION: 3D"}</span>
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:bg-accent/20 transition-all shadow-[0_0_12px_rgba(232,168,56,0.15)]"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span>AVAILABLE Q3 '26</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground hover:border-accent hover:text-accent transition-colors lg:hidden cursor-pointer"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {open && (
        <div className="border-b border-white/10 bg-[#0C0E12]/95 backdrop-blur-2xl px-6 py-6 lg:hidden animate-fade-in">
          <nav aria-label="Mobile" className="flex flex-col space-y-4">
            {NAV_LINKS.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.25em] text-foreground hover:text-accent py-2 border-b border-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.25em] text-foreground hover:text-accent py-2 border-b border-white/5 transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <div className="pt-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-accent text-[#0C0E12] font-mono text-xs uppercase tracking-widest font-bold"
              >
                <span>DIRECT WHATSAPP</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
