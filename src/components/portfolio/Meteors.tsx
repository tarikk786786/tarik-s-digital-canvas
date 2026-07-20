import { useEffect, useState } from "react";

/**
 * Diagonal meteor shower rendered with pure CSS. Cheap, GPU-friendly.
 * Random values are generated only on the client after mount so SSR
 * and hydration DOM match exactly.
 */
export function Meteors({ count = 14 }: { count?: number }) {
  const [meteors, setMeteors] = useState<
    Array<{ left: number; top: number; delay: number; duration: number; length: number }>
  >([]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * -40 - 5,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 6,
        length: 60 + Math.random() * 120,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="absolute h-px rotate-[215deg] rounded-full bg-gradient-to-r from-accent via-accent/80 to-transparent shadow-[0_0_8px_1px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.length}px`,
            animation: `meteor ${m.duration}s linear ${m.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
