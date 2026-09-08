import { useEffect, useState } from "react";
import { Menu, X, Search, Terminal } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { soundEngine } from "@/lib/sound-engine";

const NAV_LINKS = [
  { label: "IDENTITY", href: "#about" },
  { label: "EXPLORATION", href: "#journey" },
  { label: "SYSTEMS", href: "#how-i-build" },
  { label: "WORK", href: "#work" },
  { label: "LAB", href: "#showroom" },
  { label: "CONNECT", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-command-palette"));
    soundEngine.playClick();
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("tarik:open-terminal"));
    soundEngine.playClick();
  };

  const linkClass =
    "group relative font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-[#62E6FF] font-medium";
  const underline = (
    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#62E6FF] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#62E6FF]" />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#050608]/90 backdrop-blur-xl shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        {/* LEFT: Logo mark */}
        <a href="/#top" className="flex items-center gap-3.5 group">
          <span className="relative grid size-9 place-items-center rounded-full border border-[#62E6FF]/40 bg-[#0A0D12] font-mono text-xs font-bold text-[#62E6FF] shadow-[0_0_16px_rgba(98,230,255,0.25)] group-hover:border-[#62E6FF] group-hover:shadow-[0_0_24px_rgba(98,230,255,0.45)] transition-all">
            TI
          </span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-foreground tracking-tight group-hover:text-[#62E6FF] transition-colors">
              TARIK ISLAM
            </span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              DIGITAL CANVAS // ENCLAVE
            </span>
          </div>
        </a>

        {/* CENTER: Focused 6-Item Navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => soundEngine.playNavigation()}
              className={linkClass}
            >
              {item.label}
              {underline}
            </a>
          ))}
        </nav>

        {/* RIGHT: Quick Action Shortcuts & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={openSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-[#62E6FF]/40 transition-all cursor-pointer"
            title="Search / Command Palette (⌘K)"
          >
            <Search className="size-3 text-[#62E6FF]" />
            <span>SEARCH</span>
            <kbd className="px-1.5 py-0.2 rounded bg-white/10 text-[9px]">⌘K</kbd>
          </button>

          {/* Quick Shell Button */}
          <button
            type="button"
            onClick={openTerminal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-[#62E6FF]/40 transition-all cursor-pointer"
            title="Launch Terminal Enclave (~)"
          >
            <Terminal className="size-3 text-[#62E6FF]" />
            <span>SHELL</span>
            <kbd className="px-1 py-0.2 rounded bg-white/10 text-[9px]">~</kbd>
          </button>

          {/* Contact Direct */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#62E6FF]/40 bg-[#62E6FF]/10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#62E6FF] hover:bg-[#62E6FF]/20 transition-all shadow-[0_0_12px_rgba(98,230,255,0.2)]"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#62E6FF] opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#62E6FF]" />
            </span>
            <span>AVAILABLE Q3 26</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
              soundEngine.playClick();
            }}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-white/10 bg-[#050608]/95 px-6 py-6 lg:hidden backdrop-blur-2xl">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  soundEngine.playNavigation();
                }}
                className="font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:text-[#62E6FF] py-2 border-b border-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 font-mono text-xs text-foreground uppercase tracking-widest"
              >
                <Search className="size-3.5 text-[#62E6FF]" />
                <span>Command Palette (⌘K)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 font-mono text-xs text-foreground uppercase tracking-widest"
              >
                <Terminal className="size-3.5 text-[#62E6FF]" />
                <span>Open Terminal (~)</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
