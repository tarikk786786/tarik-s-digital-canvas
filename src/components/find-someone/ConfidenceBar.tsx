import {
  getConfidenceColor,
  getConfidenceLabel,
  getConfidenceStatus,
} from "@/lib/find-someone/scoring";
import type { ConfidenceStatus } from "@/lib/find-someone/types";

interface ConfidenceBarProps {
  confidence: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  status?: ConfidenceStatus;
}

export function ConfidenceBar({
  confidence,
  showLabel = true,
  size = "md",
  status,
}: ConfidenceBarProps) {
  const currentStatus = status || getConfidenceStatus(confidence);
  const color = getConfidenceColor(confidence);
  const label = getConfidenceLabel(currentStatus);

  const heightClass = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }[size];

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
          <span className="font-bold tracking-wider" style={{ color }}>
            {confidence}%
          </span>
        </div>
      )}

      {/* Bar container */}
      <div
        className={`relative w-full overflow-hidden rounded-full bg-white/5 border border-white/10 ${heightClass}`}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, confidence))}%`,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
