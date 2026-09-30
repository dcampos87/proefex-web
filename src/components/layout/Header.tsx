"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CORE_LINKS, CONTACT_HREF, PILLARS, type Universe } from "./nav-data";

/** Universo de la ruta actual: el header hereda sus tokens (texto/superficie)
 * para no perder contraste sobre héroes oscuros (QA recalibración). */
function universeForPath(path: string | null): Universe {
  if (!path) return "core";
  for (const p of PILLARS) {
    if (path === p.href || path.startsWith(p.href + "/")) return p.universe;
  }
  return "core";
}

/**
 * MEGAMENÚ + navegación global (recalibración, §11/§12/§23/§31).
 *
 * Desktop (lg+): links de Nivel 1 + botón "Ecosistema" que abre un panel
 * con las cinco líneas (tarjetas jerárquicas por pilar, acento por universo).
 * sm/md: overlay drawer con jerarquía (acordeones nativos <details>).
 *
 * A11y: aria-expanded/controls, Escape cierra y devuelve el foco, focus
 * trap en el drawer, cierre al navegar o al hacer click fuera (panel).
 * Motion: apertura 180ms; reduced-motion lo anula (globals.css).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const megaBtnRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMega = useCallback((focusBack = false) => {
    setMegaOpen(false);
    if (focusBack) megaBtnRef.current?.focus();
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    drawerToggleRef.current?.focus();
  }, []);

  // Escape global + click fuera para el megamenú
  useEffect(() => {
    if (!megaOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMega(true);
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!megaPanelRef.current?.contains(t) && !megaBtnRef.current?.contains(t)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen, closeMega]);

  // Drawer: focus trap + Escape + bloqueo de scroll
  useEffect(() => {
    if (!drawerOpen) return;
    const panel = drawerRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
        ),
      );
    focusables()[0]?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key === "Tab") {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        data-universe={universeForPath(pathname)}
      >
        <div
          className="container-pfx mx-auto flex h-full items-center justify-between gap-6"
          style={{ maxWidth: "var(--container-wide)" }}
        >
          <Link
            href="/"
            className="font-bold tracking-[0.18em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)", fontSize: "1.1rem" }}
            aria-label="PROEFEX — inicio"
          >
            PROEFEX<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop lg+ */}
          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link href={CORE_LINKS[0].href} className="underline-anim" style={{ color: "var(--text)", fontSize: "var(--text-caption)", fontWeight: 500 }}>
                  {CORE_LINKS[0].label}
                </Link>
              </li>
              <li>
                <button
                  ref={megaBtnRef}
                  type="button"
                  className="underline-anim inline-flex items-center gap-1.5"
                  style={{ color: "var(--text)", fontSize: "var(--text-caption)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", font: "inherit", padding: 0 }}
                  aria-expanded={megaOpen}
                  aria-controls="mega-ecosistema"
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  Ecosistema
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ transform: megaOpen ? "rotate(180deg)" : undefined, transition: "transform var(--motion-fast) var(--ease-out)" }}>
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
              {CORE_LINKS.slice(1, 4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-anim" style={{ color: "var(--text)", fontSize: "var(--text-caption)", fontWeight: 500 }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Link href={CONTACT_HREF} className="btn btn-primary btn-sm">
              Solicitar asesoría
            </Link>
          </div>

          {/* sm/md: toggle drawer */}
          <button
            ref={drawerToggleRef}
            type="button"
            className="icon-btn icon-btn-lg-hide"
            aria-expanded={drawerOpen}
            aria-controls="menu-movil"
            aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* ===== MEGAMENÚ desktop ===== */}
      <div
        id="mega-ecosistema"
        ref={megaPanelRef}
        className={`mega-panel hidden lg:block${megaOpen ? " is-open" : ""}`}
        aria-hidden={!megaOpen}
      >
        <div className="container-pfx" style={{ maxWidth: "var(--container-wide)", paddingBlock: "var(--space-6) var(--space-8)" }}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_2.6fr]">
            <div className="flex flex-col gap-3">
              <p className="label-mono">EL ECOSISTEMA</p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.15rem", color: "var(--text)" }}>
                Cinco capacidades, una sola propuesta
              </p>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--text-body)", maxWidth: "34ch" }}>
                Cada línea tiene su equipo, su método y su experiencia. Juntas funcionan como un sistema.
              </p>
              <Link href={CONTACT_HREF} className="btn btn-secondary btn-sm mt-2 w-fit">
                Solicitar asesoría
              </Link>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list">
              {PILLARS.map((p) => (
                <li key={p.pillar} className="mega-pillar p-4" style={{ ["--pillar-accent" as string]: p.accent }}>
                  <p className="flex items-center gap-2">
                    <span className="mega-pillar-dot" aria-hidden="true" />
                    <span className="label-mono" style={{ color: p.accent }}>{p.pillar}</span>
                  </p>
                  <p className="mt-1.5">
                    <Link
                      href={p.href}
                      className="underline-anim"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)", fontSize: "var(--text-body)" }}
                    >
                      {p.name}
                    </Link>
                  </p>
                  <p style={{ fontSize: "var(--text-caption)", color: "var(--text-muted)" }}>{p.tagline}</p>
                  <ul className="mt-3" role="list">
                    {p.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="mega-link" onClick={() => closeMega()}>
                          {c.label}
                          {!c.built ? <span className="content-required ml-2" style={{ fontSize: "0.6rem" }}>F3</span> : null}
                        </Link>
                        {c.children?.map((g) => (
                          <Link key={g.href} href={g.href} className="mega-link" onClick={() => closeMega()} style={{ paddingLeft: "var(--space-4)" }}>
                            ↳ {g.label}
                          </Link>
                        ))}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Drawer móvil ===== */}
      <div
        id="menu-movil"
        ref={drawerRef}
        className={`mobile-nav lg:hidden${drawerOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        hidden={!drawerOpen ? true : undefined}
      >
        <button
          type="button"
          className="icon-btn absolute right-5 top-4"
          onClick={closeDrawer}
          aria-label="Cerrar menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          <nav aria-label="Ecosistema" className="flex flex-col divide-y" style={{ borderColor: "var(--border)" }}>
            {PILLARS.map((p) => (
              <details key={p.pillar} className="pillar-group py-2">
                <summary>
                  <span>
                    <span className="label-mono" style={{ color: p.accent, marginRight: 8 }}>{p.pillar}</span>
                    {p.name}
                  </span>
                  <svg className="chev" width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </summary>
                <div className="pillar-links flex flex-col gap-1 pl-1 pt-2">
                  <Link href={p.href} onClick={closeDrawer} className="mega-link" style={{ fontSize: "var(--text-body)", color: "var(--text)" }}>
                    Ver {p.name} →
                  </Link>
                  {p.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={closeDrawer} className="mega-link">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </nav>

          <nav aria-label="PROEFEX" className="nav-item flex flex-col gap-1" style={{ ["--i" as string]: 5 }}>
            {CORE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeDrawer}
                className="mega-link"
                style={{ fontSize: "var(--text-body)", color: "var(--text)", minHeight: 44 }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="nav-item pt-4" style={{ ["--i" as string]: 6 }}>
          <Link href={CONTACT_HREF} onClick={closeDrawer} className="btn btn-primary w-full">
            Solicitar asesoría
          </Link>
        </div>
      </div>
    </>
  );
}
