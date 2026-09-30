/**
 * Tokens del Design System PROEFEX — fuente de verdad TS (espejo de globals.css).
 * Los componentes consumen SOLO tokens semánticos, nunca hex directos (Doc 14 §2).
 */

export const brand = {
  blue: "#002254",
  orange: "#F7931E",
  red: "#D64022",
  yellow: "#EFB729",
  blueLight: "#005A9E",
  white: "#FFFFFF",
  gray: "#414141",
} as const;

export type Universe = "core" | "tech" | "growup";

/**
 * Motion tokens (Doc 12 §2). Duraciones en ms.
 * `spring` se aplica por JS con la librería Motion; aquí solo valores declarativos.
 */
export const motionTokens = {
  duration: {
    instant: 120,
    fast: 240,
    base: 400,
    slow: 700,
    epic: 1100,
  },
  easing: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    tech: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: { stiffness: 120, damping: 18 },
  },
  stagger: { tight: 40, base: 70, loose: 110 },
} as const;

/** Firma de motion por universo (Doc 12 §5). */
export const universeMotion: Record<Universe, { easing: string; stagger: number }> = {
  core: { easing: motionTokens.easing.out, stagger: motionTokens.stagger.base },
  tech: { easing: motionTokens.easing.tech, stagger: motionTokens.stagger.tight },
  growup: { easing: "spring", stagger: motionTokens.stagger.loose },
};

/** Presets de animación referenciables desde el CMS (BlockProps.animation). */
export const animationPresets = [
  "none",
  "fade-rise",
  "reveal-lines",
  "panel-ignite",
  "draw-on-scroll",
  "counter",
  "marquee",
  "parallax-subtle",
] as const;
export type AnimationPreset = (typeof animationPresets)[number];

/** Espaciado Doc 14 §4. */
export const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160] as const;

/** Breakpoints Doc 15 §1. */
export const breakpoints = { sm: 640, md: 1024, lg: 1024, xl: 1440, xxl: 1920 } as const;
