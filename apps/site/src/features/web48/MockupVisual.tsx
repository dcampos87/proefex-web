/**
 * Visual de urgencia: mockup de la web de la oferta.
 *
 * Mientras el cliente entrega el mockup real, se renderiza una maqueta
 * ligera hecha solo con CSS (cero KB de imágenes, no bloquea LCP).
 * Para usar el mockup real: colocar el archivo en
 * `apps/site/public/images/mockup-web-48h.png` y reemplazar el bloque
 * `<MockupPlaceholder />` por:
 *
 *   <img
 *     src="/images/mockup-web-48h.png"
 *     alt="Adelanto de la página web de tu empresa"
 *     width={960}
 *     height={600}
 *     className="w-full rounded-b-[1.35rem]"
 *   />
 */
export function MockupVisual() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-proefex-azure/20 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-proefex-navy-deep shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
        {/* Barra de navegador */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-proefex-navy px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-proefex-red/80" />
          <span className="h-3 w-3 rounded-full bg-proefex-amber/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 flex-1 truncate rounded-full bg-white/10 px-4 py-1 text-[11px] text-white/60">
            www.tuempresa.com
          </span>
        </div>
        {/* Maqueta del sitio */}
        <div className="space-y-4 bg-gradient-to-b from-proefex-navy-deep to-proefex-navy p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded-full bg-proefex-orange/80" />
            <div className="hidden gap-2 sm:flex">
              <div className="h-3 w-14 rounded-full bg-white/20" />
              <div className="h-3 w-14 rounded-full bg-white/20" />
              <div className="h-3 w-14 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-6 w-3/4 rounded-full bg-white/85" />
            <div className="h-6 w-2/3 rounded-full bg-white/60" />
            <div className="h-3 w-full rounded-full bg-white/20" />
            <div className="h-3 w-5/6 rounded-full bg-white/20" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-10 w-36 rounded-xl bg-proefex-orange" />
            <div className="h-10 w-28 rounded-xl border border-white/25" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="h-20 rounded-xl bg-white/10" />
            <div className="h-20 rounded-xl bg-white/10" />
            <div className="h-20 rounded-xl bg-white/10" />
          </div>
          <span className="sr-only">Adelanto de la página web de tu empresa</span>
        </div>
      </div>
    </div>
  );
}
