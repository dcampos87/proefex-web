/**
 * Validación estructural de las respuestas de `proefex-api` (F3.2).
 *
 * El contrato del API es `strictObject` (defensa en profundidad del propio API),
 * por lo que aquí basta con un espejo ESTRUCTURAL de los DTO públicos: se exige
 * lo que la Web consume y se toleran (como hace el mapeador del API) los campos
 * opcionales o anulables. Un cuerpo que no cumple esta forma produce
 * `kind: "invalid-response"` — nunca se renderiza un objeto no verificado.
 *
 * El API sigue siendo la autoridad del contrato: esta capa no lo reinterpreta ni
 * añade reglas de negocio editoriales.
 */

import { apiErrorInvalidResponse } from "./errors.ts";
import {
  CONTENT_TYPES,
  PAGE_TEMPLATES,
  type AuthorRef,
  type CaseDetail,
  type ContentBlock,
  type ContentList,
  type ContentSummary,
  type ContentType,
  type InsightDetail,
  type JsonObject,
  type LooseJson,
  type MediaRef,
  type Navigation,
  type NavigationItem,
  type PageDetail,
  type ProblemDetails,
  type ProductDetail,
  type SectorDetail,
  type Seo,
  type ServiceDetail,
  type SiteSettings,
  type SmallRef,
  type UniverseDetail,
} from "./types.ts";

function fail(detail: string): never {
  throw apiErrorInvalidResponse(detail, {});
}

