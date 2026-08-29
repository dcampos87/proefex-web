import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const GTM_ID = "GTM-PH6SHS9X";

/**
 * Snippet oficial de Google Tag Manager. Se inyecta como `<script>` plano
 * dentro del `<head>` (y no con `next/script`) para que quede presente en el
 * HTML estático: Next.js 16 serializa los `next/script` en `self.__next_s` y
 * los inyecta recién en la hidratación, lo que impide que Google detecte la
 * etiqueta al inspeccionar el código fuente.
 */
const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROEFEX · Plataforma corporativa de aprendizaje",
  description:
    "PROEFEX unifica LMS, CMS y analítica de progreso en una sola experiencia fluida. Cursos online, contenido de marca y formación corporativa medible.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* Google Tag Manager: script plano en el HTML estático para que Google lo detecte. */}
        <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript): respaldo para navegadores sin JavaScript. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
