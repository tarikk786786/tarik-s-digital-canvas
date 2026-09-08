import Lenis from "lenis";

/**
 * Initializes buttery-smooth inertial momentum scrolling via Lenis.
 * Respects prefers-reduced-motion and ensures 60 FPS performance.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};
  
  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return () => {};

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  let rafId: number;
  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
  };
}
