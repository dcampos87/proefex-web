"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CORE_LINKS, CONTACT_HREF, PILLARS, universeForPath } from "./nav-data";

/**
 * MEGA-FOOTER universo-aware (D34, Fase 2.1 §13): todo el chrome consume
 * tokens del universo de la ruta actual (--footer-bg / --footer-accent),
 * de modo que una página Grow Up termina con footer Grow Up (#22272E +
 * #00FFE6) y no con el azul TECH. Wordmark editorial + grid por pilares
 * + bloque transversal + legal. Legales y redes: CONTENT_REQUIRED.
 */
export function SiteFooter() {
  const pathname = usePathname();
  const universe = universeForPath(pathname);

  // El body no puede llevar data-universe desde el servidor (layout estático),
  // así que el chrome cliente sincroniza el universo para que el fondo del
  // documento (brecha antes del footer, overscroll) pertenezca al universo.
  useEffect(() => {
    document.body.dataset.universe = universe;
  }, [universe]);

  return (
    <footer
      data-universe={universe}
      className="site-footer"
      style={{
        background: "var(--footer-bg)",
        color: "var(--text-body)",
        marginTop: "var(--space-12)",
      }}
    >
      <div className="container-pfx" style={{ paddingBlock: "var(--space-10) var(--space-8)" }}>
        {/* Wordmark editorial */}
        <p className="footer-wordmark" aria-hidden="true">
          PROEFEX<span style={{ color: "var(--footer-accent)" }}>.</span>
        </p>
        <p className="sr-only">PROEFEX</p>

        <div
          className="mt-8 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(5,1fr)]"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Core: transversal */}
          <div>
            <p className="label-mono" style={{ color: "var(--footer-accent)" }}>PROEFEX</p>
            <p className="mt-3 max-w-[30ch]" style={{ fontSize: "var(--text-caption)" }}>
              Un solo ecosistema para construir, crecer y aprender. Cinco capacidades, una sola propuesta.
            </p>
            <p className="mt-4" style={{ fontSize: "var(--text-caption)" }}>
              <Link href={CONTACT_HREF} className="underline-anim" style={{ color: "var(--text)", fontWeight: 600 }}>
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
              <p
                className="label-mono"
                style={{
                  color:
                    universe === p.universe
                      ? "var(--footer-accent)"
                      : `color-mix(in srgb, ${p.accent} 60%, white)`,
                }}
              >
                {p.pillar}
              </p>
              <p className="mt-1">
                <Link
                  href={p.href}
                  className="underline-anim"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: "var(--text)",
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
                      style={{ color: "var(--text-body)", fontSize: "var(--text-caption)" }}
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
          style={{ borderColor: "var(--border)", fontSize: "var(--text-caption)" }}
        >
          <ul className="flex flex-wrap gap-5" role="list">
            {CORE_LINKS.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-anim" style={{ color: "var(--text-body)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-5" role="list">
            <li>
              <Link href="/legal/terminos" className="underline-anim" style={{ color: "var(--text-body)" }}>
                Términos
              </Link>
            </li>
            <li>
              <Link href="/legal/privacidad" className="underline-anim" style={{ color: "var(--text-body)" }}>
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="underline-anim" style={{ color: "var(--text-body)" }}>
                Cookies
              </Link>
            </li>
            <li>
              <span className="content-required">Legales: CONTENT_REQUIRED</span>
            </li>
          </ul>
        </div>
        <p className="mt-4" style={{ fontSize: "var(--text-caption)", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} PROEFEX. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
