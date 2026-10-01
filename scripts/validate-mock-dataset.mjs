#!/usr/bin/env node
/**
 * validate-mock-dataset.mjs — Fase 3.1.2
 *
 * Valida el dataset MOCK en data/mock/ contra las reglas del modelo CMS (F3.1):
 *   - slugs: presentes, únicos por entidad, URL-safe
 *   - estados: enum del workflow (DRAFT→PUBLISHED→ARCHIVED)
 *   - relaciones: toda referencia resuelve a un registro existente
 *   - SEO: completitud por estado (published exige completo), variantes noindex/canonical
 *   - media: alt obligatorio, copyright, poster en video
 *   - gates de publicación simulados (G1–G8, content-governance §4)
 *   - cobertura: los 5 estados editoriales y las variantes SEO deben existir
 *
 * Sin dependencias nuevas. Ejecutar: npm run validate:mock
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "data", "mock");

/* Bloques aprobados — mantener en sync con packages/blocks-schema/src/index.ts
   (blockRegistry). El validador no importa el paquete TS para evitar loaders. */
const BLOCK_NAMES = new Set([
  "HeroCore", "HeroTech", "HeroCreative", "CTA", "ServiceGrid", "SectorGrid",
  "SaaSShowcase", "StatsSection", "Process", "Timeline", "FAQ", "BlogGrid",
  "LogoWall", "ImageTextSplit", "VideoSection", "Testimonial", "CaseStudy",
  "ContactSection",
]);

const STATUSES = new Set(["draft", "in_review", "scheduled", "published", "archived"]);
const MEDIA_TYPES = new Set(["IMAGE", "VIDEO", "DOCUMENT"]);
const COPYRIGHT = new Set(["OWNED", "LICENSED", "PENDING_REVIEW"]);
const CTA_TYPES = new Set(["internal", "external", "contact", "form", "product", "download"]);
const SOURCES = new Set(["MOCK", "PROEFEX", "IMPORTED"]);
const AUDIT_ACTIONS = new Set(["create", "update", "delete", "publish", "unpublish", "login", "role_change"]);
const PAGE_TEMPLATES = new Set(["CORE", "UNIVERSE", "SERVICE", "PRODUCT", "SECTOR", "CASE_STUDY", "INSIGHT"]);

const errors = [];
const info = { relations: 0, records: 0 };
const fail = (msg) => errors.push(msg);

function load(name) {
  return JSON.parse(readFileSync(join(DIR, name), "utf8"));
}
const recordsOf = (name) => {
  const doc = load(name);
  return doc.records ?? (doc.record ? [doc.record] : []);
};

const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));
const db = {};
for (const f of files) {
  const doc = load(f);
  const key = doc.entity ?? f;
  db[key] = { file: f, doc, records: doc.records ?? (doc.record ? [doc.record] : []) };
}

const uni = db["Universe"].records;
const sec = db["Sector"].records;
const svc = db["Service"].records;
const prd = db["Product"].records;
const cas = db["CaseStudy"].records;
const ins = db["Insight"].records;
const aut = db["Author"].records;
const med = db["MediaAsset"].records;
const cta = db["CTA"].records;
const nav = db["Navigation"].records;
const cats = db["InsightCategory"].records;
const pgs = db["Page"].records;
const ms = db["Milestone"].records;
const legal = db["LegalDocument"].records;
const red = db["Redirect"].records;
const rev = db["ContentRevision"].records;
const audit = db["AuditLog"].records;
const settings = db["SiteSettings"].doc.record;
const leadform = db["LeadForm + Consent"].doc.record;

const ids = (arr) => new Set(arr.map((r) => r.id));
const IDs = {
  Universe: ids(uni), Sector: ids(sec), Service: ids(svc), Product: ids(prd),
  CaseStudy: ids(cas), Insight: ids(ins), Author: ids(aut), MediaAsset: ids(med),
  CTA: ids(cta), Navigation: ids(nav), InsightCategory: ids(cats), Page: ids(pgs),
  Milestone: ids(ms), LegalDocument: ids(legal),
};
const medById = Object.fromEntries(med.map((m) => [m.id, m]));
const autById = Object.fromEntries(aut.map((a) => [a.id, a]));

