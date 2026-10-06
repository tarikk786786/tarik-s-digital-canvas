/**
 * PersonIntelligenceReport
 *
 * 30-section structured report renderer for person-class investigations.
 * Shows WHAT was found — never exposes which tool or how many tools ran.
 * Evidence confidence: VERIFIED / SUPPORTED / PROBABLE / UNCERTAIN
 * Evidence type: OBSERVED / INFERRED / POSSIBLE
 */

import { useMemo, useState } from "react";
import {
  User,
  Github,
  BookOpen,
  Globe,
  Building2,
  Link2,
  Clock,
  GitBranch,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Activity,
  Hash,
} from "lucide-react";
import {
  ConfidenceMeter,
  EvidenceBadge,
  SourceBadge,
  TechnicalLabel,
  SystemIndicator,
} from "@/components/system";
import type { PersonIntelligenceResult, PersonCandidate } from "@/lib/intelligence/person-engine";
import type { KernelEvidence } from "@/lib/intelligence/collectors";

// ── Sub-components ────────────────────────────────────────────────────────────

function EvidenceCard({ ev }: { ev: KernelEvidence }) {
  const [expanded, setExpanded] = useState(false);
  const confidenceColors: Record<string, string> = {
    VERIFIED: "border-emerald-500/30 bg-emerald-500/[0.04]",
    SUPPORTED: "border-[#62E6FF]/25 bg-[#62E6FF]/[0.04]",
    PROBABLE: "border-amber-400/25 bg-amber-400/[0.04]",
    UNCERTAIN: "border-red-400/20 bg-red-400/[0.03]",
  };
  const border = confidenceColors[ev.confidence] ?? "border-white/10 bg-[#0A0D12]";

  return (
    <article className={`rounded-xl border p-4 space-y-2 ${border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <TechnicalLabel>{ev.provenance.sourceLabel}</TechnicalLabel>
          <h4 className="mt-1 font-medium text-sm leading-snug">{ev.title}</h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SourceBadge
            label={ev.confidence}
            freshness={ev.freshness as "LIVE" | "CACHED" | "DEMO" | "OFFLINE"}
          />
          {ev.url && (
            <a
              href={ev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#62E6FF] transition-colors"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{ev.summary.slice(0, 280)}</p>
      {ev.summary.length > 280 && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="text-[11px] font-mono text-[#62E6FF] hover:opacity-80 flex items-center gap-1"
        >
          {expanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
      {expanded && (
        <p className="text-xs text-muted-foreground leading-relaxed">{ev.summary.slice(280)}</p>
      )}
      {expanded && (
        <details className="mt-2">
          <summary className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground cursor-pointer">
            Provenance
          </summary>
          <dl className="mt-2 space-y-1 text-[11px]">
            <div>
              <dt className="text-muted-foreground inline">Method: </dt>
              <dd className="inline text-foreground">{ev.provenance.method}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground inline">Retrieved: </dt>
              <dd className="inline text-foreground">{ev.observedAt.slice(0, 16).replace("T", " ")} UTC</dd>
            </div>
            {ev.provenance.limitations.map((l) => (
              <div key={l} className="text-amber-400/80">⚠ {l}</div>
            ))}
          </dl>
        </details>
      )}
    </article>
  );
}

function CandidateCard({ candidate }: { candidate: PersonCandidate }) {
  const distinctionColors: Record<string, string> = {
    HIGH: "text-emerald-400",
    MEDIUM: "text-[#62E6FF]",
    LOW: "text-amber-400",
    AMBIGUOUS: "text-red-400",
  };

  return (
    <article className="rounded-2xl border border-[#62E6FF]/20 bg-gradient-to-br from-[#62E6FF]/5 via-transparent to-transparent p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-full border border-[#62E6FF]/30 bg-[#62E6FF]/10 flex items-center justify-center shrink-0">
          <User className="size-5 text-[#62E6FF]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold">{candidate.names[0]}</p>
          <p className={`font-mono text-[10px] uppercase tracking-wider mt-0.5 ${distinctionColors[candidate.distinctionConfidence]}`}>
            Entity confidence: {candidate.distinctionConfidence}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* GitHub profile */}
        {candidate.github && (
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-3 space-y-2">
            <TechnicalLabel className="flex items-center gap-1">
              <Github className="size-3" /> Developer profile
            </TechnicalLabel>
            <div className="space-y-1 text-xs">
              {candidate.github.bio && (
                <p className="text-muted-foreground italic">&quot;{candidate.github.bio.slice(0, 120)}&quot;</p>
              )}
              {candidate.github.company && (
                <p><span className="text-muted-foreground">Company: </span>{candidate.github.company}</p>
              )}
              {candidate.github.location && (
                <p>
                  <span className="text-muted-foreground">Location (stated): </span>
                  {candidate.github.location}
                  <span className="ml-1 font-mono text-[9px] text-amber-400">POSSIBLE</span>
                </p>
              )}
              {candidate.github.publicEmail && (
                <p><span className="text-muted-foreground">Public email: </span>{candidate.github.publicEmail}</p>
              )}
              <p>
                <span className="text-muted-foreground">Repos: </span>{candidate.github.publicRepos}
                &ensp;·&ensp;
                <span className="text-muted-foreground">Followers: </span>{candidate.github.followers}
              </p>
            </div>
            <a
              href={candidate.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#62E6FF] hover:opacity-80"
            >
              <ExternalLink className="size-3" /> View profile
            </a>
          </div>
        )}

        {/* Academic profile */}
        {candidate.academic && (
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-3 space-y-2">
            <TechnicalLabel className="flex items-center gap-1">
              <BookOpen className="size-3" /> Research profile
            </TechnicalLabel>
            <div className="space-y-1 text-xs">
              <p><span className="text-muted-foreground">Works: </span>{candidate.academic.worksCount}</p>
              <p><span className="text-muted-foreground">Citations: </span>{candidate.academic.citationCount}</p>
              {candidate.academic.orcid && (
                <p><span className="text-muted-foreground">ORCID: </span>{candidate.academic.orcid}</p>
              )}
              {candidate.academic.affiliations.length > 0 && (
                <p>
                  <span className="text-muted-foreground">Institutions: </span>
                  {candidate.academic.affiliations.slice(0, 2).join(", ")}
                  <span className="ml-1 font-mono text-[9px] text-amber-400">PROBABLE</span>
                </p>
              )}
              {candidate.academic.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {candidate.academic.topics.slice(0, 4).map((t) => (
                    <EvidenceBadge key={t}>{t}</EvidenceBadge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Organizations */}
        {candidate.organizations.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-3 space-y-2">
            <TechnicalLabel className="flex items-center gap-1">
              <Building2 className="size-3" /> Affiliations
            </TechnicalLabel>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {candidate.organizations.map((org) => (
                <li key={org}>· {org}</li>
              ))}
            </ul>
            <p className="font-mono text-[9px] text-amber-400">PROBABLE — self-reported</p>
          </div>
        )}

        {/* Emails */}
        {candidate.publicEmails.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-3 space-y-2">
            <TechnicalLabel>Public emails</TechnicalLabel>
            <ul className="space-y-1 text-xs">
              {candidate.publicEmails.map((email) => (
                <li key={email} className="font-mono">{email}</li>
              ))}
            </ul>
            <p className="font-mono text-[9px] text-muted-foreground">Extracted from public profiles only</p>
          </div>
        )}

        {/* Locations */}
        {candidate.locations.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-3 space-y-2">
            <TechnicalLabel className="flex items-center gap-1">
              <Globe className="size-3" /> Locations (stated)
            </TechnicalLabel>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {candidate.locations.map((loc) => (
                <li key={loc}>· {loc}</li>
              ))}
            </ul>
            <p className="font-mono text-[9px] text-amber-400">
              POSSIBLE — user-stated, not verified or tracked
            </p>
          </div>
        )}

        {/* Websites */}
        {candidate.websites.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-3 space-y-2">
            <TechnicalLabel className="flex items-center gap-1">
              <Link2 className="size-3" /> Associated websites
            </TechnicalLabel>
            <ul className="space-y-1 text-xs">
              {candidate.websites.map((site) => (
                <li key={site}>
                  <a
                    href={site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#62E6FF] hover:opacity-80 font-mono"
                  >
                    {site.replace(/^https?:\/\//, "").split("/")[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface Props {
  result: PersonIntelligenceResult;
}

export function PersonIntelligenceReport({ result }: Props) {
  const [activeSection, setActiveSection] = useState<string>("identity");

  const sections = useMemo(
    () => [
      { id: "identity", label: "Identity", icon: User, count: result.candidates.length },
      { id: "evidence", label: "Evidence", icon: ShieldCheck, count: result.evidence.length },
      { id: "timeline", label: "Timeline", icon: Clock, count: result.timeline.length },
      { id: "pivots", label: "Pivots", icon: GitBranch, count: result.pivots.length },
      { id: "conflicts", label: "Conflicts", icon: AlertTriangle, count: result.conflicts.length },
      { id: "collectors", label: "Collectors", icon: Activity, count: result.adapters.length },
      { id: "pending", label: "Pending", icon: Hash, count: result.pendingCapabilities.length },
    ],
    [result],
  );

  const liveAdapters = result.adapters.filter((a) => a.health === "AVAILABLE");
  const totalFindings = result.evidence.length;
  const overallConfidence = totalFindings === 0 ? 0 : Math.min(
    100,
    Math.round(
      result.evidence.reduce((sum, ev) => {
        const weights: Record<string, number> = {
          VERIFIED: 100,
          SUPPORTED: 85,
          PROBABLE: 65,
          UNCERTAIN: 40,
        };
        return sum + (weights[ev.confidence] ?? 50);
      }, 0) / result.evidence.length,
    ),
  );

  return (
    <div className="space-y-6">
      {/* Report header */}
      <article className="rounded-2xl border border-[#62E6FF]/25 bg-gradient-to-br from-[#62E6FF]/8 via-transparent to-amber-500/5 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <TechnicalLabel className="text-[#62E6FF]">Person Intelligence Report</TechnicalLabel>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {result.query}
            </h2>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300/80">
              {result.classification.primary} class · {liveAdapters.length} live sources ·{" "}
              {totalFindings} findings
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.phases.map((phase) => (
              <span
                key={phase.id}
                className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${
                  phase.status === "completed"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : phase.status === "skipped"
                      ? "border-white/10 text-muted-foreground"
                      : "border-amber-400/30 bg-amber-400/10 text-amber-400"
                }`}
              >
                {phase.id}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Candidates</p>
            <p className="mt-1 text-2xl font-bold">{result.candidates.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Evidence</p>
            <p className="mt-1 text-2xl font-bold">{result.evidence.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Pivots found</p>
            <p className="mt-1 text-2xl font-bold">{result.pivots.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</p>
            <p className={`mt-1 text-2xl font-bold ${overallConfidence >= 80 ? "text-emerald-400" : overallConfidence >= 60 ? "text-amber-400" : "text-muted-foreground"}`}>
              {overallConfidence > 0 ? `${overallConfidence}%` : "—"}
            </p>
          </div>
        </div>
      </article>

      {/* Section tabs */}
      <div className="flex gap-1.5 overflow-x-auto">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${
                activeSection === sec.id
                  ? "border-[#62E6FF]/50 bg-[#62E6FF]/15 text-[#62E6FF]"
                  : "border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-3" />
              {sec.label}
              {sec.count > 0 && (
                <span className="ml-0.5 rounded-full bg-white/10 px-1.5 text-[9px]">{sec.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* IDENTITY section */}
      {activeSection === "identity" && (
        <div className="space-y-4">
          {result.candidates.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                No person candidates resolved from public sources
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Try a more specific query: full name, GitHub username, or professional name.
              </p>
            </div>
          ) : (
            result.candidates.map((c) => <CandidateCard key={c.candidateId} candidate={c} />)
          )}
        </div>
      )}

      {/* EVIDENCE section */}
      {activeSection === "evidence" && (
        <div className="space-y-3">
          {result.evidence.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                No public evidence retrieved
              </p>
            </div>
          ) : (
            result.evidence.map((ev) => <EvidenceCard key={ev.id} ev={ev} />)
          )}
        </div>
      )}

      {/* TIMELINE section */}
      {activeSection === "timeline" && (
        <div className="space-y-2">
          {result.timeline.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 p-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                No temporal events extracted
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
              {result.timeline.map((ev) => (
                <div key={ev.id} className="relative pl-10 pb-4">
                  <div className="absolute left-3 top-1.5 size-2 rounded-full bg-[#62E6FF]/60 ring-2 ring-[#050608]" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{ev.date}</p>
                  <p className="mt-0.5 text-sm leading-snug">{ev.event.slice(0, 200)}</p>
                  <p className="mt-1 font-mono text-[9px] text-muted-foreground">{ev.source} · {ev.confidence}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PIVOTS section */}
      {activeSection === "pivots" && (
        <div className="space-y-3">
          {result.pivots.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 p-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                No secondary identifiers discovered for pivot
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                These identifiers were discovered in evidence and can be re-investigated through
                the relevant engines automatically.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {result.pivots.map((pivot, i) => (
                  <div
                    key={`${pivot.pivotClass}-${i}`}
                    className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <TechnicalLabel>{pivot.pivotClass}</TechnicalLabel>
                      <span className={`font-mono text-[9px] ${pivot.confidence === "HIGH" ? "text-emerald-400" : pivot.confidence === "MEDIUM" ? "text-[#62E6FF]" : "text-amber-400"}`}>
                        {pivot.confidence}
                      </span>
                    </div>
                    <p className="font-mono text-sm">{pivot.value}</p>
                    <p className="font-mono text-[9px] text-muted-foreground">
                      Discovered in: {pivot.discoveredIn}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* CONFLICTS section */}
      {activeSection === "conflicts" && (
        <div className="space-y-3">
          {result.conflicts.length === 0 ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                No contradictions detected across sources
              </p>
            </div>
          ) : (
            result.conflicts.map((c) => (
              <article key={c.id} className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="size-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                      Conflict · {c.field}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {c.sides.map((side) => (
                    <div key={side.label} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                      <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{side.label}</p>
                      <p className="mt-1 text-sm">{side.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {/* COLLECTORS section */}
      {activeSection === "collectors" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            These are the capability categories that were queried. Tool names are internal
            implementation details — visitors see capabilities, not tools.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {result.adapters.map((a) => (
              <div key={a.adapterId} className="rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <TechnicalLabel>{a.categoryLabel}</TechnicalLabel>
                  <SystemIndicator
                    health={
                      a.health === "AVAILABLE"
                        ? "ONLINE"
                        : a.health === "AUTH_DEPENDENT"
                          ? "AUTH_DEPENDENT"
                          : a.health
                    }
                  />
                </div>
                <p className="mt-2 text-xs text-foreground">{a.statusLabel}</p>
                {a.evidence.length > 0 && (
                  <p className="mt-1 font-mono text-[9px] text-[#62E6FF]">
                    {a.evidence.length} evidence item(s)
                  </p>
                )}
                {a.error && (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Analysis temporarily unavailable
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PENDING section */}
      {activeSection === "pending" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            These capabilities are architecturally planned and registered in the internal tool
            registry. They require server-side workers or API credentials not yet provisioned.
            The system never invents results for pending capabilities.
          </p>
          <div className="space-y-2">
            {result.pendingCapabilities.map((cap) => (
              <div key={cap} className="rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3">
                <div className="flex items-center gap-2">
                  <SystemIndicator health="AUTH_DEPENDENT" />
                  <p className="text-xs text-muted-foreground">{cap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ethical boundary */}
      <div className="rounded-xl border border-white/10 bg-[#0A0D12] px-4 py-3">
        <TechnicalLabel className="mb-1 block">Scope boundary</TechnicalLabel>
        <p className="text-xs text-muted-foreground leading-relaxed">{result.boundary}</p>
        <p className="mt-1 font-mono text-[9px] text-muted-foreground">
          Retrieved: {result.retrievedAt.slice(0, 16).replace("T", " ")} UTC
        </p>
      </div>
    </div>
  );
}
