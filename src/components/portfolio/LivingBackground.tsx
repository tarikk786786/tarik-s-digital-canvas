import { useEffect, useRef } from "react";

/**
 * Fixed atmospheric layer: drifting aurora orbs + subtle particle field
 * that responds to mouse parallax. Sits behind all content (z-0).
 */
export function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const orbA = useRef<HTMLDivElement | null>(null);
  const orbB = useRef<HTMLDivElement | null>(null);
  const orbC = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mx = 0.5;
    let my = 0.5;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // stars
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      s: Math.random() * 0.5 + 0.2,
      d: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const tick = (now: number) => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const st of stars) {
          const twinkle = 0.5 + Math.sin(now * 0.001 * st.s + st.d) * 0.5;
          const px = st.x + (mx - 0.5) * 20 * st.s;
          const py = st.y + (my - 0.5) * 20 * st.s;
          ctx.fillStyle = `rgba(200,240,255,${twinkle * 0.55})`;
          ctx.beginPath();
          ctx.arc(px, py, st.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // parallax orbs
      if (orbA.current)
        orbA.current.style.transform = `translate3d(${(mx - 0.5) * -40}px, ${(my - 0.5) * -30}px, 0)`;
      if (orbB.current)
        orbB.current.style.transform = `translate3d(${(mx - 0.5) * 60}px, ${(my - 0.5) * 40}px, 0)`;
      if (orbC.current)
        orbC.current.style.transform = `translate3d(${(mx - 0.5) * -25}px, ${(my - 0.5) * 55}px, 0)`;

      if (!reduced) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Aurora orbs */}
      <div
        ref={orbA}
        className="absolute -top-40 -left-40 size-[38rem] rounded-full blur-3xl opacity-40 transition-transform duration-500 ease-out"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 45%, transparent), transparent 65%)",
        }}
      />
      <div
        ref={orbB}
        className="absolute top-1/3 -right-40 size-[42rem] rounded-full blur-3xl opacity-30 transition-transform duration-500 ease-out"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #7ad0ff 55%, transparent), transparent 65%)",
        }}
      />
      <div
        ref={orbC}
        className="absolute bottom-[-12rem] left-1/3 size-[36rem] rounded-full blur-3xl opacity-25 transition-transform duration-500 ease-out"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #a78bfa 55%, transparent), transparent 65%)",
        }}
      />
      {/* Star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Vignette + grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, transparent 40%, var(--background) 90%)",
        }}
      />
    </div>
  );
}
