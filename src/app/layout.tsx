import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/Footer";

/**
 * Metadata base con dominio canónico aprobado (A1).
 *
 * Fuentes self-hosted vía next/font/local (Doc 16 §2.4 — subsetting latino,
 * display swap). next/font/google falló en este entorno (loader de Google
 * Fonts); la alternativa local es además la recomendación del Doc 16.
 * Nota de presupuesto: Doc 16 fija "≤ 2 familias × 2 pesos"; D11 aprueba una
 * tercera familia (Source Code Pro) con UN peso y uso restringido a
 * metadatos/etiquetas. Desviación documentada (docs/fase-2/).
 * Lexend Deca se sirve como fuente variable (400–600 en un archivo).
 */
const lexend = localFont({
  src: "../fonts/lexend-deca-var.woff2",
  weight: "400 700",
  variable: "--font-lexend",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "../fonts/poppins-600.woff2", weight: "600" },
    { path: "../fonts/poppins-700.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const sourceCode = localFont({
  src: "../fonts/source-code-pro-400.woff2",
  weight: "400",
  variable: "--font-source-code",
  display: "swap",
});

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
    <html
      lang="es"
      className={`${lexend.variable} ${poppins.variable} ${sourceCode.variable}`}
    >
      <body data-universe="core">
        <script
          // Gate de motion: evita FOUC oculto y garantiza contenido visible sin JS.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
