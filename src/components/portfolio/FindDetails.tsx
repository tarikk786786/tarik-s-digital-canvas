import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { startInvestigation, workspacePath, type InvestigationMode } from "@/lib/find-someone/session";
import { soundEngine } from "@/lib/sound-engine";

export function FindDetails() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<InvestigationMode>("demo");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || busy) return;

    setBusy(true);
    setError(null);
    soundEngine.playClick();

    try {
      const created = await startInvestigation(trimmed, mode);
      navigate({
        to: "/find-someone",
        search: { id: created.id, mode: created.mode, q: created.query },
      });
    } catch {
      navigate({ href: workspacePath(`local_${Date.now()}`, mode, trimmed) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="find-details"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-[#050608]"
    >
      <div className="relative max-w-3xl mx-auto text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#62E6FF]">
          03 / Laboratory
        </p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          FIND DETAILS
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Search. Discover. Understand.
        </p>
        <p className="mt-3 text-sm text-muted-foreground/80">
          Give me anything you know. The console decides what to do.
        </p>

        <form onSubmit={onSubmit} className="mt-12 text-left">
          <label htmlFor="find-details-query" className="sr-only">
            What do you want to find?
          </label>
                <input
            id="find-details-query"
                  value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter anything you know…"
            className="w-full rounded-2xl border border-white/15 bg-[#0A0D12] px-5 py-5 text-base text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-[#62E6FF]/50"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <label className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <input
                type="checkbox"
                checked={mode === "demo"}
                onChange={(event) => setMode(event.target.checked ? "demo" : "live")}
                className="accent-[#62E6FF]"
              />
              Demo mode
                </label>

            <MagneticButton type="submit" variant="primary" disabled={busy || !query.trim()}>
              <span>{busy ? "Opening…" : "FIND DETAILS"}</span>
              <ArrowUpRight className="size-4" />
            </MagneticButton>
          </div>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </section>
  );
}
