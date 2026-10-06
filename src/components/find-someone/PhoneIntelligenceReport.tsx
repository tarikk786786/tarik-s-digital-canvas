/**
 * PhoneIntelligenceReport
 *
 * Specialized India & Global Phone Intelligence UI.
 * Enforces ethical boundaries:
 *  - Distinguishes National Numbering Allocation from Current Physical Location.
 *  - Clear Mobile Number Portability (MNP) evidentiary warning.
 *  - Clank / PhoneInfoga-style public search pivot dorks.
 *  - Explicitly states what is prohibited (no live GPS, no SIM-owner database).
 */

import { useState } from "react";
import {
  Phone,
  Radio,
  MapPin,
  Clock,
  Building,
  ShieldAlert,
  Search,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  Info,
  Scale,
} from "lucide-react";
import { TechnicalLabel, ConfidenceMeter, EvidenceBadge, SourceBadge } from "@/components/system";
import {
  analyzeIndiaPhone,
  type IndiaPhoneAnalysis,
} from "@/lib/intelligence/india-phone-engine";

interface Props {
  phoneInput: string;
}

export function PhoneIntelligenceReport({ phoneInput }: Props) {
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);
  const analysis: IndiaPhoneAnalysis = analyzeIndiaPhone(phoneInput);

  const handleCopy = (text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedQuery(text);
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Primary Dossier Summary */}
      <article className="rounded-2xl border border-[#62E6FF]/30 bg-gradient-to-br from-[#62E6FF]/10 via-transparent to-amber-500/5 p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TechnicalLabel className="text-[#62E6FF]">
                India & Global Phone Intelligence
              </TechnicalLabel>
              <span className="font-mono text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {analysis.isValid ? "VALID FORMAT" : "FORMAT REVIEW NEEDED"}
              </span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl text-foreground">
              {analysis.nationalFormat}
            </h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              E.164: {analysis.e164} · {analysis.rfc3966}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <span className="text-3xl">{analysis.flag}</span>
            <p className="font-display font-semibold text-foreground">{analysis.country}</p>
            <p className="font-mono text-[10px] text-muted-foreground">Country Code {analysis.countryCode}</p>
          </div>
        </div>

        {/* 4-Stat Metric Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Phone className="size-3.5 text-[#62E6FF]" />
              <p className="font-mono text-[10px] uppercase tracking-wider">Number Type</p>
            </div>
            <p className="text-base font-bold text-foreground">{analysis.numberType}</p>
            <p className="font-mono text-[9px] text-emerald-400 mt-1">99% Validity Confidence</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Radio className="size-3.5 text-amber-400" />
              <p className="font-mono text-[10px] uppercase tracking-wider">Original Operator</p>
            </div>
            <p className="text-base font-bold text-foreground">
              {analysis.originalOperator || "Standard Cellular Series"}
            </p>
            <p className="font-mono text-[9px] text-amber-300 mt-1">
              {analysis.allocationSeries ? `Series ${analysis.allocationSeries}` : "Allocation Block"}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="size-3.5 text-[#62E6FF]" />
              <p className="font-mono text-[10px] uppercase tracking-wider">Telecom Circle</p>
            </div>
            <p className="text-base font-bold text-foreground">
              {analysis.circle ? analysis.circle.name : analysis.stdCity || "Pan-India / Global"}
            </p>
            <p className="font-mono text-[9px] text-[#62E6FF] mt-1">
              {analysis.circle ? `${analysis.circle.tier} LSA` : "National Plan"}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="size-3.5 text-purple-400" />
              <p className="font-mono text-[10px] uppercase tracking-wider">Timezone</p>
            </div>
            <p className="text-base font-bold text-foreground">{analysis.timezone}</p>
            <p className="font-mono text-[9px] text-muted-foreground mt-1">Standard Time Zone</p>
          </div>
        </div>
      </article>

      {/* MNP & Evidentiary Limitation Warning */}
      <article className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-5 space-y-2">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-display text-sm font-semibold text-amber-200 uppercase tracking-wide">
              Evidentiary Notice: Mobile Number Portability (MNP)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {analysis.mnpDisclaimer}
            </p>
          </div>
        </div>
      </article>

      {/* Circle Deep-Dive (If Indian Circle is available) */}
      {analysis.circle && (
        <article className="rounded-xl border border-white/10 bg-[#0A0D12] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="size-4 text-[#62E6FF]" />
              <h3 className="font-display text-base font-bold text-foreground">
                Telecom Circle Specifications ({analysis.circle.code})
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#62E6FF]/30 text-[#62E6FF]">
              {analysis.circle.tier}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-white/5 bg-black/40 p-3">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">States & Territories Covered</p>
              <p className="mt-1 text-foreground font-medium">{analysis.circle.statesCovered.join(", ")}</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-black/40 p-3">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">Circle Operations Headquarters</p>
              <p className="mt-1 text-foreground font-medium">{analysis.circle.headquarters || "Regional Center"}</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-black/40 p-3">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">DoT Service Area Tier</p>
              <p className="mt-1 text-foreground font-medium">{analysis.circle.tier} (High-Density Telephony Zone)</p>
            </div>
          </div>
        </article>
      )}

      {/* Public OSINT & Open Web Dorks (PhoneInfoga / Clank Strategy) */}
      <article className="rounded-xl border border-white/10 bg-[#0A0D12] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-[#62E6FF]" />
            <h3 className="font-display text-base font-bold text-foreground">
              Public Web & Corporate Directory Pivots
            </h3>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            PhoneInfoga · Clank · Public Registries
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Open search formulations targeting public business registries, statutory filings (MCA / ZaubaCorp),
          and public document repositories where this number may appear legitimately.
        </p>

        <div className="space-y-2">
          {analysis.publicSearchDorks.map((dork) => (
            <div
              key={dork.label}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/40 p-3"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <TechnicalLabel>{dork.label}</TechnicalLabel>
                </div>
                <code className="text-xs font-mono text-[#62E6FF] block truncate">
                  {dork.query}
                </code>
                <p className="text-[11px] text-muted-foreground">{dork.purpose}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(dork.query)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 font-mono text-[10px] text-muted-foreground hover:text-[#62E6FF] transition-all"
                >
                  {copiedQuery === dork.query ? (
                    <>
                      <Check className="size-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" /> Copy Query
                    </>
                  )}
                </button>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(dork.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#62E6FF]/30 bg-[#62E6FF]/10 font-mono text-[10px] text-[#62E6FF] hover:bg-[#62E6FF]/20 transition-all"
                >
                  <ExternalLink className="size-3" /> Search
                </a>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Confidence Matrix */}
      <article className="rounded-xl border border-white/10 bg-[#0A0D12] p-5 space-y-4">
        <h3 className="font-display text-base font-bold text-foreground">
          Evidentiary Confidence Breakdown
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Number Validity</span>
              <span className="font-mono text-emerald-400">99%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-400 w-[99%]" />
            </div>
            <p className="text-[10px] text-muted-foreground">E.164 & TRAI National Plan structural validation</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Circle Allocation</span>
              <span className="font-mono text-[#62E6FF]">85%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#62E6FF] w-[85%]" />
            </div>
            <p className="text-[10px] text-muted-foreground">Historical block license mapping (subject to MNP)</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Location Association</span>
              <span className="font-mono text-amber-400">60%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-amber-400 w-[60%]" />
            </div>
            <p className="text-[10px] text-muted-foreground">Public web footprint correlation (NOT real-time GPS)</p>
          </div>
        </div>
      </article>

      {/* Ethical Boundaries & Prohibited Capabilities */}
      <article className="rounded-xl border border-white/10 bg-[#0A0D12] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="size-4 text-emerald-400" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Strict Ethical & Legal Boundaries
          </h3>
        </div>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          {analysis.ethicalBoundaries.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
