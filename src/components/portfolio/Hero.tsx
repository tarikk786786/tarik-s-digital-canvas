import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/tarik-portrait.jpg";
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

        {/* Portrait — case-file dossier */}
        <Portrait />
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[460px] animate-fade-up"
      style={{ animationDelay: "0.6s" }}
    >
      {/* Ambient halo behind portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 -z-10 animate-halo"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--accent) 45%, transparent) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Rotating conic ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-70 animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--accent) 80%, transparent) 60deg, transparent 120deg, transparent 240deg, color-mix(in oklab, #a48bff 70%, transparent) 300deg, transparent 360deg)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
        }}
      />

      {/* Orbital dashed ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 animate-spin-reverse"
      >
        <svg viewBox="0 0 100 100" className="size-full opacity-40">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.25"
            strokeDasharray="0.6 2.2"
          />
        </svg>
      </div>

      {/* Corner brackets */}
      <div aria-hidden className="pointer-events-none absolute -inset-3 z-20">
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((c) => (
          <span key={c} className={`absolute size-5 border-accent ${c}`} />
        ))}
      </div>

      {/* Floating metadata chips */}
      <div className="pointer-events-none absolute -left-8 top-8 z-30 hidden md:block">
        <div className="rotate-[-4deg] border border-accent/50 bg-surface-elevated/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-accent shadow-elevated backdrop-blur">
          Subject · 001
        </div>
      </div>
      <div className="pointer-events-none absolute -right-6 bottom-14 z-30 hidden md:block">
        <div className="rotate-[3deg] border border-border-strong bg-surface-elevated/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground shadow-elevated backdrop-blur">
          Status · Available
        </div>
      </div>
      <div className="pointer-events-none absolute -left-4 bottom-32 z-30 hidden lg:block">
        <div className="rotate-[-2deg] border border-border-strong bg-surface-elevated/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground shadow-elevated backdrop-blur">
          Signal · Strong
        </div>
      </div>

      <div
        ref={ref}
        data-cursor="dossier"
        className="group relative overflow-hidden border border-border-strong bg-surface shadow-[0_40px_120px_-30px_color-mix(in_oklab,var(--accent)_45%,transparent)] transition-transform duration-500 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={profileImage}
          alt="Portrait of Tarik Islam"
          loading="eager"
          decoding="async"
          className="aspect-[4/5] w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />

        {/* Subtle duotone lift (kept low so face reads cleanly) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 55%, color-mix(in oklab, #6a5cff 22%, transparent) 100%)",
          }}
        />

        {/* Very subtle scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 4px)",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Traveling scan line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70 mix-blend-screen animate-scan-sweep"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--accent) 55%, transparent) 50%, transparent 100%)",
          }}
        />

        {/* Data ticks along the left edge */}
        <div className="pointer-events-none absolute inset-y-6 left-2 z-10 flex flex-col justify-between">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`block h-px ${i % 2 === 0 ? "w-3 bg-accent/70" : "w-1.5 bg-foreground/30"}`}
            />
          ))}
        </div>

        {/* Bottom dossier bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-accent/20 bg-background/75 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            <span>File · TI-2026</span>
            <span className="flex items-center gap-1.5 text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
              Live
            </span>
          </div>
          <p className="mt-1.5 font-display text-sm text-foreground">
            Tarik Islam ·{" "}
            <span className="text-muted-foreground">Operator</span>
          </p>
        </div>

        {/* Top left classification tag */}
        <div className="absolute left-3 top-3 z-10 border border-accent/60 bg-background/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.3em] text-accent backdrop-blur">
          Classified · Public
        </div>
      </div>
    </div>
  );
}

