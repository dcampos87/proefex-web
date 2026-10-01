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
  /** Descripción corta para el megamenú (una línea, sin claims). */
  desc?: string;
  /** Ítem destacado del pilar en el megamenú. */
  featured?: boolean;
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
      {
        label: "Desarrollo de software",
        href: "/tech/desarrollo-de-software",
        desc: "Web, apps y software a la medida de su operación.",
        featured: true,
        built: true,
      },
      { label: "Automatización", href: "/tech/automatizacion", desc: "Procesos que se ejecutan solos, bajo reglas claras." },
      { label: "IA empresarial", href: "/tech/ia-empresarial", desc: "IA aplicada dentro de sus flujos de negocio." },
      { label: "Transformación digital", href: "/tech/transformacion-digital", desc: "La operación, reorganizada sobre tecnología." },
      { label: "Implementación de software", href: "/tech/implementacion-de-software", desc: "Adopción real, no solo instalación." },
      {
        label: "Ingeniería",
        href: "/tech/ingenieria",
        desc: "El territorio, en datos.",
        children: [
          { label: "Drones", href: "/tech/ingenieria/drones", desc: "Levantamiento y monitoreo aéreo." },
          { label: "IoT", href: "/tech/ingenieria/iot", desc: "Sensores y conectividad operativa." },
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
      { label: "Marketing BPO", href: "/grow-up/marketing-bpo", desc: "Su marketing, operado de forma continua." },
      { label: "Growth Marketing", href: "/grow-up/growth-marketing", desc: "Experimentación y mejora del embudo.", featured: true },
      { label: "Consultoría de marketing", href: "/grow-up/consultoria", desc: "Estrategia con criterio, junto a su equipo." },
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
      { label: "Cursos", href: "/learns/cursos", desc: "Formación práctica para equipos." },
      { label: "Certificación", href: "/learns/certificacion", desc: "Respaldo oficial para su equipo.", featured: true },
      { label: "Partner Certmind", href: "/learns/#certmind", desc: "Partner Oficial de certificación." },
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
      { label: "Tecnología", href: "/equip/tecnologia", desc: "Equipamiento para espacios operativos." },
      { label: "Pantallas", href: "/equip/pantallas", desc: "Pantallas comerciales y corporativas.", featured: true },
      { label: "Interactivas", href: "/equip/interactivas", desc: "Pantallas interactivas de experiencia." },
      { label: "Tótems", href: "/equip/totems", desc: "Información y autoservicio en punto físico." },
      { label: "Alquiler", href: "/equip/alquiler", desc: "Equipamiento para proyectos y eventos." },
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
      { label: "Turu CRM", href: "/solutions/turu-crm", desc: "CRM: gestión de clientes y leads.", featured: true, built: true },
      { label: "PROEFACT", href: "/solutions/proefact", desc: "Producto del ecosistema — detalle: CONTENT_REQUIRED." },
      { label: "My Bpass", href: "/solutions/my-bpass", desc: "Producto del ecosistema — detalle: CONTENT_REQUIRED." },
      { label: "AtendiGo", href: "/solutions/atendigo", desc: "Producto del ecosistema — detalle: CONTENT_REQUIRED." },
      { label: "Eleventto", href: "/solutions/eleventto", desc: "Producto del ecosistema — detalle: CONTENT_REQUIRED." },
      { label: "Klyra — próximamente", href: "/solutions/klyra", desc: "Producto reservado, en desarrollo." },
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
