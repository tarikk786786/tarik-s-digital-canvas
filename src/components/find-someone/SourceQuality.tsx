import { Star, ShieldCheck, FileCheck, Landmark, Globe } from "lucide-react";
import type { SourceQualityTier } from "@/lib/find-someone/types";
import { getSourceQualityLabel, getSourceStars } from "@/lib/find-someone/scoring";

interface SourceQualityProps {
  tier: SourceQualityTier;
  compact?: boolean;
}

export function SourceQuality({ tier, compact = false }: SourceQualityProps) {
  const stars = getSourceStars(tier);
  const label = getSourceQualityLabel(tier);

  const getTierIcon = () => {
    switch (tier) {
      case "official":
      case "government":
      case "regulatory":
        return <Landmark className="size-3 text-[#62E6FF]" />;
      case "primary":
        return <FileCheck className="size-3 text-[#6EE7B7]" />;
      default:
        return <Globe className="size-3 text-muted-foreground" />;
    }
  };

  const getBadgeColor = () => {
    if (stars === 5) return "border-[#62E6FF]/30 bg-[#62E6FF]/10 text-[#62E6FF]";
    if (stars === 4) return "border-[#6EE7B7]/30 bg-[#6EE7B7]/10 text-[#6EE7B7]";
    if (stars === 3) return "border-yellow-400/30 bg-yellow-400/10 text-yellow-400";
    return "border-white/10 bg-white/5 text-muted-foreground";
  };

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] border ${getBadgeColor()}`}
      >
        {getTierIcon()}
        <span>{stars}/5 ★</span>
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] border ${getBadgeColor()}`}
      >
        {getTierIcon()}
        <span>{label}</span>
      </span>
      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3 ${i < stars ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
