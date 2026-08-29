import type { Metadata } from "next";

import { Countdown48h } from "@/features/web48/Countdown48h";
import { BONUS_LINE, HEADLINE, PRICE_LABEL, SUBTITLE } from "@/features/web48/constants";
import { LeadForm48 } from "@/features/web48/LeadForm48";
import { MetaPixel } from "@/features/web48/MetaPixel";
import { MockupVisual } from "@/features/web48/MockupVisual";

export const metadata: Metadata = {
  title: "Lanza la página web de tu empresa hoy | PROEFEX",
  description:
    "Llévate facturación electrónica y libro de reclamaciones gratis el primer mes. Solo 10 cupos disponibles a nivel nacional.",
  robots: { index: false, follow: false },
};

const OFFER_BULLETS = [
  "Facturación electrónica gratis el primer mes",
  "Libro de reclamaciones gratis el primer mes",
  `Precio único de ${PRICE_LABEL}`,
];

export default function LandingWeb48HorasPage() {
  return (
    <div className="hero-glow relative flex min-h-dvh flex-col bg-proefex-navy text-white">
      <MetaPixel />

      {/* Anti-header: marca + urgencia en una sola línea, cero navegación */}
      <header className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/85 sm:text-sm">
          PROEFEX
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-proefex-amber/50 bg-proefex-amber/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-proefex-amber sm:text-[11px]">
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-proefex-amber opacity-70 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-proefex-amber" />
          </span>
          Solo por 48 horas
        </span>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pb-3 sm:px-6 lg:px-10 lg:pb-6">
        <div className="m-auto grid w-full max-w-[26rem] gap-3 pt-4 text-center lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-0 lg:text-left">
          <div className="space-y-3 lg:space-y-5">
            <h1 className="animate-rise text-balance text-[26px] font-extrabold leading-[1.12] sm:text-3xl lg:text-[2.6rem] xl:text-5xl">
              {HEADLINE}
            </h1>
            <p
              className="animate-rise text-sm font-semibold text-proefex-amber sm:text-base"
              style={{ animationDelay: "70ms" }}
            >
              {BONUS_LINE}
            </p>
            <p
              className="animate-rise text-sm leading-snug text-white/75 sm:text-base"
              style={{ animationDelay: "120ms" }}
            >
              {SUBTITLE}
            </p>
            <div className="animate-rise" style={{ animationDelay: "160ms" }}>
              <Countdown48h />
            </div>

            <ul className="hidden space-y-2.5 lg:block" aria-label="Beneficios de la oferta">
              {OFFER_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5 text-sm text-white/80">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-proefex-amber"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.6a1 1 0 0 1-1.42.003L3.29 9.8a1 1 0 1 1 1.42-1.408l3.79 3.813 6.79-6.908a1 1 0 0 1 1.414-.006Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="hidden animate-rise xl:block" style={{ animationDelay: "220ms" }}>
              <MockupVisual />
            </div>
          </div>

          <div className="animate-rise" style={{ animationDelay: "140ms" }}>
            <LeadForm48 />
          </div>
        </div>
      </main>

      {/* Pie anti-distracción: sin enlaces */}
      <footer className="pb-3 text-center text-[10px] text-white/35 sm:pb-4">
        © {new Date().getFullYear()} PROEFEX · Todos los derechos reservados
      </footer>
    </div>
  );
}
