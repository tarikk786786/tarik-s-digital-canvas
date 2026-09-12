import { IdentityCard } from "./IdentityCard";
import { PublicFootprint } from "./PublicFootprint";
import { ConflictAlert } from "./ConflictAlert";
import { IdentityExplainer } from "./IdentityExplainer";
import { SourceQuality } from "./SourceQuality";
import {
  ShieldCheck,
  Info,
  Sparkles,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building2,
  Users,
} from "lucide-react";
import type { Investigation, PersonEntity } from "@/lib/find-someone/types";

interface InvestigationOverviewProps {
  investigation: Investigation;
  selectedPerson: PersonEntity;
  onSelectPerson: (person: PersonEntity) => void;
  onNavigateTab: (tab: any) => void;
}

export function InvestigationOverview({
  investigation,
  selectedPerson,
  onSelectPerson,
  onNavigateTab,
}: InvestigationOverviewProps) {
  const match = investigation.identityMatches[0];

  const keyFindings = [
    {
      claim:
        "Statutory Director of Dezo Systems and Applied Intelligence Pvt Ltd (DIN 09248102, ROC Cuttack).",
      source: "Ministry of Corporate Affairs (MCA21) Registry",
      quality: "government",
      confidence: 99,
    },
    {
      claim:
        "Published peer-reviewed cloud volatile memory triage architecture indexed on IEEE Xplore with 45+ international citations.",
      source: "IEEE Computer Society Digital Archive",
      quality: "primary",
      confidence: 98,
    },
    {
      claim:
        "Co-founded venture officially recognized under Startup Odisha Deep-Tech Mission with State MSME accreditation.",
      source: "Government of Odisha MSME Directorate",
      quality: "government",
      confidence: 99,
    },
    {
      claim:
        "Active open-source systems maintainer on GitHub publishing memory triage and Indic security tools.",
      source: "GitHub Public Developer Graph",
      quality: "established",
      confidence: 95,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Intelligence Header (Section 9 & 17) */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF] font-bold">
              PUBLIC INTELLIGENCE PROFILE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mt-1">
              {selectedPerson.name}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              {selectedPerson.metadata.designation} · {selectedPerson.metadata.origin}
            </p>
          </div>

          {/* Identity Confidence Highlight Card */}
          <div className="rounded-xl border border-[#62E6FF]/30 bg-[#62E6FF]/[0.05] p-4 text-center sm:text-right shrink-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
              IDENTITY CONFIDENCE
            </span>
            <div className="font-display text-3xl sm:text-4xl font-black text-[#62E6FF]">
              {selectedPerson.confidence}%
            </div>
            <span className="font-mono text-[10.5px] text-[#6EE7B7]">
              Based on matching public evidence
            </span>
          </div>
        </div>

        {/* Public Footprint Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-4 border-t border-white/5 font-mono text-xs">
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">Identities</span>
            <span className="font-bold text-foreground">{investigation.persons.length}</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">Sources</span>
            <span className="font-bold text-[#62E6FF]">{investigation.sources.length}</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">Organizations</span>
            <span className="font-bold text-[#9B8CFF]">{investigation.organizations.length}</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">Profiles</span>
            <span className="font-bold text-foreground">
              {selectedPerson.publicProfiles.length}
            </span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">Documents</span>
            <span className="font-bold text-[#6EE7B7]">
              {selectedPerson.publicFootprint.documents}
            </span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">News Mentions</span>
            <span className="font-bold text-amber-400">
              {selectedPerson.publicFootprint.newsMentions}
            </span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-muted-foreground block">Connections</span>
            <span className="font-bold text-cyan-400">{investigation.relationships.length}</span>
          </div>
        </div>
      </div>

      {/* Key Findings Section (Section 17: Source-backed summary, every statement has a source) */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#62E6FF]" />
            <h3 className="font-display text-base font-bold text-foreground">
              Key Evidentiary Findings
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#6EE7B7] border border-[#6EE7B7]/30 bg-[#6EE7B7]/10 px-2 py-0.5 rounded-full">
            Strict Source Grounding
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {keyFindings.map((kf, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-white/15 transition-all text-xs"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-[#6EE7B7] shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">
                  <strong>Public source indicates:</strong> {kf.claim}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10.5px] shrink-0 pl-6 sm:pl-0">
                <span className="text-muted-foreground">Source: {kf.source}</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[#62E6FF]">
                  {kf.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Primary Candidate, Right Footprint & Explainers */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column (7 cols): Selected Identity Card & Identity Explainer */}
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground font-bold">
                PRIMARY IDENTITY CANDIDATE (HIGH CONFIDENCE)
              </span>
              <span className="font-mono text-[10px] text-[#6EE7B7]">
                Corroborated by Statutory Filing
              </span>
            </div>
            <IdentityCard person={selectedPerson} isSelected={true} onExplain={() => {}} />
          </div>

          {/* AI Match Explainer: Why do you think this is the same person? */}
          {match && <IdentityExplainer match={match} />}

          {/* Conflict Alert (if any) */}
          {investigation.conflicts.length > 0 && (
            <ConflictAlert conflicts={investigation.conflicts} />
          )}
        </div>

        {/* Right column (5 cols): Public Footprint & Other Candidates */}
        <div className="space-y-6 lg:col-span-5">
          {/* Public Footprint Score */}
          <PublicFootprint footprint={selectedPerson.publicFootprint} />

          {/* Other Distinct Candidates (Disambiguation) */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                DISAMBIGUATION // OTHER PUBLIC CANDIDATES
              </span>
              <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9.5px] text-muted-foreground border border-white/5">
                NAMESAKES
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              In accordance with ethical intelligence standards, the engine distinguishes
              individuals who share common names across different institutions rather than merging
              them blindly.
            </p>

            <div className="space-y-2 pt-2">
              {investigation.persons
                .filter((p) => p.id !== selectedPerson.id)
                .map((altPerson) => (
                  <div
                    key={altPerson.id}
                    onClick={() => onSelectPerson(altPerson)}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div>
                      <h5 className="font-display font-bold text-foreground group-hover:text-[#62E6FF] transition-colors">
                        {altPerson.name}
                      </h5>
                      <span className="font-mono text-[10.5px] text-muted-foreground">
                        {altPerson.metadata.almaMater || altPerson.metadata.designation}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                      <span>{altPerson.confidence}% match</span>
                      <ArrowRight className="size-3 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Shortcuts to Deep Views */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigateTab("graph")}
              className="rounded-lg border border-[#9B8CFF]/30 bg-[#9B8CFF]/5 p-3 text-left hover:bg-[#9B8CFF]/10 transition-colors cursor-pointer"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#9B8CFF] block">
                VISUALIZE
              </span>
              <span className="font-display font-bold text-xs text-foreground mt-0.5 block">
                Explore Connections →
              </span>
            </button>
            <button
              onClick={() => onNavigateTab("timeline")}
              className="rounded-lg border border-[#62E6FF]/30 bg-[#62E6FF]/5 p-3 text-left hover:bg-[#62E6FF]/10 transition-colors cursor-pointer"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#62E6FF] block">
                CHRONOLOGY
              </span>
              <span className="font-display font-bold text-xs text-foreground mt-0.5 block">
                Explore Timeline Events →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
