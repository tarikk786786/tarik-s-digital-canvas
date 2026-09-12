import {
  Building2,
  Globe,
  FileText,
  Newspaper,
  MapPin,
  Users,
  GitFork,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import type { CompanyIntelligence } from "@/lib/find-someone/types";

interface CompanyViewProps {
  company: CompanyIntelligence;
}

export function CompanyView({ company }: CompanyViewProps) {
  return (
    <div className="space-y-6">
      {/* Company Header Glass Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-[#9B8CFF]/40 bg-[#0E121A] text-[#9B8CFF] shadow-[0_0_24px_rgba(155,140,255,0.25)]">
              <Building2 className="size-7" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#9B8CFF] font-bold">
                PUBLIC COMPANY INTELLIGENCE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {company.name}
              </h2>
              {company.legalName && (
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  Legal Entity: {company.legalName}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-[#62E6FF]/40 bg-[#62E6FF]/10 px-3.5 py-2 font-mono text-xs text-[#62E6FF] hover:bg-[#62E6FF]/20 transition-all shadow-[0_0_12px_rgba(98,230,255,0.2)]"
              >
                <Globe className="size-3.5" />
                <span>{company.domain}</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>

        {/* Statutory Metadata Strip */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-white/5 font-mono text-xs text-muted-foreground">
          {company.registrationNumber && (
            <div>
              <span className="text-[10px] uppercase block text-muted-foreground/60">
                Statutory ID (CIN)
              </span>
              <span className="text-foreground font-semibold">{company.registrationNumber}</span>
            </div>
          )}
          {company.incorporationDate && (
            <div>
              <span className="text-[10px] uppercase block text-muted-foreground/60">
                Incorporation Date
              </span>
              <span className="text-foreground font-semibold">{company.incorporationDate}</span>
            </div>
          )}
          {company.industry && (
            <div>
              <span className="text-[10px] uppercase block text-muted-foreground/60">
                Industry Classification
              </span>
              <span className="text-foreground font-semibold">{company.industry}</span>
            </div>
          )}
          {company.headquarters && (
            <div>
              <span className="text-[10px] uppercase block text-muted-foreground/60">
                Registered HQ
              </span>
              <span className="text-foreground font-semibold">{company.headquarters}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Leadership, Documents, Products */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): Public Leadership & Products */}
        <div className="space-y-6 lg:col-span-7">
          {/* Public Leadership */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-[#62E6FF]" />
                <h4 className="font-display text-sm font-bold text-foreground">
                  Public Leadership & Key Personnel
                </h4>
              </div>
              <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9.5px] text-muted-foreground border border-white/5">
                Statutory Filings
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {company.publicLeadership.map((leader) => (
                <div
                  key={leader.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-white/15 transition-all"
                >
                  <div>
                    <h5 className="font-display font-bold text-sm text-foreground">
                      {leader.name}
                    </h5>
                    <p className="font-mono text-xs text-muted-foreground">{leader.role}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10.5px]">
                    <span className="text-[#6EE7B7]">{leader.confidence}% verified</span>
                    <span className="text-muted-foreground text-[10px]">({leader.source})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products & Capabilities */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <h4 className="font-display text-sm font-bold text-foreground">
              Identified Public Systems & Capabilities
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {company.products.map((prod) => (
                <div
                  key={prod}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 font-mono text-xs text-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-[#62E6FF] shrink-0" />
                  <span>{prod}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Public Documents & News */}
        <div className="space-y-6 lg:col-span-5">
          {/* Public Documents */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-[#6EE7B7]" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Public Statutory Documents ({company.publicDocuments.length})
              </h4>
            </div>

            <div className="space-y-2">
              {company.publicDocuments.map((doc) => (
                <a
                  key={doc.title}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-[#6EE7B7]/40 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-semibold text-foreground group-hover:text-[#6EE7B7] transition-colors">
                      {doc.title}
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-1">
                    <span>{doc.type}</span>
                    <span>{doc.date}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* News Highlights */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <Newspaper className="size-4 text-amber-400" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Public Media Highlights
              </h4>
            </div>

            <div className="space-y-2">
              {company.newsHighlights.map((news) => (
                <div
                  key={news.title}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs space-y-1"
                >
                  <h5 className="font-medium text-foreground leading-snug">{news.title}</h5>
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>{news.publisher}</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
