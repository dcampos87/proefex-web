import type { MetadataRoute } from "next";

/**
 * robots.txt de producción. Se permite el rastreo de todo el sitio para que
 * los robots VEAN los meta robots noindex de las páginas CONTENT_REQUIRED
 * (bloquear en robots.txt impediría verlos). Los legales aún no existen
 * como contenido aprobado; se publican noindex.
 */
const BASE = "https://www.proefexperu.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