function ref(rec, field, target, opts = {}) {
  const v = rec[field];
  if (v == null || v === "") {
    if (!opts.required) return;
    fail(`${rec.id}: campo '${field}' vacío (requerido)`);
    return;
  }
  info.relations++;
  if (!IDs[target]?.has(v)) fail(`${rec.id}: relación '${field}' → '${v}' no resuelve a ${target}`);
}

function refArray(rec, field, target) {
  const arr = rec[field] ?? [];
  if (!Array.isArray(arr)) { fail(`${rec.id}: '${field}' debe ser lista`); return; }
  for (const v of arr) {
    info.relations++;
    if (!IDs[target]?.has(v)) fail(`${rec.id}: relación '${field}' → '${v}' no resuelve a ${target}`);
  }
}

function mediaRef(rec, id, where) {
  if (id == null) return;
  info.relations++;
  const m = medById[id];
  if (!m) { fail(`${where}: media '${id}' no existe en MediaAsset`); return; }
  if (!m.alt || !m.alt.trim()) fail(`${where}: media '${id}' sin alt (a11y, gate G2)`);
}

/* ---------- 1. contentSource + slugs + estados ---------- */
const slugOwners = {};
for (const [entity, { records }] of Object.entries(db)) {
  for (const r of records) {
    info.records++;
    if (!r.id) fail(`${entity}: registro sin id`);
    if (!SOURCES.has(r.contentSource)) fail(`${r.id}: contentSource ausente o inválido (MOCK|PROEFEX|IMPORTED)`);
    if (r.contentSource && r.contentSource !== "MOCK" && entity !== "Universe" && entity !== "Sector")
      fail(`${r.id}: dataset F3.1.2 debe ser 100% MOCK`);
    if (r.status && !STATUSES.has(r.status) && entity !== "InsightCategory" && entity !== "Redirect")
      fail(`${r.id}: estado '${r.status}' fuera del workflow`);

    const slug = r.slug;
    if (slug !== undefined) {
      const isHome = entity === "Page" && slug === ""; // home = slug raíz
      if (typeof slug !== "string" || (!slug.trim() && !isHome)) fail(`${r.id}: slug vacío`);
      const isPath = entity === "Page" || entity === "LegalDocument";
      const pattern = isPath ? /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/ : /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (slug && !pattern.test(slug)) fail(`${r.id}: slug '${slug}' no es URL-safe`);
      const key = `${entity}::${slug}`;
      if (slugOwners[key]) fail(`slug duplicado en ${entity}: '${slug}' (${slugOwners[key]} y ${r.id})`);
      slugOwners[key] = r.id;
    }
    // slugs únicos globalmente entre Service y Product (modelo F3.1)
  }
}
const svcPrdSlugs = new Map();
for (const r of [...svc, ...prd]) {
  if (svcPrdSlugs.has(r.slug)) fail(`slug '${r.slug}' duplicado entre Service y Product (global uniqueness)`);
  svcPrdSlugs.set(r.slug, r.id);
}

/* ---------- 2. Universes ---------- */
for (const r of uni) {
  ref(r, "heroMedia", "MediaAsset");
  if (r.seo?.ogImage) mediaRef(r, r.seo.ogImage, r.id);
  if (r.seo?.metaTitle && r.seo.metaTitle.length > 60) fail(`${r.id}: metaTitle >60`);
  if (r.seo?.metaDescription && r.seo.metaDescription.length > 160) fail(`${r.id}: metaDescription >160`);
}

/* ---------- 3. Sectors ---------- */
for (const r of sec) {
  ref(r, "heroMedia", "MediaAsset");
  checkSeo(r);
}

