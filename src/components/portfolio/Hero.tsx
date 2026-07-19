import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/tarik-portrait-cutout.png";
import { ArrivalGreeting } from "@/components/portfolio/ArrivalGreeting";

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
            <a
              href="#work"
              data-cursor="view"
              className="group relative overflow-hidden border border-accent bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Inspect the work</span>
            </a>
            <a
              href="#contact"
              data-cursor="contact"
              className="group flex items-center gap-3 border border-border bg-transparent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Initialize contact
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
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

function Portrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
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
  }, []);

  // Radial + linear feather so portrait dissolves into the scene
  const feather =
    "radial-gradient(120% 90% at 55% 40%, #000 40%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.35) 78%, transparent 92%)";

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[520px] w-full max-w-[640px] animate-fade-up md:h-[640px]"
      style={{ animationDelay: "0.5s" }}
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
            "drop-shadow(0 30px 60px color-mix(in oklab, var(--accent) 30%, transparent)) contrast(1.05) saturate(1.05)",
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
    </div>
  );
}


