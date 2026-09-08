/**
 * The Tarik Design System — Motion & Timing Tokens
 */

export const MOTION_TOKENS = {
  // Canonical Duration Tokens
  duration: {
    instant: 0.10,   // 100ms - Micro feedback / toggle
    micro: 0.18,     // 180ms - Hover states / pill transitions
    fast: 0.28,      // 280ms - Dropdowns / cards / quick tabs
    medium: 0.45,    // 450ms - Section changes / modal reveals
    cinematic: 0.80, // 800ms - Scene camera shifts / page transitions
    hero: 1.40,      // 1400ms - Initial 3D singularity spin-up
  },

  // Easing Functions
  ease: {
    // UI: Snappy, crisp and responsive
    ui: [0.16, 1, 0.3, 1] as const,
    // Physics / Spring-like
    spring: [0.22, 1, 0.36, 1] as const,
    // Cinematic: Graceful acceleration & deceleration
    cinematic: [0.76, 0, 0.24, 1] as const,
    // Data Pulse: Fast rhythmic pulse
    pulse: [0.4, 0, 0.2, 1] as const,
  },

  // Magnetic Button Physics
  magnetic: {
    primaryPull: 0.35,   // max translation ~10px
    secondaryPull: 0.15, // max translation ~4px
    damping: 18,
    stiffness: 160,
  },
} as const;

export type MotionTokens = typeof MOTION_TOKENS;
