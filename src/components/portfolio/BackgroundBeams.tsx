/**
 * Ambient animated light beams — SVG paths with dash-flow, used behind
 * feature sections to add depth without any WebGL cost.
 */
export function BackgroundBeams() {
  const paths = [
    "M-100 200 Q 300 100 700 300 T 1500 200",
    "M-100 400 Q 400 250 800 500 T 1500 400",
    "M-100 620 Q 300 500 700 700 T 1500 620",
    "M-100 80  Q 500 -20 900 180 T 1500 60",
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1400 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beam" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#beam)"
            strokeWidth="1"
            strokeDasharray="4 260"
            style={{
              animation: `beam-flow ${9 + i * 3}s linear ${i * 0.8}s infinite`,
              opacity: 0.6,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
