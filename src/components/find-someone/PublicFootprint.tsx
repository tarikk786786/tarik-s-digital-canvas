import { UserCheck, Building2, Globe, BookOpen, FileText, Newspaper } from "lucide-react";
import type { PublicFootprint as PublicFootprintType } from "@/lib/find-someone/types";

interface PublicFootprintProps {
  footprint: PublicFootprintType;
}

export function PublicFootprint({ footprint }: PublicFootprintProps) {
  const items = [
    {
      label: "Public Profiles",
      count: footprint.profiles,
      icon: <UserCheck className="size-4 text-[#62E6FF]" />,
      detail: "Verified web handles & directory entries",
    },
    {
      label: "Organizations",
      count: footprint.organizations,
      icon: <Building2 className="size-4 text-[#9B8CFF]" />,
      detail: "Registered corporate / academic entities",
    },
    {
      label: "Public Websites",
      count: footprint.websites,
      icon: <Globe className="size-4 text-[#6EE7B7]" />,
      detail: "Authoritative digital domains & portals",
    },
    {
      label: "Publications",
      count: footprint.publications,
      icon: <BookOpen className="size-4 text-cyan-400" />,
      detail: "Scientific papers, whitepapers, keynote transcripts",
    },
    {
      label: "Public Documents",
      count: footprint.documents,
      icon: <FileText className="size-4 text-amber-400" />,
      detail: "Statutory filings, catalogs, gazette mentions",
    },
    {
      label: "News Mentions",
      count: footprint.newsMentions,
      icon: <Newspaper className="size-4 text-pink-400" />,
      detail: "Editorial reports, regional press, interviews",
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#62E6FF] font-bold">
            NON-INVASIVE METRICS
          </span>
          <h4 className="font-display text-base font-bold text-foreground">
            Verified Public Footprint
          </h4>
        </div>
        <span className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground border border-white/10">
          Corroborated Artifacts
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="group rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:border-white/15 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="p-1.5 rounded-md bg-white/5">{item.icon}</span>
              <span className="font-display text-xl font-extrabold text-foreground group-hover:text-[#62E6FF] transition-colors">
                {item.count}
              </span>
            </div>
            <div className="font-mono text-[11px] font-semibold text-foreground">{item.label}</div>
            <div
              className="font-sans text-[10px] text-muted-foreground truncate"
              title={item.detail}
            >
              {item.detail}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 font-mono text-[10px] text-muted-foreground text-center border-t border-white/5 pt-3">
        Privacy Guarantee: Footprint strictly reflects published professional, statutory, and
        academic presence. Zero private indexing.
      </p>
    </div>
  );
}
