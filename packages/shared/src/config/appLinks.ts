const siteBase = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const learnBase = (process.env.NEXT_PUBLIC_LEARN_URL ?? "").replace(/\/$/, "");

/**
 * Resuelve rutas entre las distintas superficies del producto.
 * Por defecto devuelve rutas relativas (mismo origen); al definir
 * NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_LEARN_URL en cada build se generan
 * enlaces absolutos entre dominios (site, learn, admin).
 */
export const appLinks = {
  site: (path: string) => `${siteBase}${path}`,
  learn: (path: string) => `${learnBase}${path}`,
};
