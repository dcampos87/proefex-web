import type { MetadataRoute } from "next";

/**
 * Sitemap de producción (MVP). Solo rutas indexables con contenido real:
 * los RouteStub y los índices CONTENT_REQUIRED (/casos, /sectores,
 * /showcase) van con robots noindex y por tanto NO se listan.
 * La lista se ampliará en Fase 3 cuando el CMS sirva las rutas dinámicas.
 */
const BASE = "https://www.proefexperu.com";

const INDEXABLE_ROUTES = [
  "/",
  "/tech",
  "/grow-up",
  "/solutions",
  "/learns",
  "/equip",
  "/insights",
  "/contacto",
  "/tech/desarrollo-de-software",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/contacto" ? 0.9 : 0.8,
  }));
}
