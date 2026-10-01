import Link from "next/link";
import { CORE_LINKS, CONTACT_HREF, PILLARS } from "./nav-data";

/**
 * MEGA-FOOTER (recalibración visual, §27): wordmark editorial gigante +
 * grid por pilares + bloque transversal + legal. Dark premium sobre
 * azul de marca profundo. Redes sociales y legales: CONTENT_REQUIRED.
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
        {/* Wordmark editorial */}
        <p className="footer-wordmark" aria-hidden="true">
          PROEFEX<span>.</span>
        </p>
        <p className="sr-only">PROEFEX</p>

        <div
          className="mt-8 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(5,1fr)]"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          {/* Core: transversal */}
          <div>
            <p className="label-mono" style={{ color: "var(--pfx-orange)" }}>PROEFEX</p>
            <p className="mt-3 max-w-[30ch]" style={{ fontSize: "var(--text-caption)" }}>
              Un solo ecosistema para construir, crecer y aprender. Cinco capacidades, una sola propuesta.
            </p>
            <p className="mt-4" style={{ fontSize: "var(--text-caption)" }}>
              <Link href={CONTACT_HREF} className="underline-anim" style={{ color: "var(--pfx-white)", fontWeight: 600 }}>
                Contactar →
              </Link>
            </p>
            <p className="mt-4" style={{ fontSize: "var(--text-caption)" }}>
              Redes sociales: <span className="content-required">CONTENT_REQUIRED</span>
            </p>
          </div>

          {/* Cinco pilares */}
          {PILLARS.map((p) => (
            <nav key={p.pillar} aria-label={p.name}>
              <p className="label-mono" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
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

        {/* Transversal + legal */}
        <div
          className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.14)", fontSize: "var(--text-caption)" }}
        >
          <ul className="flex flex-wrap gap-5" role="list">
            {CORE_LINKS.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-anim" style={{ color: "rgba(255,255,255,0.78)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-5" role="list">
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
            <li>
              <span className="content-required">Legales: CONTENT_REQUIRED</span>
            </li>
          </ul>
        </div>
        <p className="mt-4" style={{ fontSize: "var(--text-caption)", color: "rgba(255,255,255,0.5)" }}>
          © {new Date().getFullYear()} PROEFEX. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
