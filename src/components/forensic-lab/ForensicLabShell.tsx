import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  FlaskConical,
  Fingerprint,
  Dna,
  FileText,
  HardDrive,
  Flame,
  Search,
  ShieldAlert,
  Hash,
} from "lucide-react";
import { CASE_0001 } from "@/content/forensic-case-0001";
import { soundEngine } from "@/lib/sound-engine";
import { PROFILE } from "@/lib/profile";
import { FORENSIC_REPOSITORY_REGISTRY, getPublicWorkerStatuses, getRegistryHealthSummary } from "@/lib/forensic/registry";
import { ForensicEvidenceGraph } from "./ForensicEvidenceGraph";
import {
  ConfidenceMeter,
  DataPanel,
  DiagnosticPanel,
  EvidenceBadge,
  SourceBadge,
  SystemIndicator,
  TechnicalLabel,
} from "@/components/system";
import { SystemStatusBar } from "@/components/system/SystemStatusBar";

const DISCIPLINES = [
  { id: "TOX", label: "TOX", icon: FlaskConical },
  { id: "DNA", label: "DNA", icon: Dna },
  { id: "FINGERPRINT", label: "FINGERPRINT", icon: Fingerprint },
  { id: "TRACE", label: "TRACE", icon: Search },
  { id: "DIGITAL", label: "DIGITAL", icon: HardDrive },
  { id: "DOCUMENT", label: "DOCUMENT", icon: FileText },
  { id: "FIRE", label: "FIRE", icon: Flame },
] as const;

const TOX_STEPS = ["SCREENING", "CONFIRMATION", "QUANTITATION", "INTERPRETATION"] as const;

