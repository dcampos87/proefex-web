import { z, type ZodDiscriminatedUnionOption } from "zod";

/**
 * @proefex/blocks-schema
 * Contratos de bloques compartidos entre CMS y frontend (Docs 05 y 06).
 *
 * Fase 1: BlockProps comunes + 4 schemas de referencia (HeroCore/HeroTech/
 * HeroCreative/CTA) + webhook de publicación A5.
 * Fase 2: catálogo completo de los 19 bloques (Doc 05 §3), compatible hacia
 * atrás con el registro de Fase 1.
 */

export const universeSchema = z.enum(["core", "tech", "growup"]);
export type Universe = z.infer<typeof universeSchema>;

export const contentStatusSchema = z.enum([
  "draft",
  "in_review",
  "scheduled",
  "published",
]);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

/** Referencia a media gestionada por el CMS (Doc 13). */
export const mediaRefSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["image", "video", "svg", "lottie", "gif", "embed"]),
  altText: z.string().min(1), // obligatorio para publicar (accesibilidad)
  caption: z.string().optional(),
  focalPoint: z.object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) }).optional(),
});
export type MediaRef = z.infer<typeof mediaRefSchema>;

export const ctaSchema = z.object({
  label: z.string().min(1).max(40),
  url: z.string().min(1),
  style: z.enum(["primary", "secondary", "ghost"]),
});
export type Cta = z.infer<typeof ctaSchema>;

export const animationPresetSchema = z.enum([
  "none",
  "fade-rise",
  "reveal-lines",
  "panel-ignite",
  "draw-on-scroll",
  "counter",
  "marquee",
  "parallax-subtle",
]);

/** Propiedades comunes de TODO bloque (Doc 05 §3). */
export const blockPropsSchema = z.object({
  layout: z.enum(["default", "split", "full", "overlay"]).default("default"),
  theme: z.enum(["core", "tech", "growup", "inherit"]).default("inherit"),
  background: z
    .enum(["solid", "gradient", "grid", "image", "video", "none"])
    .default("none"),
  animation: animationPresetSchema.default("fade-rise"),
  alignment: z.enum(["left", "center", "right"]).default("left"),
  spacing: z.enum(["sm", "md", "lg", "xl"]).default("lg"),
  cta: z.array(ctaSchema).max(2).default([]),
  responsive: z
    .object({
      hideOn: z.array(z.enum(["mobile", "tablet", "desktop"])).default([]),
    })
    .default({ hideOn: [] }),
});
export type BlockProps = z.infer<typeof blockPropsSchema>;

/** HeroCore — hero institucional claro/azul. */
export const heroCoreSchema = blockPropsSchema.extend({
  title: z.string().min(1).max(80),
  subtitle: z.string().max(200).optional(),
});

/** HeroTech — hero oscuro tecnológico; nota: vídeo solo lg+ (D5/D9). */
export const heroTechSchema = blockPropsSchema.extend({
  title: z.string().min(1).max(60),
  subtitle: z.string().max(160).optional(),
  kicker: z.string().max(40).optional(), // etiqueta mono (D11)
  backgroundVideo: mediaRefSchema.optional(), // requiere poster en media
  enableParticles: z.boolean().default(true), // desactivado en móvil/reduced-motion
});

/** HeroCreative — hero editorial Grow Up; tipografía XXL. */
export const heroCreativeSchema = blockPropsSchema.extend({
  title: z.string().min(1).max(60),
  highlightWord: z.string().max(30).optional(),
  collage: z.array(mediaRefSchema).max(3).default([]),
});

/** CTA — llamada a la acción configurable. */
export const ctaBlockSchema = blockPropsSchema.extend({
  title: z.string().min(1).max(60),
  description: z.string().max(200).optional(),
});

/* ------------------------------------------------------------------ */
/* Fase 2 — bloques restantes del catálogo (Doc 05 §3)                */
/* ------------------------------------------------------------------ */

/** Item de grid de servicios/productos/sectores. */
export const cardItemSchema = z.object({
  index: z.string().max(8).optional(), // numeración mono TECH: "01"
  title: z.string().min(1).max(80),
  description: z.string().max(280).optional(),
  href: z.string().optional(),
  icon: z.string().optional(), // nombre del icono del set propio (Doc 14 §8)
  meta: z.string().max(60).optional(), // línea mono técnica (specs, estado)
});

export const serviceGridSchema = blockPropsSchema.extend({
  items: z.array(cardItemSchema).min(1).max(12),
});

export const sectorGridSchema = blockPropsSchema.extend({
  items: z.array(z.object({ name: z.string().min(1).max(60), href: z.string().optional() })).min(1).max(12),
});

export const saasShowcaseSchema = blockPropsSchema.extend({
  products: z
    .array(
      z.object({
        name: z.string().min(1).max(60),
        domain: z.string().max(80).optional(),
        // "reserved" solo para productos futuros sin información pública (Klyra)
        status: z.enum(["available", "announced", "reserved"]).default("announced"),
      }),
    )
    .min(1)
    .max(8),
});

