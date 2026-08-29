import type { Metadata } from "next";

import { Countdown48h } from "@/features/web48/Countdown48h";
import { HEADLINE, SUBTITLE } from "@/features/web48/constants";
import { LeadForm48 } from "@/features/web48/LeadForm48";
import { MetaPixel } from "@/features/web48/MetaPixel";
import { MockupVisual } from "@/features/web48/MockupVisual";

export const metadata: Metadata = {
  title: "Lanza la página web de tu empresa hoy | PROEFEX",
  description:
    "Llévate facturación electrónica y libro de reclamaciones gratis el primer mes. Solo 10 cupos disponibles a nivel nacional.",
  robots: { index: false, follow: false },
};

export default function LandingWeb48HorasPage() {
  return (
    <div className="hero-glow relative min-h-screen bg-proefex-navy text-white">
      <MetaPixel />

      {/* Anti-header: marca visible, cero navegación */}
      <header className="flex items-center justify-center px-6 pt-6">
        <span className="text-sm font-bold uppercase tracking-[0.35em] text-white/85">PROEFEX</span>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full border border-proefex-amber/50 bg-proefex-amber/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-proefex-amber">
            Oferta válida solo por 48 horas
          </p>
          <h1 className="mt-6 text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {HEADLINE}
          </h1>
          <p className="mt-5 text-lg font-medium text-white/80 sm:text-xl">{SUBTITLE}</p>
        </div>

        <div className="mt-12 space-y-8">
          <MockupVisual />
          <Countdown48h />
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <LeadForm48 />
        </div>
      </main>

      {/* Pie anti-distracción: sin enlaces */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} PROEFEX · Todos los derechos reservados
      </footer>
    </div>
  );
}
