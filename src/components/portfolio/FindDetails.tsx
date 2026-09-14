import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe2, FlaskConical } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { startInvestigation, workspacePath, type InvestigationMode } from "@/lib/find-someone/session";
import { soundEngine } from "@/lib/sound-engine";

export function FindDetails() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<InvestigationMode>("live");
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
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#62E6FF]">
            03 / Information Engine
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            FIND DETAILS
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask anything. Public information is collected behind the kernel — you see evidence and
            provenance, not tool directories.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-12">
          <label htmlFor="find-details-query" className="sr-only">
            Ask anything
          </label>
          <input
            id="find-details-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask anything… domain, company, username, place…"
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
              Demo dossier instead of live public collectors
            </label>

            <MagneticButton type="submit" variant="primary" disabled={busy || !query.trim()}>
              <span>{busy ? "Opening…" : "Ask the world"}</span>
              <ArrowUpRight className="size-4" />
            </MagneticButton>
          </div>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </form>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Link
            to="/lab"
            onClick={() => soundEngine.playClick()}
            className="rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF] hover:border-[#62E6FF]/30"
          >
            Lab hub
          </Link>
          <Link
            to="/world-os"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:border-[#62E6FF]/30 hover:text-[#62E6FF]"
          >
            <Globe2 className="size-3.5" /> Explore World
          </Link>
          <Link
            to="/forensic-lab"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
          >
            <FlaskConical className="size-3.5" /> Forensic Lab
          </Link>
        </div>
      </div>
    </section>
  );
}
