/**
 * Tokens del Design System PROEFEX — fuente de verdad TS (espejo de globals.css).
 * Los componentes consumen SOLO tokens semánticos, nunca hex directos (Doc 14 §2).
 *
 * Fase 2: D7 = A "Sistema Encendido" · D8 = B "Grafismo Kinético" ·
 * D11 = Source Code Pro (aprobada; uso restringido a datos/etiquetas técnicas).
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

export type Universe =
  | "core"
  | "tech"
  | "growup"
  | "learns"
  | "equip"
  | "solve";

/**
 * Recalibración: acento por pilar (megamenú/home sobre tema core).
 * CREATE #F7931E (tech) · GROW #00FFE6 (growup) · LEARN #0A7A52 (learns) ·
 * EXPERIENCE #D64022 (equip) · SOLVE #005A9E (solve).
 */
export const pillarAccents: Record<Exclude<Universe, "core">, string> = {
  tech: "#F7931E",
  growup: "#00FFE6",
  learns: "#0A7A52",
  equip: "#D64022",
  solve: "#005A9E",
};

/**
 * Motion tokens (Doc 12 §2). Duraciones en ms.
 * Fase 2: sin librería de animación — revelados CSS + IntersectionObserver.
 * `spring` queda documentado para cuando se apruebe Motion (Doc 12 §4).
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

/** Firma de motion por universo (Doc 12 §5 + recalibración D25). */
export const universeMotion: Record<Universe, { easing: string; stagger: number }> = {
  core: { easing: motionTokens.easing.out, stagger: motionTokens.stagger.base },
  tech: { easing: motionTokens.easing.tech, stagger: motionTokens.stagger.tight },
  growup: { easing: "spring", stagger: motionTokens.stagger.loose },
  learns: { easing: motionTokens.easing.out, stagger: 90 },
  equip: { easing: motionTokens.easing.out, stagger: 90 },
  solve: { easing: motionTokens.easing.out, stagger: 90 },
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
export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1440, xxl: 1920 } as const;

/** Escala tipográfica fluida (Doc 14 §3) — espejo de los tokens CSS. */
export const typeScale = {
  "display-2xl": "clamp(3.25rem, 9vw, 8.25rem)",
  "display-xl": "clamp(2.6rem, 5.5vw, 4.5rem)",
  "display-lg": "clamp(2.1rem, 4.5vw, 3.25rem)",
  heading: "clamp(1.4rem, 2.6vw, 2rem)",
  "body-lg": "1.125rem",
  body: "1rem",
  caption: "0.875rem",
  "label-mono": "0.8125rem",
} as const;
