import { useEffect, useRef } from "react";

/**
 * Localized twinkle particle field. Meant to be dropped inside a
 * `relative` parent as a subtle atmospheric layer.
 */
export function Sparkles({
  density = 40,
  color = "rgba(200,240,255,",
}: {
  density?: number;
  color?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement!;
    const resize = () => {
      const r = parent.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const parts = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.3,
      s: Math.random() * 0.5 + 0.3,
      d: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const tick = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const t = 0.4 + Math.sin(now * 0.002 * p.s + p.d) * 0.6;
        ctx.fillStyle = `${color}${Math.max(0, t) * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    />
  );
}
