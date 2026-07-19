import { useEffect, useRef, useState } from "react";

/**
 * Cinematic 3-act opener: particles → constellation → wordmark → dissolve.
 * Runs once per session, respects prefers-reduced-motion.
 */
export function CinematicIntro() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("intro-seen");
    if (reduced || seen) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("intro-seen", "1");

    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1900);
    const t3 = setTimeout(() => setPhase(3), 3200);
    const t4 = setTimeout(() => setGone(true), 4200);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (gone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const cx = () => W() / 2;
    const cy = () => H() / 2;

    // 120 particles converging toward a ring/constellation
    const N = 120;
    const parts = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      const r = Math.min(W(), H()) * 0.22;
      return {
        x: cx() + (Math.random() - 0.5) * W(),
        y: cy() + (Math.random() - 0.5) * H(),
        tx: cx() + Math.cos(a) * r,
        ty: cy() + Math.sin(a) * r,
      };
    });

    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const t = Math.min((now - start) / 2600, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      ctx.clearRect(0, 0, W(), H());

      // draw links when converged
      if (ease > 0.55) {
        ctx.strokeStyle = `rgba(120,220,240,${(ease - 0.55) * 0.5})`;
        ctx.lineWidth = 0.4;
        for (let i = 0; i < N; i++) {
          const p = parts[i];
          const q = parts[(i + 1) % N];
          const px = p.x + (p.tx - p.x) * ease;
          const py = p.y + (p.ty - p.y) * ease;
          const qx = q.x + (q.tx - q.x) * ease;
          const qy = q.y + (q.ty - q.y) * ease;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(qx, qy);
          ctx.stroke();
        }
      }

      for (const p of parts) {
        const x = p.x + (p.tx - p.x) * ease;
        const y = p.y + (p.ty - p.y) * ease;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
        glow.addColorStop(0, `rgba(180,240,255,${0.9})`);
        glow.addColorStop(1, "rgba(180,240,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background transition-opacity duration-700 ${
        phase === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className={`font-mono text-[10px] tracking-[0.4em] uppercase text-accent/70 transition-all duration-700 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Initializing · Protocol 001
        </div>
        <div
          className={`mt-6 font-[var(--font-display)] text-4xl md:text-6xl font-light tracking-tight text-foreground transition-all duration-1000 ${
            phase >= 2 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-95"
          }`}
        >
          Tarik <span className="italic text-accent">Islam</span>
        </div>
        <div
          className={`mt-4 font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground transition-opacity duration-700 ${
            phase >= 2 ? "opacity-70" : "opacity-0"
          }`}
        >
          Forensics · Cyber · AI · Founder
        </div>
      </div>
    </div>
  );
}
