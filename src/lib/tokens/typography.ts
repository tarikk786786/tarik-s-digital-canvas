/**
 * The Tarik Design System — Typographic Tokens & Scale
 */

export const TYPOGRAPHY_TOKENS = {
  fonts: {
    display: 'var(--font-display, "Satoshi", system-ui, sans-serif)',
    sans: 'var(--font-sans, "General Sans", system-ui, sans-serif)',
    mono: 'var(--font-mono, "IBM Plex Mono", monospace)',
  },

  // Canonical Size Scale
  scale: {
    display: "clamp(4.5rem, 9vw, 9.5rem)", // 72px – 152px
    h1: "clamp(2.75rem, 5.5vw, 5rem)",     // 44px – 80px
    h2: "clamp(2rem, 3.8vw, 3.5rem)",       // 32px – 56px
    h3: "clamp(1.5rem, 2.4vw, 2.125rem)",   // 24px – 34px
    bodyLg: "1.1875rem",                   // 19px
    body: "1.0625rem",                     // 17px
    small: "0.875rem",                     // 14px
    mono: "0.8125rem",                     // 13px
    microMono: "0.6875rem",                // 11px
  },

  // Tracking (Letter Spacing)
  tracking: {
    tighter: "-0.04em",
    tight: "-0.02em",
    normal: "0em",
    wide: "0.05em",
    wider: "0.15em",
    widest: "0.28em",
    hud: "0.35em",
  },

  // Leading (Line Height)
  leading: {
    none: "1",
    tight: "1.05",
    snug: "1.2",
    relaxed: "1.6",
    loose: "1.8",
  },
} as const;

export type TypographyTokens = typeof TYPOGRAPHY_TOKENS;
