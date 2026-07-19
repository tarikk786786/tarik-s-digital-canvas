import { useEffect, useRef, useState } from "react";

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

      <div className="relative z-10 mx-auto w-full max-w-[1600px] flex-1 flex flex-col justify-center">
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
          className="max-w-5xl text-5xl font-medium leading-[0.92] tracking-tighter text-balance md:text-7xl lg:text-8xl animate-fade-up"
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

        <div
          className="mt-12 flex flex-wrap items-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#work"
            className="group relative overflow-hidden border border-accent bg-accent px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Inspect the work</span>
          </a>
          <a
            href="#contact"
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

      {/* Bottom meta strip */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-4">
          <MetaItem label="Location" value="Remote / Global" />
          <MetaItem label="Currently" value="Founding at Nexus Labs" />
          <MetaItem label="Focus" value="AI + Forensics" />
          <MetaItem label="Timezone" value="UTC+06 · +/− 3h flex" />
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