export function ForensicLabShell() {
  const [discipline, setDiscipline] = useState<string>("TOX");
  const [toxStep, setToxStep] = useState<(typeof TOX_STEPS)[number]>("SCREENING");
  const [ask, setAsk] = useState("");
  const [askAnswer, setAskAnswer] = useState<string | null>(null);
  const [hashMatch, setHashMatch] = useState<boolean | null>(null);
  const [docResult, setDocResult] = useState<string | null>(null);

  const workerStatuses = useMemo(() => getPublicWorkerStatuses(), []);
  const registrySummary = useMemo(() => getRegistryHealthSummary(), []);

  const evidenceForDiscipline = useMemo(
    () =>
      CASE_0001.evidence.filter(
        (e) => discipline === "TOX" || e.type === discipline || discipline === "TRACE",
      ),
    [discipline],
  );

  const runHashDemo = async () => {
    soundEngine.playClick();
    const adapter = FORENSIC_REPOSITORY_REGISTRY.find((a) => a.id === "integrity-hash");
    if (!adapter?.analyze) return;
    const out = await adapter.analyze({
      caseId: CASE_0001.id,
      evidenceId: "EX-DIGITAL-01",
      bytes: new Uint8Array(0).buffer,
      synthetic: true,
    });
    const digest = String((out.results as { digest?: string }).digest || "");
    setHashMatch(digest === CASE_0001.digitalHashDemo.expected);
  };

  const onDocumentUpload = async (file: File | null) => {
    if (!file) return;
    soundEngine.playClick();
    const adapter = FORENSIC_REPOSITORY_REGISTRY.find((a) => a.id === "document-text");
    if (!adapter?.analyze) return;
    const text = await file.text();
    const out = await adapter.analyze({
      caseId: CASE_0001.id,
      evidenceId: file.name,
      text,
      synthetic: true,
    });
    setDocResult(
      `${out.interpretation} Confidence ${out.confidence}. ${(out.results as { preview?: string }).preview || ""}`,
    );
  };

  const askLab = (event: React.FormEvent) => {
    event.preventDefault();
    soundEngine.playClick();
    const q = ask.trim().toLowerCase();
    const hit = CASE_0001.askLabFaq.find(
      (f) => q.includes(f.q.toLowerCase().slice(0, 12)) || f.q.toLowerCase().includes(q.slice(0, 12)),
    );
    if (hit) setAskAnswer(hit.a);
    else if (q.includes("real") || q.includes("evidence"))
      setAskAnswer(CASE_0001.askLabFaq[0].a);
    else if (q.includes("tox") || q.includes("poison") || q.includes("dose"))
      setAskAnswer(CASE_0001.askLabFaq[1].a);
    else if (q.includes("hash") || q.includes("digital"))
      setAskAnswer(CASE_0001.askLabFaq[2].a);
    else
      setAskAnswer(
        "Ask the Lab only answers from the synthetic CASE 0001 dataset. Rephrase using case terms (hash, tox card, real case).",
      );
  };

  return (
    <div className="min-h-screen bg-[#050608] text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050608]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/lab"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
            >
              <ArrowLeft className="size-3.5" /> Lab
            </Link>
            <div>
              <p className="font-display text-sm font-bold tracking-tight">
                TARIK ISLAM // FORENSIC INTELLIGENCE LAB
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300/90">
                {CASE_0001.banner}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/world-os"
              onClick={() => soundEngine.playClick()}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
            >
              World OS
            </Link>
            <Link
              to="/find-someone"
              search={{ mode: "live", id: undefined, q: undefined }}
              onClick={() => soundEngine.playClick()}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF]"
            >
              Find Details
            </Link>
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-200">
              Status · {CASE_0001.status}
            </span>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1600px] gap-1.5 overflow-x-auto px-4 pb-3 sm:px-8">
          {DISCIPLINES.map((d) => {
            const Icon = d.icon;
            const active = discipline === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setDiscipline(d.id);
                }}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${
                  active
                    ? "border-[#62E6FF]/50 bg-[#62E6FF]/15 text-[#62E6FF]"
                    : "border-white/10 text-muted-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {d.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-8 sm:px-8 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-7">
          <article className="rounded-2xl border border-[#62E6FF]/25 bg-gradient-to-br from-[#62E6FF]/10 via-transparent to-amber-500/5 p-6 md:p-8">
            <TechnicalLabel className="text-[#62E6FF]">Practitioner · Forensic Intelligence Lab</TechnicalLabel>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {PROFILE.name}
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#62E6FF]">
              {PROFILE.primaryRole}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {PROFILE.professionalSummary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <EvidenceBadge>Investigation</EvidenceBadge>
              <EvidenceBadge>Toxicology</EvidenceBadge>
              <EvidenceBadge>Digital forensics</EvidenceBadge>
              <SourceBadge label="Capability map" freshness="DEMO" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ConfidenceMeter confidence="SUPPORTED" />
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <TechnicalLabel className="mb-2 block">Host modules</TechnicalLabel>
                <p className="font-mono text-xs text-foreground">
                  {registrySummary.online.length} online ·{" "}
                  {registrySummary.counts.WORKER_PENDING ?? 0} workers pending
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  No mass install of Autopsy-class stacks — registry is a capability map only.
                </p>
              </div>
            </div>
          </article>

          <SystemStatusBar />

          <article className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-200">
              Case board · {CASE_0001.id}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {CASE_0001.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{CASE_0001.summary}</p>
          </article>

          <ForensicEvidenceGraph />

          {discipline === "TOX" && (
            <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 space-y-5">
              <h2 className="font-display text-xl font-bold">Toxicology workflow</h2>
              <p className="text-xs text-muted-foreground">
                Educational analysis only — no synthesis, lethal-dose optimization, or concealment
                guidance.
              </p>
              <div className="flex flex-wrap gap-2">
                {TOX_STEPS.map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setToxStep(step);
                    }}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${
                      toxStep === step
                        ? "border-[#62E6FF]/50 bg-[#62E6FF]/15 text-[#62E6FF]"
                        : "border-white/10 text-muted-foreground"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#62E6FF]">
                  Uncertainty bar
                </p>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400"
                    style={{
                      width:
                        toxStep === "SCREENING"
                          ? "35%"
                          : toxStep === "CONFIRMATION"
                            ? "55%"
                            : toxStep === "QUANTITATION"
                              ? "70%"
                              : "45%",
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {toxStep === "INTERPRETATION"
                    ? "Interpretation remains UNCERTAIN on synthetic data — never overstate certainty."
                    : `${toxStep} stage active on educational specimen EX-TOX-01.`}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 p-4 space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Educational substance card
                </p>
                <h3 className="font-display text-lg font-semibold">{CASE_0001.toxCard.identity}</h3>
                <p className="text-sm text-muted-foreground">{CASE_0001.toxCard.category}</p>
                <p className="text-sm">{CASE_0001.toxCard.specimenRelevance}</p>
                <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                  {CASE_0001.toxCard.interpretationConsiderations.map((c) => (
                    <li key={c}>• {c}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-dashed border-white/15 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                  Mass spectrum · labeled simulation
                </p>
                <div className="flex items-end gap-1 h-24">
                  {[20, 45, 30, 80, 55, 25, 60, 35, 15, 40].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-[#62E6FF]/50"
                      style={{ height: `${h}%` }}
                      title={`Synthetic peak ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Synthetic peaks for UI training — not a real instrument export.
                </p>
              </div>
            </article>
          )}

          {discipline === "DIGITAL" && (
            <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Digital evidence mini-flow</h2>
              <p className="text-sm text-muted-foreground">
                Preservation → hash → extraction → timeline (SHA-256 match demo on synthetic bytes).
              </p>
              <ol className="font-mono text-[11px] uppercase tracking-wider space-y-2 text-muted-foreground">
                <li>1. Preservation (write-blocker simulation)</li>
                <li>2. Hash</li>
                <li>3. Extraction</li>
                <li>4. Timeline</li>
              </ol>
              <button
                type="button"
                onClick={() => void runHashDemo()}
                className="inline-flex items-center gap-2 rounded-lg border border-[#62E6FF]/40 bg-[#62E6FF]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#62E6FF]"
              >
                <Hash className="size-3.5" />
                Verify SHA-256 seal
              </button>
              {hashMatch !== null && (
                <p className={`text-sm ${hashMatch ? "text-emerald-400" : "text-red-400"}`}>
                  {hashMatch
                    ? "MATCH — synthetic empty payload equals sealed expected digest."
                    : "MISMATCH — unexpected digest."}
                </p>
              )}
              <p className="font-mono text-[10px] text-muted-foreground break-all">
                Expected: {CASE_0001.digitalHashDemo.expected}
              </p>
            </article>
          )}

          {discipline === "DOCUMENT" && (
            <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Document text path</h2>
              <p className="text-sm text-muted-foreground">
                Quarantined working-copy text extraction only — no macros or scripts execute in the
                web process. PDF/OCR workers remain WORKER_PENDING.
              </p>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-wider hover:border-[#62E6FF]/40">
                <FileText className="size-3.5" />
                Upload .txt / .md
                <input
                  type="file"
                  accept=".txt,.md,text/plain,text/markdown"
                  className="hidden"
                  onChange={(e) => void onDocumentUpload(e.target.files?.[0] ?? null)}
                />
              </label>
              {docResult && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {docResult}
                </p>
              )}
            </article>
          )}

          {discipline === "FINGERPRINT" && (
            <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6">
              <h2 className="font-display text-xl font-bold">Friction ridge (educational)</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Training view: minutiae are discussed as ridge endings / bifurcations for method
                practice. No real subject identification.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Ridge ending", "Bifurcation", "Island"].map((m) => (
                  <div key={m} className="rounded-lg border border-white/10 p-3 text-center text-xs">
                    {m}
                  </div>
                ))}
              </div>
            </article>
          )}

          {!["TOX", "DIGITAL", "FINGERPRINT", "DOCUMENT"].includes(discipline) && (
            <article className="rounded-2xl border border-dashed border-white/15 bg-[#0A0D12] p-6">
              <h2 className="font-display text-xl font-bold">{discipline} module</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Architecture stub — educational UI coming. CASE 0001 still anchors the board.
              </p>
            </article>
          )}

          <div className="space-y-3">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Evidence quality
            </h2>
            {(evidenceForDiscipline.length ? evidenceForDiscipline : CASE_0001.evidence).map(
              (ex) => (
                <article key={ex.id} className="rounded-xl border border-white/10 bg-[#0A0D12] p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium">{ex.label}</h3>
                    <span className="font-mono text-[10px] text-[#62E6FF]">{ex.stage}</span>
                  </div>
                  <dl className="mt-3 space-y-2 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Observation</dt>
                      <dd>{ex.observation}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Analytical result</dt>
                      <dd>{ex.analysis}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Interpretation</dt>
                      <dd>{ex.interpretation}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Conclusion</dt>
                      <dd className="text-[#62E6FF]">{ex.conclusion}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Why / limitations</dt>
                      <dd className="text-muted-foreground">
                        {ex.limitations.map((l) => (
                          <p key={l}>• {l}</p>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </article>
              ),
            )}
          </div>
        </section>

        <aside className="lg:col-span-5 space-y-6">
          <DiagnosticPanel
            title="Capability map status"
            rows={workerStatuses.slice(0, 12).map((w) => ({
              label: w.label,
              value: w.detail,
              health: w.health,
            }))}
          />
          <DataPanel title="Chain of custody" eyebrow="CASE 0001">
            <ol className="space-y-3">
              {CASE_0001.chainOfCustody.map((c) => (
                <li key={c.at} className="border-l border-[#62E6FF]/40 pl-3">
                  <p className="font-mono text-[10px] text-[#62E6FF]">{c.at}</p>
                  <p className="text-sm">{c.event}</p>
                  <p className="text-xs text-muted-foreground">{c.actor}</p>
                </li>
              ))}
            </ol>
          </DataPanel>

          <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6">
            <TechnicalLabel className="mb-3 block">Ask the Lab</TechnicalLabel>
            <form onSubmit={askLab} className="space-y-3">
              <input
                value={ask}
                onChange={(e) => setAsk(e.target.value)}
                placeholder="Ask about CASE 0001 only…"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#62E6FF]/40"
              />
              <button
                type="submit"
                className="rounded-lg border border-[#62E6FF]/40 bg-[#62E6FF]/10 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[#62E6FF]"
              >
                Ask
              </button>
            </form>
            {askAnswer && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{askAnswer}</p>
            )}
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#0A0D12] p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="size-4 text-[#62E6FF]" />
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Standards Watch
              </h2>
            </div>
            <ul className="space-y-2 text-xs">
              {CASE_0001.standardsWatch.map((s) => (
                <li key={s.body} className="rounded-lg border border-white/5 px-3 py-2">
                  <p className="text-foreground font-medium">
                    {s.body} · {s.topic}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Last checked: {s.lastChecked} — {s.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground">
              Online modules <SystemIndicator health="ONLINE" /> · Workers{" "}
              <SystemIndicator health="WORKER_PENDING" />
            </p>
          </article>
        </aside>
      </main>
    </div>
  );
}
