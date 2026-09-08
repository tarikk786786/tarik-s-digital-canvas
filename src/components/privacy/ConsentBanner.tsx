import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { acceptAll, hasDecided, rejectAll } from "@/lib/consent";
import { ShieldCheck } from "lucide-react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer to avoid CLS during initial paint
    const t = window.setTimeout(() => {
      if (!hasDecided()) setVisible(true);
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Privacy & Telemetry Preferences"
      className="fixed bottom-14 right-4 md:right-6 z-40 w-[calc(100vw-2rem)] max-w-sm animate-fade-in select-none"
    >
      <div className="rounded-xl border border-white/10 bg-[#0A0D12]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-[#62E6FF]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#62E6FF]">
              ZERO FINGERPRINTING
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#6EE7B7] px-1.5 py-0.5 rounded bg-[#6EE7B7]/10 border border-[#6EE7B7]/20">
            SECURE
          </span>
        </div>

        <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-3">
          Optional performance telemetry and session diagnostics stay off unless explicitly permitted. No cross-site profiling.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1 font-mono text-[10px] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                acceptAll();
                setVisible(false);
              }}
              className="px-3 py-1.5 rounded-md bg-[#62E6FF] text-[#050608] font-bold hover:bg-[#A5F3FC] transition-colors cursor-pointer"
              data-cursor="accept"
            >
              ACCEPT
            </button>
            <button
              type="button"
              onClick={() => {
                rejectAll();
                setVisible(false);
              }}
              className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-foreground hover:border-white/20 transition-colors cursor-pointer"
              data-cursor="reject"
            >
              DECLINE
            </button>
          </div>

          <Link
            to="/privacy-controls"
            onClick={() => setVisible(false)}
            className="text-muted-foreground hover:text-[#62E6FF] transition-colors text-[9px]"
          >
            CUSTOMIZE →
          </Link>
        </div>
      </div>
    </aside>
  );
}