/* ---------- 4. Services ---------- */
for (const r of svc) {
  ref(r, "universe", "Universe", { required: true });
  refArray(r, "sectors", "Sector");
  refArray(r, "relatedProducts", "Product");
  refArray(r, "relatedCases", "CaseStudy");
  refArray(r, "relatedInsights", "Insight");
  refArray(r, "media", "MediaAsset");
  ref(r, "cta", "CTA");
  checkSeo(r);
  if (r.status === "published") {
    if (!(r.sectors?.length)) fail(`${r.id}: publicado sin sectores (relación mínima)`);
    if (!(r.media?.length)) fail(`${r.id}: publicado sin media`);
  }
}

/* ---------- 5. Products ---------- */
for (const r of prd) {
  // En el modelo F3.1 Product no tiene FK a Universe: los SaaS pertenecen a
  // SOLVE por productKind. Se valida como relación derivada (mandato §27:
  // "Product sin universo" = productKind ausente/desconocido).
  if (r.productKind === "saas") {
    info.relations++;
    if (!IDs.Universe.has("unv-solve")) fail(`${r.id}: universo SOLVE implícito no existe`);
  } else fail(`${r.id}: productKind ausente o desconocido (universo no derivable)`);
  refArray(r, "sectors", "Sector");
  refArray(r, "relatedCases", "CaseStudy");
  refArray(r, "relatedInsights", "Insight");
  mediaRef(r, r.logo, r.id);
  mediaRef(r, r.heroMedia, r.id);
  (r.gallery ?? []).forEach((m) => mediaRef(r, m, r.id));
  (r.screenshots ?? []).forEach((m) => mediaRef(r, m, r.id));
  mediaRef(r, r.video, r.id);
  ref(r, "cta", "CTA");
  checkSeo(r);
  if (r.status === "published" && !(r.sectors?.length)) fail(`${r.id}: publicado sin sectores`);
  if (r.slug === "klyra" && (r.url !== null && r.url !== undefined))
    fail(`${r.id}: Klyra no debe tener URL inventada (D56)`);
}

/* ---------- 6. Cases ---------- */
for (const r of cas) {
  ref(r, "sector", "Sector", { required: true });
  ref(r, "universe", "Universe", { required: true });
  refArray(r, "relatedServices", "Service");
  refArray(r, "relatedProducts", "Product");
  mediaRef(r, r.heroMedia, r.id);
  (r.gallery ?? []).forEach((m) => mediaRef(r, m, r.id));
  (r.videos ?? []).forEach((m) => mediaRef(r, m, r.id));
  ref(r, "cta", "CTA");
  checkSeo(r);
  if (r.status === "published") {
    if (r.clientVisibility === "public" && !r.clientVisibilityNote?.includes("MOCK"))
      fail(`${r.id}: cliente público sin autorización documentada (gate G4)`);
    if (r.testimonial && r.testimonial.consent !== true)
      fail(`${r.id}: testimonial sin consentimiento no puede publicarse (gate G7)`);
    for (const res of r.results ?? [])
      if (!res.mock && !res.source) fail(`${r.id}: métrica '${res.label}' sin marca mock ni fuente (no inventar resultados)`);
    if (!r.publishedAt) fail(`${r.id}: publicado sin publishedAt`);
  }
}

