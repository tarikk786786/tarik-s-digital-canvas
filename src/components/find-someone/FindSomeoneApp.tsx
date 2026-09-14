import { useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { FindSomeoneNav } from "./FindSomeoneNav";
import { SearchInterface } from "./SearchInterface";
import { LiveProgress, type PipelineStep } from "./LiveProgress";
import { InvestigationWorkspace } from "./InvestigationWorkspace";
import { DEMO_INVESTIGATION } from "@/content/demo-investigation";
import { detectQueryType } from "@/lib/find-someone/scoring";
import { soundEngine } from "@/lib/sound-engine";
import type { Investigation, SearchIntent } from "@/lib/find-someone/types";
import type { InvestigationKernelResult } from "@/lib/intelligence/collectors";

const PENDING_STEPS: PipelineStep[] = [
  { label: "UNDERSTANDING", status: "pending" },
  { label: "COLLECTING", status: "pending" },
  { label: "CORRELATING", status: "pending" },
  { label: "VERIFYING", status: "pending" },
];

function emptyInvestigation(query: string): Investigation {
  return {
    id: "inv_empty",
    query: {
      raw: query,
      entityType: detectQueryType(query),
      sources: [],
      filters: {},
    },
    status: "created",
    mode: "standard",
    entities: [],
    persons: [],
    organizations: [],
    sources: [],
    claims: [],
    evidence: [],
    conflicts: [],
    timeline: [],
    relationships: [],
    identityMatches: [],
    progress: [],
    createdAt: new Date().toISOString(),
  };
}

export function FindSomeoneApp() {
  const search = useSearch({ from: "/find-someone" });
  const mode = search.mode === "live" ? "live" : "demo";
  const initialQuery = search.q || (mode === "demo" ? DEMO_INVESTIGATION.query.raw : "");

  const [investigation, setInvestigation] = useState<Investigation>(() =>
    mode === "demo"
      ? {
          ...DEMO_INVESTIGATION,
          query: { ...DEMO_INVESTIGATION.query, raw: initialQuery || DEMO_INVESTIGATION.query.raw },
        }
      : emptyInvestigation(initialQuery),
  );
  const [isSearching, setIsSearching] = useState(false);
  const [currentIntent, setCurrentIntent] = useState<SearchIntent>("person");
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(
    mode === "demo"
      ? PENDING_STEPS.map((step) => ({ ...step, status: "completed" as const }))
      : PENDING_STEPS,
  );
  const [kernel, setKernel] = useState<InvestigationKernelResult | null>(null);

  const showWorkspace = useMemo(
    () => mode === "demo" && investigation.persons.length > 0,
    [mode, investigation.persons.length],
  );

  const handleExecuteSearch = async (query: string, intent: SearchIntent) => {
    setIsSearching(true);
    soundEngine.playTerminal();
    setCurrentIntent(intent);
    setKernel(null);

    if (mode === "live") {
      setPipelineSteps([
        { label: "UNDERSTANDING", status: "running" },
        { label: "COLLECTING", status: "pending" },
        { label: "CORRELATING", status: "pending" },
        { label: "VERIFYING", status: "pending" },
      ]);

      try {
        const res = await fetch("/api/intelligence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const json = (await res.json()) as InvestigationKernelResult & { error?: string };
        if (!res.ok) throw new Error(json.error || "Kernel failed");

        setKernel(json);
        setPipelineSteps(
          (json.phases || []).map((p) => ({
            label: p.id,
            status:
              p.status === "skipped"
                ? ("unavailable" as const)
                : (p.status as PipelineStep["status"]),
          })),
        );
        setInvestigation(emptyInvestigation(query));
        soundEngine.playSuccess();
      } catch (e) {
        setPipelineSteps([
          { label: "UNDERSTANDING", status: "completed" },
          { label: "COLLECTING", status: "unavailable" },
          { label: "CORRELATING", status: "unavailable" },
          { label: "VERIFYING", status: "unavailable" },
        ]);
        setKernel(null);
        setInvestigation(emptyInvestigation(query));
        soundEngine.playClick();
        console.error(e);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    const steps = PENDING_STEPS.map((step, idx) => ({
      ...step,
      status: idx === 0 ? ("running" as const) : ("pending" as const),
    }));
    setPipelineSteps(steps);

    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 1;
      if (currentIdx >= steps.length) {
        clearInterval(interval);
        setIsSearching(false);
        soundEngine.playSuccess();
        setPipelineSteps(PENDING_STEPS.map((step) => ({ ...step, status: "completed" as const })));
        setInvestigation({
          ...DEMO_INVESTIGATION,
          query: { ...DEMO_INVESTIGATION.query, raw: query },
        });
      } else {
        setPipelineSteps((prev) =>
          prev.map((step, idx) => {
            if (idx < currentIdx) return { ...step, status: "completed" as const };
            if (idx === currentIdx) return { ...step, status: "running" as const };
            return { ...step, status: "pending" as const };
          }),
        );
      }
    }, 220);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-foreground font-sans">
      <FindSomeoneNav mode={mode} />

      <main className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-8 py-10 sm:py-14 space-y-10">
        <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
          <Link to="/lab" className="rounded-full border border-white/10 px-3 py-1 text-muted-foreground hover:text-[#62E6FF]">
            Lab hub
          </Link>
          <Link to="/world-os" className="rounded-full border border-white/10 px-3 py-1 text-muted-foreground hover:text-[#62E6FF]">
            World OS
          </Link>
          <Link to="/forensic-lab" className="rounded-full border border-white/10 px-3 py-1 text-muted-foreground hover:text-[#62E6FF]">
            Forensic Lab
          </Link>
        </div>

        {mode === "demo" ? (
          <p className="rounded-xl border border-[#F6C85F]/30 bg-[#F6C85F]/10 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-[#F6C85F]">
            Demo mode — scripted dossier. Not a live public-records search.
          </p>
        ) : (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground">
            Live Information Kernel — public HTTP collectors only. Adapter brand names stay off
            the chrome. AUTH_DEPENDENT India / username workers are labeled honestly when offline.
          </p>
        )}

        <SearchInterface
          onSearch={handleExecuteSearch}
          isSearching={isSearching}
          onOpenFilters={() => undefined}
          activeQuery={investigation.query.raw}
          currentIntent={currentIntent}
          onIntentChange={setCurrentIntent}
        />

        {(isSearching || pipelineSteps.some((step) => step.status !== "pending")) && (
          <LiveProgress
            steps={pipelineSteps}
            targetQuery={investigation.query.raw}
            isSearching={isSearching}
            mode={mode}
          />
        )}

        {mode === "live" && kernel && (
          <section className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {kernel.classification.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#62E6FF]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted-foreground border border-white/10 rounded-xl px-4 py-3">
              {kernel.boundary}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {kernel.adapters.map((a) => (
                <div key={a.adapterId} className="rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Collector · {a.health}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{a.statusLabel}</p>
                  {a.error && <p className="mt-1 text-[11px] text-muted-foreground">{a.error}</p>}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Evidence ({kernel.evidence.length})
              </h2>
              {kernel.evidence.length === 0 ? (
                <p className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-muted-foreground">
                  No public evidence returned for this query class yet. Try a domain (e.g.
                  example.com) to exercise live DNS / registration / archive collectors.
                </p>
              ) : (
                kernel.evidence.map((ev) => (
                  <article
                    key={ev.id}
                    className="rounded-xl border border-white/10 bg-[#0A0D12] p-5 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-medium text-foreground">{ev.title}</h3>
                      <span className="font-mono text-[10px] text-[#62E6FF]">{ev.confidence}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{ev.summary}</p>
                    <dl className="grid gap-2 sm:grid-cols-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground pt-2 border-t border-white/5">
                      <div>
                        <dt>Source</dt>
                        <dd className="text-foreground normal-case tracking-normal mt-0.5">
                          {ev.provenance.sourceLabel}
                        </dd>
                      </div>
                      <div>
                        <dt>Retrieved</dt>
                        <dd className="text-foreground normal-case tracking-normal mt-0.5">
                          {ev.provenance.retrievedAt}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt>Why am I seeing this?</dt>
                        <dd className="text-foreground normal-case tracking-normal mt-0.5">
                          {ev.provenance.whyVisible}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt>Limitations</dt>
                        <dd className="text-muted-foreground normal-case tracking-normal mt-0.5 space-y-0.5">
                          {ev.provenance.limitations.map((l) => (
                            <p key={l}>• {l}</p>
                          ))}
                        </dd>
                      </div>
                    </dl>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-[10px] uppercase tracking-wider text-[#62E6FF] hover:underline"
                      >
                        Open public record
                      </a>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>
        )}

        {showWorkspace ? (
          <InvestigationWorkspace investigation={investigation} currentIntent={currentIntent} />
        ) : mode === "demo" ? (
          <section className="rounded-2xl border border-white/10 bg-[#0A0D12] p-8 md:p-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              No strong public evidence found
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The demo dossier did not load persons for this query. Try the default demo target, or
              switch to Live mode for public domain collectors.
            </p>
          </section>
        ) : null}
      </main>
    </div>
  );
}