function asRecord(value: unknown, where: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${where} no es un objeto`);
  }
  return value as Record<string, unknown>;
}

function requireField(record: Record<string, unknown>, key: string, where: string): unknown {
  const value = record[key];
  if (value === undefined) fail(`${where}.${key} ausente`);
  return value;
}

function asString(value: unknown, where: string): string {
  if (typeof value !== "string") fail(`${where} no es una cadena`);
  return value;
}

function asNullableString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asNullableInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.trunc(parsed);
  }
  return null;
}

function asInt(value: unknown, fallback: number): number {
  return asNullableInt(value) ?? fallback;
}

function asBool(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function asRecordArray(value: unknown): JsonObject[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is JsonObject => item !== null && typeof item === "object" && !Array.isArray(item),
  );
}

function asLooseJson(value: unknown): LooseJson {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return value as JsonObject;
  return null;
}

function asJsonObject(value: unknown): JsonObject {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return {};
  return value as JsonObject;
}

function asStringArrayUnknown(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Envolvente de bloque: una entrada sin `type`/`props` válidos se descarta. */
function asBlocks(value: unknown): ContentBlock[] {
  if (!Array.isArray(value)) return [];
  const blocks: ContentBlock[] = [];
  for (const entry of value) {
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) continue;
    const record = entry as Record<string, unknown>;
    const type = record["type"];
    const props = record["props"];
    if (
      typeof type !== "string" ||
      type.length === 0 ||
      props === null ||
      typeof props !== "object" ||
      Array.isArray(props)
    ) {
      continue;
    }
    blocks.push({ type, props: props as JsonObject });
  }
  return blocks;
}

function asMediaRef(value: unknown): MediaRef | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const id = asNullableString(record["id"]);
  const url = asNullableString(record["url"]);
  if (id === null || url === null) return null;
  const rawType = typeof record["type"] === "string" ? record["type"].toLowerCase() : "";
  const type: MediaRef["type"] =
    rawType === "video" ? "video" : rawType === "document" ? "document" : "image";
  const focal = record["focalPoint"];
  return {
    id,
    type,
    url,
    alt: asNullableString(record["alt"]),
    caption: asNullableString(record["caption"]),
    focalPoint:
      focal !== null && typeof focal === "object" && !Array.isArray(focal)
        ? {
            x: asInt((focal as Record<string, unknown>)["x"], 0),
            y: asInt((focal as Record<string, unknown>)["y"], 0),
          }
        : null,
    width: asNullableInt(record["width"]),
    height: asNullableInt(record["height"]),
  };
}

function asMediaRefArray(value: unknown): MediaRef[] {
  if (!Array.isArray(value)) return [];
  const refs: MediaRef[] = [];
  for (const entry of value) {
    const ref = asMediaRef(entry);
    if (ref !== null) refs.push(ref);
  }
  return refs;
}

const SEO_KEYS = [
  "metaTitle",
  "metaDescription",
  "canonicalUrl",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "robots",
  "schemaType",
] as const;

function asSeo(value: unknown): Seo | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const source = value as Record<string, unknown>;
  const result: Record<string, string> = {};
  for (const key of SEO_KEYS) {
    const raw = source[key];
    if (typeof raw === "string") result[key] = raw;
  }
  return Object.keys(result).length === 0 ? null : (result as Seo);
}

function asSmallRef(value: unknown): SmallRef | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const slug = asNullableString(record["slug"]);
  const title = asNullableString(record["title"]);
  return slug === null || title === null ? null : { slug, title };
}

function asAuthorRef(value: unknown): AuthorRef | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const slug = asNullableString(record["slug"]);
  const name = asNullableString(record["name"]);
  if (slug === null || name === null) return null;
  return { slug, name, role: asNullableString(record["role"]) };
}

export function isContentType(value: unknown): value is ContentType {
  return typeof value === "string" && (CONTENT_TYPES as readonly string[]).includes(value);
}

function requireSlug(record: Record<string, unknown>, where: string): string {
  const slug = requireField(record, "slug", where);
  if (typeof slug !== "string") fail(`${where}.slug no es una cadena`);
  return slug;
}

interface DetailBase {
  slug: string;
  title: string;
  publishedAt: string | null;
  seo: Seo | null;
}

function parseDetailBase(record: Record<string, unknown>, where: string): DetailBase {
  return {
    slug: requireSlug(record, where),
    title: asString(requireField(record, "title", where), `${where}.title`),
    publishedAt: asNullableString(record["publishedAt"]),
    seo: asSeo(record["seo"]),
  };
}

export function parsePageDetail(value: unknown): PageDetail {
  const record = asRecord(value, "pages");
  const base = parseDetailBase(record, "pages");
  const template = requireField(record, "template", "pages");
  if (typeof template !== "string" || !(PAGE_TEMPLATES as readonly string[]).includes(template)) {
    fail("pages.template fuera del enum del contrato");
  }
  return { type: "pages", ...base, template: template as PageDetail["template"], blocks: asBlocks(record["blocks"]) };
}

function parseUniverseDetail(value: unknown): UniverseDetail {
  const record = asRecord(value, "universes");
  return {
    type: "universes",
    ...parseDetailBase(record, "universes"),
    code: asString(requireField(record, "code", "universes"), "universes.code"),
    shortName: asNullableString(record["shortName"]),
    pillar: asNullableString(record["pillar"]),
    tagline: asNullableString(record["tagline"]),
    description: asNullableString(record["description"]),
    accent: asNullableString(record["accent"]),
    theme: asNullableString(record["theme"]),
    navigationOrder: asNullableInt(record["navigationOrder"]),
    heroMedia: asMediaRef(record["heroMedia"]),
  };
}

function parseSectorDetail(value: unknown): SectorDetail {
  const record = asRecord(value, "sectors");
  return {
    type: "sectors",
    ...parseDetailBase(record, "sectors"),
    shortDescription: asNullableString(record["shortDescription"]),
    description: asNullableString(record["description"]),
    visualRef: asNullableString(record["visualRef"]),
    featured: asBool(record["featured"]),
    order: asInt(record["order"], 0),
    heroMedia: asMediaRef(record["heroMedia"]),
  };
}

function parseServiceDetail(value: unknown): ServiceDetail {
  const record = asRecord(value, "services");
  return {
    type: "services",
    ...parseDetailBase(record, "services"),
    shortDescription: asNullableString(record["shortDescription"]),
    description: asNullableString(record["description"]),
    problem: asNullableString(record["problem"]),
    process: asRecordArray(record["process"]),
    capabilities: asRecordArray(record["capabilities"]),
    cta: asLooseJson(record["cta"]),
    featured: asBool(record["featured"]),
    order: asInt(record["order"], 0),
    universe: asSmallRef(record["universe"]),
    heroMedia: asMediaRef(record["heroMedia"]),
    gallery: asMediaRefArray(record["gallery"]),
  };
}

function parseProductDetail(value: unknown): ProductDetail {
  const record = asRecord(value, "products");
  const commercial = record["commercialStatus"];
  return {
    type: "products",
    ...parseDetailBase(record, "products"),
    productKind: record["productKind"] === "equipment" ? "equipment" : "saas",
    commercialStatus:
      commercial === "available" || commercial === "announced" || commercial === "reserved"
        ? commercial
        : null,
    shortDescription: asNullableString(record["shortDescription"]),
    description: asNullableString(record["description"]),
    features: asRecordArray(record["features"]),
    benefits: asRecordArray(record["benefits"]),
    useCases: asRecordArray(record["useCases"]),
    url: asNullableString(record["url"]),
    cta: asLooseJson(record["cta"]),
    featured: asBool(record["featured"]),
    order: asInt(record["order"], 0),
    heroMedia: asMediaRef(record["heroMedia"]),
    logoMedia: asMediaRef(record["logoMedia"]),
    videoMedia: asMediaRef(record["videoMedia"]),
    gallery: asMediaRefArray(record["gallery"]),
    screenshots: asMediaRefArray(record["screenshots"]),
  };
}

function parseCaseDetail(value: unknown): CaseDetail {
  const record = asRecord(value, "cases");
  const visibility = record["clientVisibility"] === "public" ? "public" : "anonymous";
  return {
    type: "cases",
    ...parseDetailBase(record, "cases"),
    client: visibility === "public" ? asNullableString(record["client"]) : null,
    clientVisibility: visibility,
    summary: asNullableString(record["summary"]),
    challenge: asNullableString(record["challenge"]),
    solution: asNullableString(record["solution"]),
    process: asNullableString(record["process"]),
    results: asRecordArray(record["results"]),
    technologies: asStringArray(record["technologies"]),
    testimonial: asLooseJson(record["testimonial"]),
    cta: asLooseJson(record["cta"]),
    sector: asSmallRef(record["sector"]),
    universe: asSmallRef(record["universe"]),
    heroMedia: asMediaRef(record["heroMedia"]),
    gallery: asMediaRefArray(record["gallery"]),
    videos: asMediaRefArray(record["videos"]),
  };
}

function parseInsightDetail(value: unknown): InsightDetail {
  const record = asRecord(value, "insights");
  return {
    type: "insights",
    ...parseDetailBase(record, "insights"),
    excerpt: asNullableString(record["excerpt"]),
    blocks: asBlocks(record["blocks"]),
    tags: asStringArray(record["tags"]),
    readingTime: asNullableInt(record["readingTime"]),
    category: asSmallRef(record["category"]),
    author: asAuthorRef(record["author"]),
    relatedUniverse: asSmallRef(record["relatedUniverse"]),
    heroMedia: asMediaRef(record["heroMedia"]),
  };
}

/** Un parser de detalle por tipo: mantiene el tipado exacto de cada entidad. */
export const DETAIL_PARSERS: {
  [T in ContentType]: (value: unknown) => Extract<ContentDetailUnion, { type: T }>;
} = {
  pages: parsePageDetail,
  universes: parseUniverseDetail,
  sectors: parseSectorDetail,
  services: parseServiceDetail,
  products: parseProductDetail,
  cases: parseCaseDetail,
  insights: parseInsightDetail,
};

type ContentDetailUnion =
  | PageDetail
  | UniverseDetail
  | SectorDetail
  | ServiceDetail
  | ProductDetail
  | CaseDetail
  | InsightDetail;

function parseContentSummary(value: unknown): ContentSummary {
  const record = asRecord(value, "items[]");
  const type = requireField(record, "type", "items[]");
  if (!isContentType(type)) fail("items[].type fuera del enum del contrato");
  return {
    type,
    slug: requireSlug(record, "items[]"),
    title: asString(requireField(record, "title", "items[]"), "items[].title"),
    summary: asNullableString(record["summary"]),
    publishedAt: asNullableString(record["publishedAt"]),
    heroMedia: asMediaRef(record["heroMedia"]),
  };
}

export function parseContentList(value: unknown, expectedType?: ContentType): ContentList {
  const record = asRecord(value, "contentList");
  const type = requireField(record, "type", "contentList");
  if (!isContentType(type)) fail("contentList.type fuera del enum del contrato");
  if (expectedType !== undefined && type !== expectedType) {
    fail(`contentList.type="${type}" no corresponde a "${expectedType}"`);
  }
  const items = requireField(record, "items", "contentList");
  if (!Array.isArray(items)) fail("contentList.items no es una lista");
  const page = asRecord(requireField(record, "page", "contentList"), "contentList.page");
  return {
    type,
    items: items.map(parseContentSummary),
    page: {
      limit: asInt(page["limit"], items.length),
      count: asInt(page["count"], items.length),
      nextCursor: asNullableString(page["nextCursor"]),
    },
  };
}

export function parseContentDetail(value: unknown, expectedType: ContentType) {
  const record = asRecord(value, "contentDetail");
  const type = requireField(record, "type", "contentDetail");
  if (!isContentType(type)) fail("contentDetail.type fuera del enum del contrato");
  if (type !== expectedType) {
    fail(`contentDetail.type="${type}" no corresponde a "${expectedType}"`);
  }
  return DETAIL_PARSERS[expectedType](record);
}

export function parseNavigation(value: unknown): Navigation {
  const record = asRecord(value, "navigation");
  const items = requireField(record, "items", "navigation");
  if (!Array.isArray(items)) fail("navigation.items no es una lista");
  const parsed: NavigationItem[] = items.map((entry) => {
    const item = asRecord(entry, "navigation.items[]");
    const rawVisibility = item["visibility"];
    return {
      label: asString(requireField(item, "label", "navigation.items[]"), "navigation.items[].label"),
      href: asString(requireField(item, "href", "navigation.items[]"), "navigation.items[].href"),
      parentHref: asNullableString(item["parentHref"]),
      visibility:
        rawVisibility === "desktop" || rawVisibility === "mobile" ? rawVisibility : "all",
      order: asInt(item["order"], 0),
      featured: asBool(item["featured"]),
    };
  });
  return { items: parsed };
}

export function parseSiteSettings(value: unknown): SiteSettings {
  const record = asRecord(value, "siteSettings");
  return {
    siteName: asString(requireField(record, "siteName", "siteSettings"), "siteSettings.siteName"),
    description: asNullableString(record["description"]),
    contact: asJsonObject(record["contact"]),
    socialLinks: asStringArrayUnknown(record["socialLinks"]),
    defaultSeo: asJsonObject(record["defaultSeo"]),
    analytics: asJsonObject(record["analytics"]),
    footer: asJsonObject(record["footer"]),
    legalLinks: asStringArrayUnknown(record["legalLinks"]),
    announcement: asJsonObject(record["announcement"]),
    logoMedia: asMediaRef(record["logoMedia"]),
    faviconMedia: asMediaRef(record["faviconMedia"]),
  };
}

/**
 * Parseo tolerante de un documento RFC 7807. Nunca lanza: el cliente lo usa para
 * enriquecer el error, y un problema malformado no debe sustituir al error real.
 */
export function parseProblemDetails(value: unknown): ProblemDetails | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const status = asNullableInt(record["status"]);
  const code = asNullableString(record["code"]);
  if (status === null || code === null) return null;
  const errors = Array.isArray(record["errors"])
    ? record["errors"]
        .filter((item): item is Record<string, unknown> => item !== null && typeof item === "object")
        .map((item) => ({ path: String(item["path"] ?? ""), message: String(item["message"] ?? "") }))
    : undefined;
  const detail = asNullableString(record["detail"]);
  return {
    type: asNullableString(record["type"]) ?? "about:blank",
    title: asNullableString(record["title"]) ?? "Error",
    status,
    code,
    ...(detail === null ? {} : { detail }),
    instance: asNullableString(record["instance"]) ?? "",
    requestId: asNullableString(record["requestId"]) ?? "",
    ...(errors === undefined ? {} : { errors }),
  };
}
