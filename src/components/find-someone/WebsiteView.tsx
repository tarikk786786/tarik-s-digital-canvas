import {
  Globe,
  Layers,
  ShieldCheck,
  FileText,
  ExternalLink,
  Link2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { WebsiteIntelligence } from "@/lib/find-someone/types";

interface WebsiteViewProps {
  website: WebsiteIntelligence;
}

export function WebsiteView({ website }: WebsiteViewProps) {
  return (
    <div className="space-y-6">
      {/* Website Header Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-[#62E6FF]/40 bg-[#0E121A] text-[#62E6FF] shadow-[0_0_24px_rgba(98,230,255,0.25)]">
              <Globe className="size-7" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF] font-bold">
                WEBSITE & DOMAIN INTELLIGENCE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                {website.domain}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                {website.description}
              </p>
            </div>
          </div>

          <a
            href={`https://${website.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#62E6FF] px-4 py-2 font-mono text-xs font-bold text-[#050608] hover:bg-[#62E6FF]/90 transition-all shadow-[0_0_16px_rgba(98,230,255,0.3)] shrink-0"
          >
            <span>Visit Domain</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="pt-3 border-t border-white/5 font-mono text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
          <span>
            Organization Context:{" "}
            <strong className="text-foreground">{website.organizationContext}</strong>
          </span>
          <span className="text-[#6EE7B7]">{website.newsMentions} Public Mentions</span>
        </div>
      </div>

      {/* Main Grid: Tech Stack, Pages, Security Observations */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): Tech Stack Profile & Public Pages */}
        <div className="space-y-6 lg:col-span-7">
          {/* Technology Profile */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-[#9B8CFF]" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Observed Public Technology Profile
              </h4>
            </div>

            <div className="space-y-3">
              {website.technologyProfile.map((techGroup) => (
                <div key={techGroup.category} className="space-y-1.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                    {techGroup.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {techGroup.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-white/5 px-2.5 py-1 font-mono text-[11px] text-foreground border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Public Pages Index */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <h4 className="font-display text-sm font-bold text-foreground">
              Index of Publicly Exposed Endpoints ({website.publicPages.length})
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {website.publicPages.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
                >
                  <span className="text-foreground font-semibold">{page.path}</span>
                  <span className="text-muted-foreground truncate max-w-[250px]">{page.title}</span>
                  <span className="rounded bg-[#6EE7B7]/10 px-2 py-0.5 text-[10px] text-[#6EE7B7]">
                    HTTP {page.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Defensive Security Observations & Documents */}
        <div className="space-y-6 lg:col-span-5">
          {/* Security Observations */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#6EE7B7]" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Defensive Security Observations
              </h4>
            </div>

            <div className="space-y-2.5">
              {website.securityObservations.map((obs) => (
                <div
                  key={obs.title}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-3 space-y-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[#6EE7B7]" />
                    <span className="font-display font-semibold text-foreground">{obs.title}</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">{obs.detail}</p>
                </div>
              ))}
            </div>

            <p className="font-mono text-[10px] text-muted-foreground pt-2 border-t border-white/5">
              Note: Observations are purely passive and strictly analyze public HTTP headers and DNS
              configurations.
            </p>
          </div>

          {/* Related Domains & Outbound Connections */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <Link2 className="size-4 text-[#62E6FF]" />
              <h4 className="font-display text-sm font-bold text-foreground">
                Public Outbound & Related Domains
              </h4>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {website.relatedDomains.map((rel) => (
                <div
                  key={rel}
                  className="flex justify-between text-muted-foreground bg-white/5 p-2 rounded"
                >
                  <span>Related Alias</span>
                  <span className="text-[#62E6FF]">{rel}</span>
                </div>
              ))}
              {website.publicOutboundLinks.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-muted-foreground hover:text-white bg-white/5 p-2 rounded transition-colors"
                >
                  <span className="truncate">{link}</span>
                  <ExternalLink className="size-3 shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
