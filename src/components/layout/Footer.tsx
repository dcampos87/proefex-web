import Link from "next/link";
import { CORE_LINKS, PILLARS } from "./nav-data";

/**
 * Footer global (recalibración): estructura por pilares (Nivel 2/3, §23).
 * Rutas de segundo nivel apuntan a la arquitectura propuesta (D24).
 * Textos legales y datos de contacto reales: CONTENT_REQUIRED (D17).
 */
export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--pfx-blue)",
        color: "rgba(255,255,255,0.78)",
        marginTop: "var(--space-12)",
      }}
    >
      <div className="container-pfx" style={{ paddingBlock: "var(--space-10) var(--space-8)" }}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--pfx-white)",
                letterSpacing: "0.18em",
                fontSize: "1.1rem",
              }}
            >
              PROEFEX<span style={{ color: "var(--pfx-orange)" }}>.</span>
            </p>
            <p className="mt-4 max-w-[38ch]" style={{ fontSize: "var(--text-caption)" }}>
              Un solo ecosistema para construir, crecer y aprender.
            </p>
            <nav aria-label="PROEFEX" className="mt-6">
              <ul className="flex flex-col gap-2">
                {CORE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="underline-anim"
                      style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-caption)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-6" style={{ fontSize: "var(--text-caption)" }}>
              Datos de contacto: <span className="content-required">CONTENT_REQUIRED</span>
            </p>
          </div>

          {PILLARS.map((p) => (
            <nav key={p.pillar} aria-label={p.name}>
              <p className="label-mono" style={{ color: p.accent }}>
                {p.pillar}
              </p>
              <p className="mt-1">
                <Link
                  href={p.href}
                  className="underline-anim"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: "var(--pfx-white)",
                    fontSize: "var(--text-caption)",
                  }}
                >
                  {p.name}
                </Link>
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {p.children.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="underline-anim"
                      style={{ color: "rgba(255,255,255,0.78)", fontSize: "var(--text-caption)" }}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.14)", fontSize: "var(--text-caption)" }}
        >
          <p>© {new Date().getFullYear()} PROEFEX. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="/legal/terminos" className="underline-anim" style={{ color: "rgba(255,255,255,0.78)" }}>
                Términos
              </Link>
            </li>
            <li>
              <Link href="/legal/privacidad" className="underline-anim" style={{ color: "rgba(255,255,255,0.78)" }}>
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="underline-anim" style={{ color: "rgba(255,255,255,0.78)" }}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
