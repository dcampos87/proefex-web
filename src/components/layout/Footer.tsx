import Link from "next/link";

/**
 * Footer global (Doc 14 §6). Fase 2: estructura + navegación.
 * Textos legales y datos de contacto reales: CONTENT_REQUIRED (D17).
 */
const COLUMNS = [
  {
    title: "PROEFEX TECH",
    links: [
      { label: "Desarrollo a medida", href: "/#tech" },
      { label: "IA y automatización", href: "/#tech" },
      { label: "Ingeniería y drones", href: "/#tech" },
      { label: "Transformación digital", href: "/#tech" },
    ],
  },
  {
    title: "GROW UP",
    links: [
      { label: "Marketing BPO", href: "/#grow-up" },
      { label: "Growth Marketing", href: "/#grow-up" },
      { label: "Consultoría de marketing", href: "/#grow-up" },
    ],
  },
  {
    title: "Ecosistema",
    links: [
      { label: "Learning", href: "/#learning" },
      { label: "SaaS", href: "/#saas" },
      { label: "Sectores", href: "/#sectores" },
      { label: "Insights", href: "/#insights" },
    ],
  },
] as const;

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
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
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
            <p className="mt-6" style={{ fontSize: "var(--text-caption)" }}>
              Datos de contacto: <span className="content-required">CONTENT_REQUIRED</span>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="label-mono" style={{ color: "rgba(255,255,255,0.55)" }}>
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
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
