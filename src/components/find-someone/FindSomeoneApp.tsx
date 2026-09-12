import { useMemo, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { FindSomeoneNav } from "./FindSomeoneNav";
import { SearchInterface } from "./SearchInterface";
import { LiveProgress, type PipelineStep } from "./LiveProgress";
import { InvestigationWorkspace } from "./InvestigationWorkspace";
import { DEMO_INVESTIGATION } from "@/content/demo-investigation";
import { detectQueryType } from "@/lib/find-someone/scoring";
import { soundEngine } from "@/lib/sound-engine";
import type { Investigation, SearchIntent } from "@/lib/find-someone/types";

const PENDING_STEPS: PipelineStep[] = [
  { label: "Understanding query", status: "pending" },
  { label: "Planning sources", status: "pending" },
  { label: "Searching public web", status: "pending" },
  { label: "Collecting evidence", status: "pending" },
  { label: "Ready", status: "pending" },
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
  const initialQuery = search.q || DEMO_INVESTIGATION.query.raw;

  const [investigation, setInvestigation] = useState<Investigation>(() =>
    mode === "demo"
      ? {
          ...DEMO_INVESTIGATION,
          query: { ...DEMO_INVESTIGATION.query, raw: initialQuery },
        }
      : emptyInvestigation(initialQuery),
  );
  const [isSearching, setIsSearching] = useState(false);
  const [currentIntent, setCurrentIntent] = useState<SearchIntent>("person");
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(
    mode === "demo"
      ? PENDING_STEPS.map((step) => ({ ...step, status: "completed" }))
      : PENDING_STEPS,
  );

  const showWorkspace = useMemo(
    () => mode === "demo" && investigation.persons.length > 0,
    [mode, investigation.persons.length],
  );

  const handleExecuteSearch = (query: string, intent: SearchIntent) => {
    setIsSearching(true);
    soundEngine.playTerminal();
    setCurrentIntent(intent);

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
        setPipelineSteps(PENDING_STEPS.map((step) => ({ ...step, status: "completed" })));
        setInvestigation(
          mode === "demo"
            ? { ...DEMO_INVESTIGATION, query: { ...DEMO_INVESTIGATION.query, raw: query } }
            : emptyInvestigation(query),
        );
      } else {
        setPipelineSteps((prev) =>
          prev.map((step, idx) => {
            if (idx < currentIdx) return { ...step, status: "completed" };
            if (idx === currentIdx) return { ...step, status: "running" };
            return { ...step, status: "pending" };
          }),
        );
      }
    }, 220);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-foreground font-sans">
      <FindSomeoneNav mode={mode} />

      <main className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-8 py-10 sm:py-14 space-y-10">
        {mode === "demo" ? (
          <p className="rounded-xl border border-[#F6C85F]/30 bg-[#F6C85F]/10 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-[#F6C85F]">
            Demo mode — scripted dossier. Not a live public-records search.
          </p>
        ) : (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground">
            Live workers are not connected yet. The system will not invent sources,
            aircraft, or identities.
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
          />
        )}

        {showWorkspace ? (
          <InvestigationWorkspace investigation={investigation} currentIntent={currentIntent} />
        ) : (
          <section className="rounded-2xl border border-white/10 bg-[#0A0D12] p-8 md:p-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              No strong public evidence found
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The system could not establish a reliable match from connected
              public sources. Try Demo Mode, or add an organization, username,
              website, or location.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