/* ---------- 7. Insights ---------- */
for (const r of ins) {
  ref(r, "category", "InsightCategory", { required: true });
  ref(r, "author", "Author", { required: true });
  ref(r, "relatedUniverse", "Universe");
  refArray(r, "relatedServices", "Service");
  refArray(r, "relatedProducts", "Product");
  refArray(r, "relatedSectors", "Sector");
  mediaRef(r, r.heroMedia, r.id);
  ref(r, "cta", "CTA") ?? null;
  // bloques de contenido estructurado
  for (const b of r.content ?? []) {
    if (b.media) mediaRef(r, b.media, r.id);
    if (b.cta) info.relations++;
    if (b.type === "cta" && b.cta && !IDs.CTA.has(b.cta)) fail(`${r.id}: bloque cta → '${b.cta}' no resuelve`);
  }
  checkSeo(r);
  if (r.status === "published") {
    const a = autById[r.author];
    if (!a?.bio || !a?.photo) fail(`${r.id}: publicado sin autor con bio+foto (gate G8, authorship GEO)`);
    if (!r.publishedAt) fail(`${r.id}: publicado sin publishedAt`);
  }
  if (r.status === "scheduled" && !r.publishedAt)
    fail(`${r.id}: SCHEDULED sin fecha de publicación`);
}

/* ---------- 8. Authors ---------- */
for (const r of aut) {
  mediaRef(r, r.photo, r.id);
  checkSeo(r);
}

/* ---------- 9. Media ---------- */
for (const r of med) {
  if (!MEDIA_TYPES.has(r.type)) fail(`${r.id}: tipo de media '${r.type}' inválido`);
  if (!r.alt?.trim()) fail(`${r.id}: alt vacío (obligatorio, a11y)`);
  if (!COPYRIGHT.has(r.copyrightStatus)) fail(`${r.id}: copyrightStatus inválido`);
  if (!r.mock && r.copyrightStatus === "PENDING_REVIEW")
    fail(`${r.id}: media real con copyright pendiente no puede usarse (gate G3)`);
  if (r.type === "VIDEO" && !r.poster) fail(`${r.id}: VIDEO sin poster (obligatorio)`);
  if (r.poster) mediaRef(r, r.poster, r.id);
  if (r.mobileAsset) mediaRef(r, r.mobileAsset, r.id);
}

/* ---------- 10. CTAs ---------- */
for (const r of cta) {
  if (!r.label?.trim()) fail(`${r.id}: CTA sin label`);
  if (!r.url?.trim()) fail(`${r.id}: CTA sin destino (url vacía)`);
  if (!CTA_TYPES.has(r.type)) fail(`${r.id}: CTA type '${r.type}' inválido`);
  if (!r.trackingId?.trim()) fail(`${r.id}: CTA sin trackingId`);
  ref(r, "universe", "Universe");
}

/* ---------- 11. Navigation ---------- */
for (const r of nav) {
  if (!r.label?.trim()) fail(`${r.id}: item de navegación sin label`);
  if (!r.href?.trim()) fail(`${r.id}: item de navegación sin URL`);
  ref(r, "parentId", "Navigation");
  ref(r, "universe", "Universe");
}
// un solo nivel bajo el universo (D26/D35)
const navById = Object.fromEntries(nav.map((n) => [n.id, n]));
for (const r of nav) {
  if (r.parentId && navById[r.parentId]?.parentId)
    fail(`${r.id}: tercer nivel de navegación no permitido (modelo D26: un nivel bajo el universo)`);
}

/* ---------- 12. Pages (templates + bloques del registro) ---------- */
for (const r of pgs) {
  if (!PAGE_TEMPLATES.has(r.template)) fail(`${r.id}: template '${r.template}' fuera de los 7 aprobados`);
  ref(r, "universe", "Universe");
  if (r.template === "UNIVERSE" && !r.universe) fail(`${r.id}: template UNIVERSE sin universo`);
  if (!(r.blocks?.length)) fail(`${r.id}: página sin bloques`);
  for (const b of r.blocks ?? []) {
    if (!BLOCK_NAMES.has(b.type)) fail(`${r.id}: bloque '${b.type}' no está en @proefex/blocks-schema (page builder prohibido)`);
    const props = b.props ?? {};
    // media refs dentro de props
    if (props.image?.id) mediaRef(r, props.image.id, r.id);
    if (props.poster?.id) mediaRef(r, props.poster.id, r.id);
    if (props.backgroundVideo?.id) mediaRef(r, props.backgroundVideo.id, r.id);
    if (props.video?.id) mediaRef(r, props.video.id, r.id);
    for (const m of props.gallery ?? []) mediaRef(r, m.id, r.id);
    if (props.backgroundVideo && !props.backgroundVideo.id && props.backgroundVideo.altText)
      fail(`${r.id}: HeroTech con backgroundVideo sin referencia a MediaAsset`);
  }
  checkSeo(r);
  if (r.status === "published" && !r.seo?.ogImage && !settings.defaultSeo?.ogImage)
    fail(`${r.id}: publicado sin ogImage ni fallback en SiteSettings (gate G1)`);
}

