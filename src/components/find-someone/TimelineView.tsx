import { Calendar, FileText, Building2, Award, BookOpen, ExternalLink, Flag } from "lucide-react";
import type { TimelineEvent, Source } from "@/lib/find-someone/types";

interface TimelineViewProps {
  events: TimelineEvent[];
  sources: Source[];
}

export function TimelineView({ events, sources }: TimelineViewProps) {
  const getSourceById = (id: string) => sources.find((s) => s.id === id);

  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "founding":
        return <Building2 className="size-3.5 text-[#62E6FF]" />;
      case "publication":
        return <BookOpen className="size-3.5 text-[#6EE7B7]" />;
      case "affiliation":
        return <Award className="size-3.5 text-[#9B8CFF]" />;
      default:
        return <Flag className="size-3.5 text-amber-400" />;
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:bottom-0 before:left-2.5 sm:before:left-3.5 before:top-2 before:w-px before:bg-gradient-to-b before:from-[#62E6FF] before:via-white/20 before:to-transparent">
      {sortedEvents.map((evt) => {
        const source = getSourceById(evt.sourceId);

        return (
          <div key={evt.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 grid size-5 sm:size-7 place-items-center rounded-full border border-white/20 bg-[#0A0D12] text-foreground shadow-[0_0_12px_rgba(98,230,255,0.3)] group-hover:border-[#62E6FF] transition-colors">
              {getEventIcon(evt.type)}
            </div>

            {/* Event content card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4.5 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.04] transition-all space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#62E6FF]">
                  <Calendar className="size-3" />
                  {evt.date}
                </span>

                <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground border border-white/10">
                  {evt.type}
                </span>
              </div>

              <h4 className="font-display text-sm sm:text-base font-bold text-foreground">
                {evt.title}
              </h4>

              <p className="text-xs text-muted-foreground leading-relaxed">{evt.description}</p>

              {/* Source verification footer */}
              {source && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/5 text-[10.5px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1 text-foreground/80">
                    <FileText className="size-3 text-[#6EE7B7]" />
                    <span className="truncate max-w-[300px]">{source.name}</span>
                  </span>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#62E6FF] hover:underline"
                  >
                    <span>Inspect Proof</span>
                    <ExternalLink className="size-2.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
