import {
  User,
  Building2,
  MapPin,
  Globe,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Award,
} from "lucide-react";
import { ConfidenceBar } from "./ConfidenceBar";
import type { PersonEntity } from "@/lib/find-someone/types";

interface IdentityCardProps {
  person: PersonEntity;
  isSelected?: boolean;
  onSelect?: () => void;
  onExplain?: () => void;
}

export function IdentityCard({
  person,
  isSelected = false,
  onSelect,
  onExplain,
}: IdentityCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-xl border p-5 transition-all duration-300 backdrop-blur-xl ${
        isSelected
          ? "border-[#62E6FF] bg-[#62E6FF]/[0.04] shadow-[0_0_30px_rgba(98,230,255,0.15)]"
          : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      {/* Header with Photo & Verification Status */}
      <div className="flex items-start gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#0A0D12]">
          {person.profileImage ? (
            <img
              src={person.profileImage}
              alt={person.name}
              className="size-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <User className="size-6 text-[#62E6FF]" />
            </div>
          )}
          <span className="absolute bottom-1 right-1 size-2 rounded-full bg-[#6EE7B7] shadow-[0_0_6px_#6EE7B7]" />
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-base font-bold text-foreground truncate group-hover:text-[#62E6FF] transition-colors">
              {person.name}
            </h3>
            <span className="rounded bg-[#62E6FF]/10 px-2 py-0.5 font-mono text-[9.5px] font-bold text-[#62E6FF] border border-[#62E6FF]/30 shrink-0">
              {person.confidence}% MATCH
            </span>
          </div>

          {person.metadata.designation && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {person.metadata.designation}
            </p>
          )}

          {person.metadata.almaMater && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <Award className="size-3 text-[#9B8CFF] shrink-0" />
              <span className="truncate">{person.metadata.almaMater}</span>
            </div>
          )}
        </div>
      </div>

      {/* Aliases & Indic representation */}
      {person.aliases && person.aliases.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {person.aliases.map((alias) => (
            <span
              key={alias}
              className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-white/5"
            >
              {alias}
            </span>
          ))}
        </div>
      )}

      {/* Primary locations */}
      {person.locations && person.locations.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <MapPin className="size-3 text-[#6EE7B7] shrink-0" />
          <span className="truncate">{person.locations.join(" · ")}</span>
        </div>
      )}

      {/* Confidence Bar */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <ConfidenceBar confidence={person.confidence} status={person.status} />
      </div>

      {/* Public Profiles Grid */}
      <div className="mt-4 space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
          Discovered Public Profiles ({person.publicProfiles.length})
        </span>
        <div className="flex flex-wrap gap-1.5">
          {person.publicProfiles.map((prof) => (
            <a
              key={prof.platform}
              href={prof.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:border-[#62E6FF]/40 hover:text-white transition-all"
            >
              <span>{prof.platform}</span>
              <span className="text-[9.5px] text-[#6EE7B7]">{prof.confidence}%</span>
              <ExternalLink className="size-2.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Footprint summary & Actions */}
      <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono">
        <span className="text-muted-foreground">{person.sources.length} Corroborating Sources</span>

        {onExplain && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExplain();
            }}
            className="text-[#9B8CFF] hover:text-white hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Explain Match</span>
          </button>
        )}
      </div>
    </div>
  );
}
