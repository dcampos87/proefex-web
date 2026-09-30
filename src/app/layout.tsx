import type { Metadata } from "next";
import "./globals.css";

/**
 * Metadata base con dominio canónico aprobado (A1).
 * Fuentes self-hosted se integrarán en la siguiente iteración de foundations
 * (next/font con subsetting — Doc 16 §2.4).
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.proefexperu.com"),
  title: {
    default: "PROEFEX",
    template: "%s | PROEFEX",
  },
  description: "PROEFEX — tecnología, marketing, formación y productos tecnológicos.",
  openGraph: {
    siteName: "PROEFEX",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body data-universe="core">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
