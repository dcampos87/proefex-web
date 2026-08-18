import { navLinks } from "@/data/landing";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-proefex-navy-deep/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-2.5 font-semibold tracking-[0.28em] text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-proefex-orange text-sm font-extrabold text-proefex-navy">
              P
            </span>
            <span className="text-sm">PROEFEX</span>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Plataforma corporativa de aprendizaje: LMS, CMS y analítica de progreso en una sola
            experiencia fluida.
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/65 transition-colors hover:text-proefex-amber"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <form className="flex w-full max-w-sm flex-col gap-3" action="#" aria-label="Newsletter">
          <label htmlFor="newsletter-email" className="text-sm font-medium text-white/85">
            Recibe novedades y recursos de aprendizaje
          </label>
          <div className="flex gap-2">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="tu@empresa.com"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-proefex-amber focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-proefex-orange px-5 py-3 text-sm font-semibold text-proefex-navy transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Suscribirme
            </button>
          </div>
        </form>
      </div>

      <div className="border-t border-white/5 py-6">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          © 2026 PROEFEX · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
