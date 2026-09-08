/**
 * The Tarik Design System — Canonical Color Tokens
 * Direction: Intelligence × Engineering × Curiosity × Precision
 */

export const COLOR_TOKENS = {
  // Base Neutral Surfaces
  base: {
    void: "#050608",            // Deepest void background
    deepSurface: "#0A0D12",     // Base page surface
    surface: "#11151C",         // Standard content cards
    elevatedSurface: "#181E27", // Elevated interactive modules
    highlightSurface: "#222A36" // Focused state surface
  },

  // Primary Signature Accent
  primaryAccent: {
    cyan: "#62E6FF",            // Electric Cyan signature
    cyanGlow: "#A5F3FC",        // Hover and highlight glow
    cyanDeep: "#0284C7",        // Pressed and active state
    cyanAlpha10: "rgba(98, 230, 255, 0.10)",
    cyanAlpha20: "rgba(98, 230, 255, 0.20)",
    cyanAlpha35: "rgba(98, 230, 255, 0.35)",
  },

  // Secondary Intelligence / Neural Accent
  secondaryAccent: {
    violet: "#9B8CFF",          // Soft Violet (AI / Intelligence / Neural)
    violetGlow: "#C4B5FD",      // Hover glow
    violetDeep: "#6D28D9",      // Deep shadow / border
    violetAlpha10: "rgba(155, 140, 255, 0.10)",
    violetAlpha20: "rgba(155, 140, 255, 0.20)",
  },

  // Semantic Status
  semantic: {
    success: "#6EE7B7",         // Verified / Live / Passing
    warning: "#F6C85F",         // In development / Caution
    error: "#FF7070",           // Threat / Failed / Anomaly
    info: "#62E6FF",            // Telemetry information
  },

  // Typography Neutrals
  text: {
    primary: "#EDEEF1",         // High-contrast primary text
    secondary: "#9CA3AF",       // Muted descriptive body
    tertiary: "#6B7280",        // Minor metadata / subtle labels
    accent: "#62E6FF",          // Emphasized keyword
    violet: "#9B8CFF",          // AI keyword
  },

  // Borders and Dividers
  border: {
    subtle: "rgba(255, 255, 255, 0.07)",
    default: "rgba(255, 255, 255, 0.10)",
    strong: "rgba(255, 255, 255, 0.18)",
    accent: "rgba(98, 230, 255, 0.30)",
    accentGlow: "rgba(98, 230, 255, 0.60)",
  },
} as const;

export type ColorTokens = typeof COLOR_TOKENS;