/* ---------- 13. Milestones (12+ años) ---------- */
for (const r of ms) {
  if (!r.title?.includes("DEMO MILESTONE")) fail(`${r.id}: hito sin marca DEMO MILESTONE`);
  if (r.status !== "draft") fail(`${r.id}: hitos MOCK deben permanecer en draft hasta evidencia real`);
  mediaRef(r, r.media, r.id);
}

/* ---------- 14. Legal ---------- */
for (const r of legal) {
  if (!r.body?.includes("LEGAL MOCK")) fail(`${r.id}: documento legal sin marca LEGAL MOCK`);
  if (r.status !== "draft") fail(`${r.id}: documento legal MOCK debe permanecer en draft`);
  if (r.seo && !String(r.seo.robots ?? "").includes("noindex"))
    fail(`${r.id}: legal MOCK debe ser noindex`);
}

/* ---------- 15. Redirects ---------- */
for (const r of red) {
  if (!r.source?.startsWith("/")) fail(`${r.id}: source debe ser path absoluto`);
  if (!r.destination?.startsWith("/")) fail(`${r.id}: destination debe ser path absoluto`);
  if (r.source === r.destination) fail(`${r.id}: redirect a sí mismo`);
  if (![301, 302].includes(r.statusCode)) fail(`${r.id}: statusCode inválido`);
}

/* ---------- 16. Revisions ---------- */
const byEntity = {};
for (const r of rev) {
  if (!IDs[r.entity]?.has(r.entityId)) fail(`${r.id}: revisión sobre entidad inexistente (${r.entity}/${r.entityId})`);
  byEntity[`${r.entity}/${r.entityId}`] = (byEntity[`${r.entity}/${r.entityId}`] ?? 0) + 1;
}
if (!Object.values(byEntity).some((n) => n >= 3))
  fail("revisiones: ninguna entidad con ≥3 revisiones (probar versionado múltiple)");

/* ---------- 17. Audit log (append-only) ---------- */
let lastTs = 0;
for (const r of audit) {
  if (!AUDIT_ACTIONS.has(r.action)) fail(`${r.id}: acción '${r.action}' fuera del audit log aprobado (F3.1 §3.17)`);
  const ts = Date.parse(r.timestamp);
  if (Number.isNaN(ts)) fail(`${r.id}: timestamp inválido`);
  else if (ts < lastTs) fail(`${r.id}: audit log no está en orden temporal (append-only)`);
  else lastTs = ts;
  if (!IDs[r.entity]?.has(r.entityId) && r.entity !== "cms_user" && r.entity !== "SiteSettings")
    fail(`${r.id}: entrada de audit sobre entidad inexistente (${r.entity}/${r.entityId})`);
}

/* ---------- 18. SiteSettings / LeadForm ---------- */
if (settings.contact?.email !== null || settings.contact?.phone !== null)
  fail("settings: el email/teléfono de contacto deben ser null (no inventar datos reales)");
if (settings.analytics.measurementId && settings.analytics.measurementId !== "CONTENT_REQUIRED")
  fail("settings: measurementId debe ser CONTENT_REQUIRED (sin IDs reales, sin secretos)");
