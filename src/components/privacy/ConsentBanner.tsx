import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { acceptAll, hasDecided, rejectAll } from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer to avoid CLS during initial paint.
    const t = window.setTimeout(() => {
      if (!hasDecided()) setVisible(true);
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Privacy preferences"
      className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:right-4 md:bottom-4 md:max-w-md"
    >
      <div className="grain-overlay rounded-lg border border-border-strong bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Consent · v1
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          This site keeps things minimal. Optional signals — analytics and gentle
          personalization — stay off unless you enable them.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Nothing here fingerprints your device or identifies you personally.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              acceptAll();
              setVisible(false);
            }}
            className="border border-accent bg-accent px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-foreground transition-colors hover:bg-accent/90"
            data-cursor="accept"
          >
            Accept optional
          </button>
          <button
            onClick={() => {
              rejectAll();
              setVisible(false);
            }}
            className="border border-border-strong bg-background px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent"
            data-cursor="reject"
          >
            Reject optional
          </button>
          <Link
            to="/privacy-controls"
            onClick={() => setVisible(false)}
            className="px-2 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent"
          >
            Customize →
          </Link>
        </div>
      </div>
    </div>
  );
}
