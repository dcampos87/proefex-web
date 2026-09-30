import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A4 aprobado: SSR/ISR con contenido en HTML; no forzar salida estática.
  // Dominio canónico (A1) para metadata y canonicals.
  trailingSlash: false,
  poweredByHeader: false,
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
