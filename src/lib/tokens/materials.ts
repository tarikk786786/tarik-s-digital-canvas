/**
 * The Tarik Design System — Material & Elevation Tokens
 */

export const MATERIAL_TOKENS = {
  // Physical Depth Hierarchy (Levels 0 – 5)
  depth: {
    level0: {
      name: "Background Void",
      zIndex: 0,
      description: "Infinite atmospheric plane, ambient dust, subtle noise",
    },
    level1: {
      name: "Normal Content Layer",
      zIndex: 10,
      description: "Typography, editorial cards, standard dossier text",
    },
    level2: {
      name: "Interactive Surface",
      zIndex: 20,
      description: "Tarik Glass panels, selectable capability items, tabs",
    },
    level3: {
      name: "Focused Element",
      zIndex: 30,
      description: "Expanded case studies, hovering cards, active metrics",
    },
    level4: {
      name: "System Overlay",
      zIndex: 40,
      description: "Command Palette, Cyber Terminal, Ask Tarik AI, HUD",
    },
    level5: {
      name: "3D Environment Space",
      zIndex: 5,
      description: "WebGL canvas, Tarik Core, particle trajectories",
    },
  },

  // "TARIK GLASS" Material Specification
  tarikGlass: {
    background: "rgba(255, 255, 255, 0.035)",
    border: "rgba(255, 255, 255, 0.10)",
    backdropFilter: "blur(24px)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
    topHighlight: "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
    accentHighlight: "inset 0 1px 0 0 rgba(98, 230, 255, 0.25)",
  },

  // Holographic Technical Diagnostic Panel
  holoPanel: {
    background: "rgba(10, 13, 18, 0.85)",
    border: "rgba(98, 230, 255, 0.20)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 12px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(98, 230, 255, 0.15)",
  },
} as const;

export type MaterialTokens = typeof MATERIAL_TOKENS;
