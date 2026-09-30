/**
 * Modelo de navegación multipágina — recalibración Fase 2.
 * Fuente única para: megamenú desktop, drawer móvil, subnav y footer.
 *
 * IMPORTANTE (D24 — PROPOSED): las rutas de pilares y de segundo nivel son
 * ARQUITECTURA PROPUESTA. Conflicto parcial con Doc 04 (que define
 * /tech/[categoria]/[servicio], /saas/[producto], /productos/[slug]).
 * Resolución registrada en docs/decision-register.md → REQUIRES_PROEFEX_INPUT
 * para el mapa definitivo de URLs en Fase 3.
 *
 * `built: true` = página existente; `false` = stub de arquitectura
 * (CONTENT_REQUIRED, Fase 3).
 */

export type Universe = "core" | "tech" | "growup" | "learns" | "equip" | "solve";

export interface NavChild {
  label: string;
  href: string;
  built?: boolean;
  /** Hijo de segundo nivel (solo TECH: Drones/IoT). */
  children?: NavChild[];
}

export interface Pillar {
  /** Pilar estratégico Nivel 2 (§23). */
  pillar: "CREATE" | "GROW" | "LEARN" | "EXPERIENCE" | "SOLVE";
  name: string;
  tagline: string;
  href: string;
  universe: Universe;
  /** Color del acento del pilar (megamenú sobre tema core). */
  accent: string;
  children: NavChild[];
}

export const PILLARS: Pillar[] = [
  {
    pillar: "CREATE",
    name: "PROEFEX TECH",
    tagline: "Desarrollo y Digitalización",
    href: "/tech",
    universe: "tech",
    accent: "#F7931E",
    children: [
      { label: "Desarrollo de software", href: "/tech/desarrollo-de-software", built: true },
      { label: "Automatización", href: "/tech/automatizacion" },
      { label: "IA empresarial", href: "/tech/ia-empresarial" },
      { label: "Transformación digital", href: "/tech/transformacion-digital" },
      { label: "Implementación de software", href: "/tech/implementacion-de-software" },
      {
        label: "Ingeniería",
        href: "/tech/ingenieria",
        children: [
          { label: "Drones", href: "/tech/ingenieria/drones" },
          { label: "IoT", href: "/tech/ingenieria/iot" },
        ],
      },
    ],
  },
  {
    pillar: "GROW",
    name: "Grow Up",
    tagline: "Marketing y Growth",
    href: "/grow-up",
    universe: "growup",
    accent: "#00FFE6",
    children: [
      { label: "Marketing BPO", href: "/grow-up/marketing-bpo" },
      { label: "Growth Marketing", href: "/grow-up/growth-marketing" },
      { label: "Consultoría de marketing", href: "/grow-up/consultoria" },
    ],
  },
  {
    pillar: "LEARN",
    name: "PROEFEX LEARNS",
    tagline: "Formación y Certificación",
    href: "/learns",
    universe: "learns",
    accent: "#0A7A52",
    children: [
      { label: "Cursos", href: "/learns/cursos" },
      { label: "Certificación", href: "/learns/certificacion" },
      { label: "Partner Certmind", href: "/learns/#certmind" },
    ],
  },
  {
    pillar: "EXPERIENCE",
    name: "PROEFEX EQUIP",
    tagline: "Tecnología y equipamiento",
    href: "/equip",
    universe: "equip",
    accent: "#D64022",
    children: [
      { label: "Tecnología", href: "/equip/tecnologia" },
      { label: "Pantallas", href: "/equip/pantallas" },
      { label: "Interactivas", href: "/equip/interactivas" },
      { label: "Tótems", href: "/equip/totems" },
      { label: "Alquiler", href: "/equip/alquiler" },
    ],
  },
  {
    pillar: "SOLVE",
    name: "PROEFEX SOLUTIONS",
    tagline: "Productos y soluciones",
    href: "/solutions",
    universe: "solve",
    accent: "#005A9E",
    children: [
      { label: "Turu CRM", href: "/solutions/turu-crm", built: true },
      { label: "PROEFACT", href: "/solutions/proefact" },
      { label: "My Bpass", href: "/solutions/my-bpass" },
      { label: "AtendiGo", href: "/solutions/atendigo" },
      { label: "Eleventto", href: "/solutions/eleventto" },
      { label: "Klyra — próximamente", href: "/solutions/klyra" },
    ],
  },
];

/** Nivel 1 — PROEFEX (transversal, tema core). */
export const CORE_LINKS = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Sectores", href: "/sectores" },
  { label: "Casos de éxito", href: "/casos" },
  { label: "Insights", href: "/insights" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const CONTACT_HREF = "/contacto";