/** StatsSection — cifras SOLO con datos reales provistos (Doc 09 §4.4). */
export const statsSchema = blockPropsSchema.extend({
  stats: z
    .array(z.object({ value: z.string().min(1).max(20), label: z.string().min(1).max(80) }))
    .max(6),
});

export const processSchema = blockPropsSchema.extend({
  steps: z
    .array(
      z.object({
        index: z.string().min(1).max(8),
        title: z.string().min(1).max(80),
        description: z.string().max(280).optional(),
      }),
    )
    .min(1)
    .max(6),
});

export const timelineSchema = blockPropsSchema.extend({
  items: z
    .array(
      z.object({
        period: z.string().max(40),
        title: z.string().min(1).max(80),
        description: z.string().max(280).optional(),
      }),
    )
    .min(1)
    .max(10),
});

export const faqSchema = blockPropsSchema.extend({
  items: z
    .array(z.object({ question: z.string().min(1).max(200), answer: z.string().min(1).max(1000) }))
    .min(1)
    .max(12),
});

export const blogGridSchema = blockPropsSchema.extend({
  posts: z
    .array(z.object({ title: z.string().min(1).max(120), category: z.string().max(40).optional(), href: z.string().optional() }))
    .max(6),
});

/** LogoWall — solo marcas reales autorizadas (Doc 05 §3). */
export const logoWallSchema = blockPropsSchema.extend({
  names: z.array(z.string().min(1).max(60)).max(10),
});

export const imageTextSplitSchema = blockPropsSchema.extend({
  title: z.string().min(1).max(80),
  body: z.string().max(600).optional(),
  image: mediaRefSchema.optional(),
  mediaSide: z.enum(["left", "right"]).default("right"),
});

export const videoSectionSchema = blockPropsSchema.extend({
  title: z.string().max(80).optional(),
  poster: mediaRefSchema, // poster obligatorio (Doc 13/15)
  video: mediaRefSchema.optional(), // D5 diferido: proveedor pendiente
});

/** Testimonial — requiere consentimiento explícito (Doc 05 §2.10). */
export const testimonialSchema = blockPropsSchema.extend({
  quote: z.string().min(1).max(400),
  authorName: z.string().min(1).max(80),
  authorRole: z.string().max(80).optional(),
  company: z.string().max(80).optional(),
  consent: z.boolean(), // obligatorio: true solo con autorización explícita
});

export const caseStudySchema = blockPropsSchema.extend({
  title: z.string().min(1).max(100),
  sector: z.string().max(60).optional(),
  summary: z.string().max(300).optional(),
  gallery: z.array(mediaRefSchema).max(6).default([]),
  // results: solo métricas provistas por el cliente (Doc 05 §2.6)
  results: z.array(z.object({ label: z.string().max(80), value: z.string().max(20) })).max(6).default([]),
});

/** ContactSection — destino de leads: Turu CRM (D17); integración fase posterior. */
export const contactSectionSchema = blockPropsSchema.extend({
  title: z.string().min(1).max(80),
  description: z.string().max(300).optional(),
  services: z.array(z.string().min(1).max(80)).min(1),
  sectors: z.array(z.string().min(1).max(60)).min(1),
});

/** Registro de bloques: nombre → schema. Fuente única para CMS y frontend. */
export const blockRegistry = {
  HeroCore: heroCoreSchema,
  HeroTech: heroTechSchema,
  HeroCreative: heroCreativeSchema,
  CTA: ctaBlockSchema,
  ServiceGrid: serviceGridSchema,
  SectorGrid: sectorGridSchema,
  SaaSShowcase: saasShowcaseSchema,
  StatsSection: statsSchema,
  Process: processSchema,
  Timeline: timelineSchema,
  FAQ: faqSchema,
  BlogGrid: blogGridSchema,
  LogoWall: logoWallSchema,
  ImageTextSplit: imageTextSplitSchema,
  VideoSection: videoSectionSchema,
  Testimonial: testimonialSchema,
  CaseStudy: caseStudySchema,
  ContactSection: contactSectionSchema,
} as const;

export type BlockName = keyof typeof blockRegistry;

const blockOptions = (
  Object.entries(blockRegistry) as [BlockName, (typeof blockRegistry)[BlockName]][]
).map(([type, schema]) => z.object({ type: z.literal(type), props: schema })) as unknown as [
  ZodDiscriminatedUnionOption<"type">,
  ...ZodDiscriminatedUnionOption<"type">[],
];

export const pageBlockSchema = z.discriminatedUnion("type", blockOptions);
export type PageBlock = z.infer<typeof pageBlockSchema>;

/** Payload del webhook de publicación (A5: CMS → api → revalidación web). */
export const publishWebhookSchema = z.object({
  event: z.enum(["published", "unpublished"]),
  contentType: z.enum([
    "page",
    "service",
    "product",
    "saas",
    "sector",
    "case",
    "post",
  ]),
  slug: z.string().min(1),
});
export type PublishWebhook = z.infer<typeof publishWebhookSchema>;
