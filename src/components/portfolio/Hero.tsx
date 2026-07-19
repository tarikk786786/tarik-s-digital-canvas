import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { ArrivalGreeting } from "@/components/portfolio/ArrivalGreeting";
import { Magnetic } from "@/components/portfolio/Magnetic";

const ROLES = [
  "Forensic Scientist",
  "Cybersecurity Engineer",
  "AI Developer",
  "Full Stack Developer",
  "AI Researcher",
  "Founder",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <header
      id="top"
      className="grain-overlay aurora-bg relative flex min-h-dvh flex-col justify-between overflow-hidden px-6 pb-16 pt-32 md:px-10"
    >
      {/* Massive parallax wordmark */}
      <div
        ref={wordmarkRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-0 select-none opacity-[0.04] transition-transform duration-300 ease-out"
      >
        <h1 className="whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-tighter">
          Tarik Islam
        </h1>
      </div>

      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <span className="absolute left-[12%] top-[28%] size-1 rounded-full bg-accent animate-float-slow" />
        <span
          className="absolute right-[18%] top-[38%] size-0.5 rounded-full bg-accent/60 animate-float-slow"
          style={{ animationDelay: "1.2s" }}
        />
        <span
          className="absolute left-[68%] top-[70%] size-1 rounded-full bg-accent/40 animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <span
          className="absolute left-[38%] top-[80%] size-0.5 rounded-full bg-accent/50 animate-float-slow"
          style={{ animationDelay: "0.6s" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center">
          <div className="mb-8 flex items-center gap-4 animate-fade-up">
            <span className="h-px w-10 bg-accent" />
            <div className="h-[1.5em] overflow-hidden">
              <div
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(-${roleIndex * 1.5}em)` }}
              >
                {ROLES.map((r) => (
                  <p
                    key={r}
                    className="flex h-[1.5em] items-center font-mono text-xs uppercase leading-none tracking-[0.3em] text-accent"
                  >
                    {r}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <h2
            className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-tighter text-balance md:text-7xl lg:text-[5.5rem] animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Building intelligent systems that{" "}
            <span className="italic font-light text-muted-foreground">see</span>{" "}
            the invisible.
          </h2>

          <p
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty animate-fade-up md:text-lg"
            style={{ animationDelay: "0.3s" }}
          >
            I engineer AI, cybersecurity, and full-stack platforms at the
            intersection of forensic precision and product craft — for
            high-stakes environments and the businesses I found.
          </p>
          <ArrivalGreeting />


          <div
            className="mt-12 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            <Magnetic
              href="#work"
              data-cursor="view"
              className="group relative inline-block overflow-hidden border border-accent bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-foreground shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.7)] transition-shadow hover:shadow-[0_20px_60px_-10px_hsl(var(--accent)/0.9)]"
            >
              <span className="relative z-10">Inspect the work</span>
            </Magnetic>
            <Magnetic
              href="#contact"
              data-cursor="contact"
              className="group inline-flex items-center gap-3 border border-border bg-transparent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Initialize contact
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Magnetic>
            <a
              href="/resume.pdf"
              className="ml-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
            >
              Resume ↗
            </a>
          </div>
        </div>


        {/* Portrait — embedded scene figure (ambient on mobile, side-column on desktop) */}
        <div className="pointer-events-none absolute inset-0 -z-[1] opacity-40 lg:hidden">
          <Portrait ambient />
        </div>
        <div className="hidden lg:block">
          <Portrait />
        </div>
      </div>



      {/* Bottom meta strip */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-4">
          <MetaItem label="Location" value="India · Remote-friendly" />
          <MetaItem label="Currently" value="Founding Dezo.in" />
          <MetaItem label="Focus" value="AI · Forensics · Product" />
          <MetaItem label="Timezone" value="UTC+05:30" />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            scroll
          </span>
          <div className="h-16 w-px origin-top bg-accent/50 animate-line-reveal" />
        </div>
      </div>
    </header>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-foreground">{value}</p>
    </div>
  );
}

function Portrait({ ambient = false }: { ambient?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ambient) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (imgRef.current)
        imgRef.current.style.transform = `translate3d(${px * -10}px, ${py * -6}px, 0)`;
      if (fgRef.current)
        fgRef.current.style.transform = `translate3d(${px * 14}px, ${py * 8}px, 0)`;
    };
    const onLeave = () => {
      if (imgRef.current) imgRef.current.style.transform = "translate3d(0,0,0)";
      if (fgRef.current) fgRef.current.style.transform = "translate3d(0,0,0)";
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [ambient]);

  // Radial + linear feather so portrait dissolves into the scene
  const feather =
    "radial-gradient(120% 90% at 55% 40%, #000 45%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0.4) 82%, transparent 95%)";

  return (
    <div
      ref={wrapRef}
      className={
        ambient
          ? "absolute inset-0"
          : "relative mx-auto h-[520px] w-full max-w-[640px] animate-fade-up md:h-[640px]"
      }
      style={ambient ? undefined : { animationDelay: "0.5s" }}

      aria-label="Portrait of Tarik Islam embedded in the scene"
    >
      {/* Deep atmospheric glow — soft rim light behind subject */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 55% at 55% 42%, color-mix(in oklab, var(--accent) 32%, transparent) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-halo"
        style={{
          background:
            "radial-gradient(30% 40% at 65% 30%, color-mix(in oklab, #a48bff 30%, transparent) 0%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* Background fingerprint + neural lines (behind subject) */}
      <svg
        aria-hidden
        viewBox="0 0 600 640"
        className="pointer-events-none absolute inset-0 -z-10 size-full opacity-[0.35]"
      >
        <defs>
          <radialGradient id="fpFade" cx="55%" cy="40%" r="60%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="netFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a48bff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* fingerprint arcs */}
        <g fill="none" stroke="url(#fpFade)" strokeWidth="0.6">
          {Array.from({ length: 14 }).map((_, i) => {
            const r = 60 + i * 22;
            return (
              <ellipse
                key={i}
                cx="330"
                cy="260"
                rx={r}
                ry={r * 1.15}
                strokeDasharray={i % 2 === 0 ? "3 6" : "1 4"}
              />
            );
          })}
        </g>
        {/* neural connections */}
        <g stroke="url(#netFade)" strokeWidth="0.5" fill="none">
          <path d="M40 120 L200 200 L340 140 L500 260" />
          <path d="M80 500 L220 420 L380 480 L540 380" />
          <path d="M60 300 L180 340 L300 300 L460 360" />
        </g>
        <g fill="var(--accent)">
          {[
            [40, 120], [200, 200], [340, 140], [500, 260],
            [80, 500], [220, 420], [380, 480], [540, 380],
            [60, 300], [460, 360],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.6" opacity="0.8" />
          ))}
        </g>
      </svg>

      {/* The subject — cut-out portrait, feathered edges, no frame */}
      <img
        ref={imgRef}
        src={profileImage}
        alt="Tarik Islam"
        loading="eager"
        decoding="async"
        className="absolute inset-0 size-full object-contain object-bottom transition-transform duration-500 ease-out will-change-transform"
        style={{
          WebkitMaskImage: feather,
          maskImage: feather,
          filter:
            "drop-shadow(0 30px 60px color-mix(in oklab, var(--accent) 35%, transparent)) drop-shadow(0 0 24px color-mix(in oklab, var(--accent) 22%, transparent)) contrast(1.08) saturate(1.08)",


        }}
      />

      {/* Soft rim light on subject edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 40% at 35% 30%, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Atmospheric fog — bottom fade into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--background) 55%, transparent) 55%, var(--background) 100%)",
        }}
      />
      {/* Left fade into text column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 0%, transparent 100%)",
        }}
      />

      {/* Foreground neural filaments in front of subject (subtle) */}
      <svg
        ref={fgRef}
        aria-hidden
        viewBox="0 0 600 640"
        className="pointer-events-none absolute inset-0 size-full opacity-40 transition-transform duration-500 ease-out will-change-transform"
      >
        <g fill="none" stroke="var(--accent)" strokeWidth="0.4" opacity="0.7">
          <path d="M120 60 Q 260 180 420 90" strokeDasharray="1 5" />
          <path d="M80 580 Q 260 500 520 600" strokeDasharray="1 5" />
        </g>
        <g fill="var(--accent)">
          <circle cx="120" cy="60" r="1.4" />
          <circle cx="420" cy="90" r="1.4" />
          <circle cx="80" cy="580" r="1.4" />
          <circle cx="520" cy="600" r="1.4" />
        </g>
      </svg>

      {/* Traveling scan line — subtle atmospheric layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-30 mix-blend-screen animate-scan-sweep"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--accent) 45%, transparent) 50%, transparent 100%)",
        }}
      />

      {/* Fine texture / grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Floating particles around subject */}
      <span className="pointer-events-none absolute left-[18%] top-[22%] size-1 rounded-full bg-accent animate-float-slow" />
      <span
        className="pointer-events-none absolute right-[16%] top-[40%] size-0.5 rounded-full bg-accent/70 animate-float-slow"
        style={{ animationDelay: "1s" }}
      />
      <span
        className="pointer-events-none absolute right-[28%] bottom-[24%] size-1 rounded-full bg-accent/50 animate-float-slow"
        style={{ animationDelay: "1.8s" }}
      />

      {/* ============ WORKING-WITH-DATA HUD (only in side-column mode) ============ */}
      {!ambient && <DataHud />}
    </div>
  );
}

/* Live data-stream, metrics, and waveform anchored around the laptop area
   to convey "actively working with data". Pure CSS/SVG, no external libs. */
function DataHud() {
  const codeLines = [
    "> scan.evidence --hash sha256",
    "  ├─ matched  423 / 512  artefacts",
    "  └─ integrity  OK  · chain verified",
    "> model.infer(threat_vector)",
    "  ▓▓▓▓▓▓▓▓▓░  92.4%  confidence",
    "> pipeline.commit  →  vault.sealed",
  ];

  return (
    <>
      {/* Streaming code panel — top-right, near head/laptop line */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[8%] hidden w-[260px] rounded-xl border border-accent/25 bg-background/55 p-3 font-mono text-[10px] leading-[1.55] text-accent/90 shadow-[0_10px_40px_-15px_color-mix(in_oklab,var(--accent)_60%,transparent)] backdrop-blur-md md:block animate-float-slow"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_currentColor]" />
            <span className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              stream · live
            </span>
          </span>
          <span className="text-[9px] text-muted-foreground">tty/0</span>
        </div>
        <div className="space-y-0.5 text-foreground/80">
          {codeLines.map((l, i) => (
            <div
              key={i}
              className="animate-fade-in whitespace-pre"
              style={{ animationDelay: `${0.6 + i * 0.35}s` }}
            >
              {l}
            </div>
          ))}
          <div className="mt-1 flex items-center gap-1 text-accent">
            <span>$</span>
            <span className="inline-block h-3 w-1.5 animate-pulse bg-accent" />
          </div>
        </div>
      </div>

      {/* Live metric chip — right, mid */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[52%] hidden rounded-lg border border-border/60 bg-background/60 px-3 py-2 backdrop-blur-md md:block animate-float-slow"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
          throughput
        </div>
        <div className="font-mono text-sm text-foreground">
          1.42<span className="text-muted-foreground"> gb/s</span>
        </div>
        <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-border/50">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-[#a48bff]" />
        </div>
      </div>

      {/* Data waveform anchored at the laptop */}
      <svg
        aria-hidden
        viewBox="0 0 240 40"
        className="pointer-events-none absolute bottom-[18%] left-[8%] hidden w-[180px] opacity-80 md:block"
      >
        <defs>
          <linearGradient id="waveFade" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="#a48bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="url(#waveFade)">
          {Array.from({ length: 40 }).map((_, i) => {
            const h = 6 + Math.abs(Math.sin(i * 0.9)) * 26;
            return (
              <rect
                key={i}
                x={i * 6}
                y={20 - h / 2}
                width="2.4"
                height={h}
                rx="1"
                style={{
                  animation: `wave-pulse 1.4s ease-in-out ${i * 0.05}s infinite`,
                  transformOrigin: "center",
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Floating data tokens — subtle numeric packets around subject */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {[
          { t: "0xA7·F3", x: "12%", y: "34%", d: "0.2s" },
          { t: "SHA-256", x: "68%", y: "28%", d: "1.1s" },
          { t: "AES-GCM", x: "72%", y: "70%", d: "2.0s" },
          { t: "AI · v4.2", x: "6%",  y: "62%", d: "0.8s" },
        ].map((tok) => (
          <span
            key={tok.t}
            className="absolute rounded-md border border-accent/30 bg-background/50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent/90 backdrop-blur-sm animate-float-slow"
            style={{ left: tok.x, top: tok.y, animationDelay: tok.d }}
          >
            {tok.t}
          </span>
        ))}
      </div>

      {/* Data beams connecting hands → HUD (evokes "sending data") */}
      <svg
        aria-hidden
        viewBox="0 0 600 640"
        className="pointer-events-none absolute inset-0 size-full opacity-60"
      >
        <defs>
          <linearGradient id="beam" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d="M300 470 C 380 420, 460 300, 540 150"
          fill="none"
          stroke="url(#beam)"
          strokeWidth="0.8"
          strokeDasharray="2 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-40"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M300 490 C 240 500, 160 460, 90 380"
          fill="none"
          stroke="url(#beam)"
          strokeWidth="0.8"
          strokeDasharray="2 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="40"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </>
  );
}



