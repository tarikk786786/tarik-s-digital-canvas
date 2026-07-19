import { useEffect, useMemo, useState } from "react";

type Cmd = { id: string; label: string; hint: string; href: string };

const CMDS: Cmd[] = [
  { id: "hero", label: "Return to top", hint: "Home", href: "#top" },
  { id: "work", label: "Selected Evidence", hint: "Projects", href: "#work" },
  { id: "cap", label: "Capabilities", hint: "What I do", href: "#capabilities" },
  { id: "time", label: "Timeline", hint: "Logbook", href: "#timeline" },
  { id: "lab", label: "The Lab", hint: "Experiments", href: "#lab" },
  { id: "contact", label: "Open a channel", hint: "Contact", href: "#contact" },
  { id: "email", label: "Email Tarik", hint: "mailto", href: "mailto:hello@tarikislam.dev" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(
    () =>
      CMDS.filter((c) =>
        (c.label + c.hint).toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  useEffect(() => {
    setI(0);
  }, [q, open]);

  const go = (c: Cmd) => {
    setOpen(false);
    if (c.href.startsWith("#")) {
      document.querySelector(c.href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = c.href;
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center pt-[18vh] bg-background/70 backdrop-blur-md animate-fade-up"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[min(560px,92vw)] rounded-xl border border-border-strong bg-surface-elevated/95 shadow-elevated overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") setI((n) => Math.min(n + 1, filtered.length - 1));
            if (e.key === "ArrowUp") setI((n) => Math.max(n - 1, 0));
            if (e.key === "Enter" && filtered[i]) go(filtered[i]);
          }}
          placeholder="Search the operating system…"
          className="w-full bg-transparent px-5 py-4 text-sm outline-none border-b border-border placeholder:text-muted-foreground"
        />
        <ul className="max-h-80 overflow-y-auto no-scrollbar py-2">
          {filtered.map((c, idx) => (
            <li key={c.id}>
              <button
                onMouseEnter={() => setI(idx)}
                onClick={() => go(c)}
                className={`w-full flex items-center justify-between px-5 py-2.5 text-left text-sm transition-colors ${
                  i === idx ? "bg-accent/10 text-foreground" : "text-muted-foreground"
                }`}
              >
                <span>{c.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                  {c.hint}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="px-5 py-6 text-center text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
              No matches
            </li>
          ) : null}
        </ul>
        <div className="flex items-center justify-between px-5 py-2 border-t border-border font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>↑↓ navigate · ↵ open</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
