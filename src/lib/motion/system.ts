/**
 * Centralized motion helpers — always honor prefers-reduced-motion.
 */

import { MOTION_TOKENS } from "@/lib/tokens/motion";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function motionDuration(key: keyof typeof MOTION_TOKENS.duration): number {
  return prefersReducedMotion() ? 0 : MOTION_TOKENS.duration[key];
}

export function motionTransition(
  durationKey: keyof typeof MOTION_TOKENS.duration = "fast",
  easeKey: keyof typeof MOTION_TOKENS.ease = "ui",
) {
  if (prefersReducedMotion()) {
    return { duration: 0 };
  }
  return {
    duration: MOTION_TOKENS.duration[durationKey],
    ease: MOTION_TOKENS.ease[easeKey],
  };
}

/** Framer/motion-compatible variants that collapse when reduced motion is on */
export function fadeUpVariants() {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: motionTransition("medium", "spring"),
    },
  };
}

export function pulseSafeClass(active: boolean): string {
  if (!active || prefersReducedMotion()) return "";
  return "animate-pulse";
}
