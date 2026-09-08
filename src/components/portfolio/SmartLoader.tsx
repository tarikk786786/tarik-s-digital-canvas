import { useState, useEffect } from "react";
import { Terminal, Check, ArrowRight } from "lucide-react";

interface SmartLoaderProps {
  onComplete?: () => void;
}

const STAGES = [
  "Loading experience",
  "Initializing 3D engine",
  "Loading verified projects",
  "Connecting intelligence",
  "Optimizing experience",
];

export function SmartLoader({ onComplete }: SmartLoaderProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user already loaded this session
    const hasLoaded = sessionStorage.getItem("tarik_os_loaded") === "true";
    if (hasLoaded) {
      setIsDismissed(true);
      onComplete?.();
      return;
    }

    // Step through the 5 stages
    let current = 0;
    const interval = setInterval(() => {
      if (current < STAGES.length) {
        setCompletedStages((prev) => [...prev, current]);
        current++;
        setActiveStage(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem("tarik_os_loaded", "true");
          setIsDismissed(true);
          onComplete?.();
        }, 250);
      }
    }, 180);

    // Escape key bypass
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearInterval(interval);
        sessionStorage.setItem("tarik_os_loaded", "true");
        setIsDismissed(true);
        onComplete?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050608] text-foreground select-none px-6 transition-opacity duration-500">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="space-y-1.5 border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#62E6FF] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#62E6FF]" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#62E6FF] font-bold">
                TARIK DIGITAL CANVAS
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("tarik_os_loaded", "true");
                setIsDismissed(true);
                onComplete?.();
              }}
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[#62E6FF] transition-colors flex items-center gap-1 cursor-pointer"
            >
              Skip [Esc] <ArrowRight className="size-3" />
            </button>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            BUILDING EXPERIENCE · DEZO ENCLAVE
          </p>
        </div>

        {/* 5-Step Boot Terminal Sequence */}
        <div className="space-y-2.5 font-mono text-xs">
          {STAGES.map((label, idx) => {
            const isDone = completedStages.includes(idx);
            const isCurrent = activeStage === idx;

            return (
              <div
                key={label}
                className={`flex items-center justify-between py-1 transition-opacity duration-200 ${
                  isDone
                    ? "text-foreground opacity-100"
                    : isCurrent
                    ? "text-[#62E6FF] opacity-100 font-bold"
                    : "text-muted-foreground/30 opacity-40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className={`size-3.5 ${isCurrent ? "animate-pulse text-[#62E6FF]" : ""}`} />
                  <span>{label}</span>
                </div>
                <div>
                  {isDone ? (
                    <span className="text-[#62E6FF] flex items-center gap-1">
                      <Check className="size-3.5" />
                      <span>✓</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[#62E6FF] animate-pulse">...</span>
                  ) : (
                    <span className="text-white/10">WAIT</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#62E6FF] via-[#9B8CFF] to-[#62E6FF] transition-all duration-200"
            style={{ width: `${(completedStages.length / STAGES.length) * 100}%` }}
          />
        </div>

        {/* Footer Axiom */}
        <div className="text-center pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            EVIDENCE OVER ASSUMPTIONS · ZERO TRUST BY DEFAULT
          </span>
        </div>
      </div>
    </div>
  );
}
