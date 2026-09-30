import { z } from "zod";

/**
 * @proefex/blocks-schema
 * Contratos de bloques compartidos entre CMS y frontend (Docs 05 y 06).
 * Fase 1: schemas de referencia para los 3 heroes + CTA y la infraestructura
 * común de BlockProps. Los 19 bloques del catálogo se completan en Fase 2,
 * uno a uno, con validación.
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

/** Registro de bloques: nombre → schema. Fuente única para CMS y frontend. */
export const blockRegistry = {
  HeroCore: heroCoreSchema,
  HeroTech: heroTechSchema,
  HeroCreative: heroCreativeSchema,
  CTA: ctaBlockSchema,
} as const;

export type BlockName = keyof typeof blockRegistry;

export const pageBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("HeroCore"), props: heroCoreSchema }),
  z.object({ type: z.literal("HeroTech"), props: heroTechSchema }),
  z.object({ type: z.literal("HeroCreative"), props: heroCreativeSchema }),
  z.object({ type: z.literal("CTA"), props: ctaBlockSchema }),
]);
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
