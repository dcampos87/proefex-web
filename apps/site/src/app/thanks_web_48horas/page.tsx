import type { Metadata } from "next";
import { Suspense } from "react";

import { MetaPixel } from "@/features/web48/MetaPixel";
import { ThanksContent } from "@/features/web48/ThanksContent";

export const metadata: Metadata = {
  title: "¡Tu bono está separado! | PROEFEX",
  description:
    "Registramos tus datos. Habla con un asesor y valida tu oferta antes de que expire el contador.",
  robots: { index: false, follow: false },
};

export default function ThanksWeb48HorasPage() {
  return (
    <div className="hero-glow relative flex min-h-screen flex-col bg-proefex-navy text-white">
      <MetaPixel trackLead />

      <header className="flex items-center justify-center px-6 pt-6">
        <span className="text-sm font-bold uppercase tracking-[0.35em] text-white/85">PROEFEX</span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-16">
        <Suspense fallback={null}>
          <ThanksContent />
        </Suspense>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} PROEFEX · Todos los derechos reservados
      </footer>
    </div>
  );
}
