// src/theme/streetfighter.ts

import Nora from "@primeuix/themes/nora";

export const StreetFighterTheme = {
  preset: Nora,

  options: {
    darkModeSelector: ".dark",
  },

  colors: {
    primary: "#F3CF60",
    secondary: "#6087EF",
    danger: "#E83B06",
    highlight: "#F3CF60",

    background: "#020102",
    surface: "#1A1A1A",
    surfaceSection: "#111111",
    surfaceCard: "#141414",
    surfaceHover: "#2A2A2A",

    text: "#FFFFFF",
    textSecondary: "#C7C7C7",

    border: "#F3CF60",
  },

  semantic: {
    borderRadius: "4px",

    focusRing: {
      width: "2px",
      color: "#F3CF60",
      offset: "1px",
    },

    overlay: {
      background: "rgba(0, 0, 0, 0.75)",
    },
  },

  shadows: {
    sm: "0 0 12px rgba(243, 207, 96, 0.35)",
    md: "0 0 16px rgba(243, 207, 96, 0.45)",
    lg: "0 0 24px rgba(243, 207, 96, 0.55)",
  },
};
