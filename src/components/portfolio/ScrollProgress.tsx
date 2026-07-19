import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Thin gradient rail across the very top of the viewport indicating scroll
 * progress. Uses a single spring-smoothed motion value; opts out under
 * prefers-reduced-motion by rendering nothing.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
    />
  );
}
