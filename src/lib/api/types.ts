/**
 * Tipos del contrato público de `proefex-api` (F3.2).
 *
 * DERIVADOS del contrato publicado, no del esquema privado de Supabase
 * (`AGENTS.md` §7/§17): son un espejo 1:1 de los DTO de
 * `proefex-api/src/modules/content/content.schemas.ts` (commit `0d3cbee`).
 *
 * No existe hoy un mecanismo compartido reutilizable: `@proefex/blocks-schema`
 * está desalineado con el contrato real y no puede usarse como autoridad
 * (`AGENTS.md` §24). Si el API publica algún día un paquete de contrato
 * consumible, estos tipos deben sustituirse por él.
 */

export const CONTENT_TYPES = [
  "pages",
  "universes",
  "sectors",
  "services",
  "products",
  "cases",
  "insights",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

/**
 * Patrón de slug del contrato público (`content.types.ts` del API): minúsculas,
 * dígitos, `-` y `/` (pages/legal usan slugs con path). Se valida antes de
 * construir una ruta para no enviar valores fuera de contrato.
 */
export const CONTENT_SLUG_PATTERN = /^[a-z0-9]+(?:[/-][a-z0-9]+)*$/;

export type JsonObject = Record<string, unknown>;

/** jsonb editorial de forma no propiedad de la API (cta, testimonial). */
export type LooseJson = JsonObject | unknown[] | null;

export type MediaRefType = "image" | "video" | "document";

export interface MediaRef {
  id: string;
  type: MediaRefType;
  url: string;
  alt: string | null;
  caption: string | null;
  focalPoint: { x: number; y: number } | null;
  width: number | null;
  height: number | null;
}

/** Configuración SEO por entidad; lista blanca de claves conocidas. */
export interface Seo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  robots?: string | null;
  schemaType?: string | null;
}

/** Envolvente de bloque: la forma interna de cada tipo pertenece al CMS. */
export interface ContentBlock {
  type: string;
  props: JsonObject;
}

export interface ContentSummary {
  type: ContentType;
  slug: string;
  title: string;
  summary: string | null;
  publishedAt: string | null;
  heroMedia: MediaRef | null;
}

export interface ContentPageInfo {
  limit: number;
  count: number;
  nextCursor: string | null;
}

export interface ContentList {
  type: ContentType;
  items: ContentSummary[];
  page: ContentPageInfo;
}

export const PAGE_TEMPLATES = [
  "HOME",
  "UNIVERSE",
  "SERVICE",
  "PRODUCT",
  "SECTOR",
  "CASE_STUDY",
  "INSIGHT_INDEX",
  "INSIGHT_DETAIL",
] as const;

export type PageTemplate = (typeof PAGE_TEMPLATES)[number];

interface ContentDetailBase {
  slug: string;
  title: string;
  publishedAt: string | null;
  seo: Seo | null;
}

export interface PageDetail extends ContentDetailBase {
  type: "pages";
  template: PageTemplate;
  blocks: ContentBlock[];
}

export interface UniverseDetail extends ContentDetailBase {
  type: "universes";
  code: string;
  shortName: string | null;
  pillar: string | null;
  tagline: string | null;
  description: string | null;
  accent: string | null;
  theme: string | null;
  navigationOrder: number | null;
  heroMedia: MediaRef | null;
}

export interface SectorDetail extends ContentDetailBase {
  type: "sectors";
  shortDescription: string | null;
  description: string | null;
  visualRef: string | null;
  featured: boolean;
  order: number;
  heroMedia: MediaRef | null;
}

/** Referencia mínima resuelta (padre publicado; `null` si no lo está). */
export interface SmallRef {
  slug: string;
  title: string;
}

export interface ServiceDetail extends ContentDetailBase {
  type: "services";
  shortDescription: string | null;
  description: string | null;
  problem: string | null;
  process: JsonObject[];
  capabilities: JsonObject[];
  cta: LooseJson;
  featured: boolean;
  order: number;
  universe: SmallRef | null;
  heroMedia: MediaRef | null;
  gallery: MediaRef[];
}

export interface ProductDetail extends ContentDetailBase {
  type: "products";
  productKind: "saas" | "equipment";
  commercialStatus: "available" | "announced" | "reserved" | null;
  shortDescription: string | null;
  description: string | null;
  features: JsonObject[];
  benefits: JsonObject[];
  useCases: JsonObject[];
  url: string | null;
  cta: LooseJson;
  featured: boolean;
  order: number;
  heroMedia: MediaRef | null;
  logoMedia: MediaRef | null;
  videoMedia: MediaRef | null;
  gallery: MediaRef[];
  screenshots: MediaRef[];
}

export interface CaseDetail extends ContentDetailBase {
  type: "cases";
  /** `null` cuando `client_visibility = anonymous` (privacidad del cliente). */
  client: string | null;
  clientVisibility: "public" | "anonymous";
  summary: string | null;
  challenge: string | null;
  solution: string | null;
  process: string | null;
  results: JsonObject[];
  technologies: string[];
  /** Sólo presente si el testimonio tiene consentimiento explícito. */
  testimonial: LooseJson;
  cta: LooseJson;
  sector: SmallRef | null;
  universe: SmallRef | null;
  heroMedia: MediaRef | null;
  gallery: MediaRef[];
  videos: MediaRef[];
}

export interface AuthorRef {
  slug: string;
  name: string;
  role: string | null;
}

export interface InsightDetail extends ContentDetailBase {
  type: "insights";
  excerpt: string | null;
  blocks: ContentBlock[];
  tags: string[];
  readingTime: number | null;
  category: SmallRef | null;
  author: AuthorRef | null;
  relatedUniverse: SmallRef | null;
  heroMedia: MediaRef | null;
}

export type ContentDetail =
  | PageDetail
  | UniverseDetail
  | SectorDetail
  | ServiceDetail
  | ProductDetail
  | CaseDetail
  | InsightDetail;

/** Mapa tipo → DTO de detalle, para tipar las funciones de dominio. */
export interface ContentDetailMap {
  pages: PageDetail;
  universes: UniverseDetail;
  sectors: SectorDetail;
  services: ServiceDetail;
  products: ProductDetail;
  cases: CaseDetail;
  insights: InsightDetail;
}

export type DetailOf<T extends ContentType> = ContentDetailMap[T];

export interface NavigationItem {
  label: string;
  href: string;
  /** `href` del padre publicado, o `null` (nunca se filtra `parent_id`). */
  parentHref: string | null;
  visibility: "all" | "desktop" | "mobile";
  order: number;
  featured: boolean;
}

export interface Navigation {
  items: NavigationItem[];
}

export interface SiteSettings {
  siteName: string;
  description: string | null;
  contact: JsonObject;
  socialLinks: unknown[];
  defaultSeo: JsonObject;
  analytics: JsonObject;
  footer: JsonObject;
  legalLinks: unknown[];
  announcement: JsonObject;
  logoMedia: MediaRef | null;
  faviconMedia: MediaRef | null;
}

export interface FieldError {
  path: string;
  message: string;
}

/** Documento RFC 7807 devuelto por `proefex-api`. */
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  code: string;
  detail?: string;
  instance: string;
  requestId: string;
  errors?: FieldError[];
}