const secretLike = JSON.stringify(settings).match(/(api[_-]?key|token|password|service[_-]?role)["\s:]+["'][^"]+["']/i);
if (secretLike) fail("settings: posible secreto almacenado en contenido CMS");
if (leadform.destination !== "Turu CRM" || !leadform.destinationConfirmed)
  fail("leadform: destino Turu CRM confirmado (D17) no reflejado");
const fieldNames = (leadform.fields ?? []).map((f) => f.name).join(",");
for (const expected of ["nombre", "apellidos", "empresa", "cargo", "email", "telefono", "codigo_pais", "servicio", "sector", "mensaje"])
  if (!fieldNames.includes(expected)) fail(`leadform: campo confirmado '${expected}' ausente`);
for (const f of leadform.fields ?? []) if (!f.confirmed) fail(`leadform: campo '${f.name}' sin marca confirmed`);
for (const c of leadform.consents ?? []) {
  if (!["privacy", "analytics", "marketing"].includes(c.type)) fail(`leadform: consent '${c.type}' inválido`);
  if (!IDs.LegalDocument.has(c.textRef)) fail(`leadform: consent '${c.type}' refiere a documento legal inexistente`);
}

/* ---------- 19. Categorías insights: PROPOSED, no definitivas ---------- */
for (const r of cats) {
  if (r.status !== "proposed") fail(`${r.id}: categoría debe permanecer PROPOSED (D55)`);
}

/* ---------- 20. Cobertura del workflow y variantes SEO ---------- */
const statusesSeen = new Set(
  [uni, sec, svc, prd, cas, ins, aut, pgs].flat().map((r) => r.status).filter(Boolean)
);
for (const s of STATUSES)
  if (!statusesSeen.has(s)) fail(`cobertura: ningún registro en estado '${s}' (se requiere ejemplo de cada estado)`);

const seoVariants = {
  completo: 0, incompleto: 0, noindex: 0, canonicalOverride: 0,
};
for (const r of [...uni, ...sec, ...svc, ...prd, ...cas, ...ins, ...pgs]) {
  const s = r.seo ?? {};
  const complete = Boolean(s.metaTitle && s.metaDescription && s.ogImage);
  if (complete) seoVariants.completo++;
  else seoVariants.incompleto++;
  if (s.robots?.startsWith("noindex")) seoVariants.noindex++;
  if (s.canonicalUrl) seoVariants.canonicalOverride++;
}
for (const [k, v] of Object.entries(seoVariants))
  if (v === 0) fail(`cobertura SEO: sin ejemplo de variante '${k}'`);

function checkSeo(r) {
  const s = r.seo;
  if (!s) return;
  if (s.metaTitle && s.metaTitle.length > 60) fail(`${r.id}: metaTitle >60 chars`);
  if (s.metaDescription && s.metaDescription.length > 160) fail(`${r.id}: metaDescription >160 chars`);
  if (s.ogImage) mediaRef(r, s.ogImage, r.id);
  if (r.status === "published") {
    if (!s.metaTitle || !s.metaDescription) fail(`${r.id}: publicado sin SEO completo (gate G1)`);
    if (!s.ogImage && !settings.defaultSeo?.ogImage) fail(`${r.id}: publicado sin ogImage ni fallback (gate G1)`);
  }
}

/* ---------- Reporte ---------- */
console.log("=".repeat(64));
console.log("Validación del dataset MOCK — data/mock/ (Fase 3.1.2)");
console.log("=".repeat(64));
console.log(`Archivos: ${files.length} · Registros: ${info.records} · Relaciones verificadas: ${info.relations}`);
console.log(`Cobertura de estados: ${[...statusesSeen].sort().join(", ")}`);
console.log(`Variantes SEO: completo=${seoVariants.completo} incompleto=${seoVariants.incompleto} (drafts) noindex=${seoVariants.noindex} canonicalOverride=${seoVariants.canonicalOverride}`);

if (errors.length) {
  console.error(`\nERROR (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\nOK: dataset MOCK válido — slugs, relaciones, estados, SEO, media y gates sin errores.");
