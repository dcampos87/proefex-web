import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A4 aprobado: SSR/ISR con contenido en HTML; no forzar salida estática.
  // Dominio canónico (A1) para metadata y canonicals.
  trailingSlash: false,
  poweredByHeader: false,
  // Aísla los artefactos de desarrollo de los de producción: ejecutar
  // `next dev` sobre un .next generado por `next build` (o con otro
  // servidor vivo sobre el mismo directorio) corrompió el serving de
  // assets — HTML referenciando chunks inexistentes y CSS/JS servidos
  // como text/plain, que con nosniff el navegador bloquea → páginas
  // sin estilos. Ver docs/fase-2/css-rendering-diagnostic.md.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    // Doc 13: AVIF/WebP con fallback; formatos servidos por transform/CDN.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
