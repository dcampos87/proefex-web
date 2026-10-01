"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CORE_LINKS, CONTACT_HREF, PILLARS, universeForPath } from "./nav-data";

/**
 * MEGAMENÚ + navegación global (recalibración §11/§12; Fase 2.2 D35/D36).
 *
 * Desktop (lg+): links de Nivel 1 + botón "Ecosistema" que abre un panel
 * editorial: cinco filas-universo (número / código pilar / nombre / tagline
 * / flecha) con acento por universo en hover, y una zona secundaria
 * transversal separada (Sectores · Casos · Insights · Nosotros · Contacto).
 * Jerarquía > cantidad: sin cards, sin sub-links, sin bloques destacados.
 * sm/md: drawer limpio (fila por universo + navegación secundaria).
 *
 * A11y: aria-expanded/controls, Escape cierra y devuelve el foco, focus
 * trap en el drawer, cierre al navegar o al hacer click fuera (panel),
 * aria-current en la sección activa + punto del universo en "Ecosistema".
 * Motion: apertura 180ms; reduced-motion lo anula (globals.css).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const universe = universeForPath(pathname);
  const activePillar = PILLARS.find((p) => p.universe === universe);
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
                  aria-current={activePillar ? "true" : undefined}
                  onClick={(e) => {
                    const next = !megaOpen;
                    setMegaOpen(next);
                    // Apertura con teclado (detail=0): mover el foco al primer
                    // enlace del panel (patrón disclosure WAI-ARIA).
                    if (next && e.detail === 0) {
                      requestAnimationFrame(() => megaPanelRef.current?.querySelector<HTMLElement>("a")?.focus());
                    }
                  }}
                >
                  {/* Punto del universo activo (D36): indicador sutil de contexto */}
                  {activePillar ? (
                    <span
                      aria-hidden="true"
                      className="inline-block rounded-full"
                      style={{ width: 6, height: 6, background: activePillar.accent }}
                    />
                  ) : null}
                  Ecosistema
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ transform: megaOpen ? "rotate(180deg)" : undefined, transition: "transform var(--motion-fast) var(--ease-out)" }}>
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
              {CORE_LINKS.slice(1, 4).map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="underline-anim"
                      aria-current={active ? "page" : undefined}
                      style={{ color: active ? "var(--accent)" : "var(--text)", fontSize: "var(--text-caption)", fontWeight: 500 }}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
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

      {/* ===== MEGAMENÚ desktop (D35): lista editorial de universos ===== */}
      <div
        id="mega-ecosistema"
        ref={megaPanelRef}
        className={`mega-panel hidden lg:block${megaOpen ? " is-open" : ""}`}
        aria-hidden={!megaOpen}
      >
        <div className="container-pfx" style={{ maxWidth: "var(--container-wide)", paddingBlock: "var(--space-6) var(--space-7)" }}>
          <p className="kicker-line">ECOSISTEMA</p>

          <nav aria-label="Los cinco universos PROEFEX" className="mt-4">
            <ul className="mega-rows" role="list">
              {PILLARS.map((p, i) => (
                <li key={p.pillar}>
                  <Link
                    href={p.href}
                    className="mega-row"
                    style={{ ["--pillar-accent" as string]: p.accent }}
                    onClick={() => closeMega()}
                    aria-current={activePillar?.pillar === p.pillar ? "true" : undefined}
                  >
                    <span className="mega-row-idx" aria-hidden="true">0{i + 1}</span>
                    <span className="label-mono mega-row-pill" style={{ color: p.accent }}>{p.pillar}</span>
                    <span className="mega-row-main">
                      <span className="mega-row-name">{p.name}</span>
                      <span className="mega-row-tag">{p.tagline}</span>
                    </span>
                    <span className="mega-row-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Zona transversal: secundaria, no compite con los universos */}
          <nav aria-label="Transversal PROEFEX" className="mega-secondary mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-1.5" role="list">
              {CORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="mega-link" onClick={() => closeMega()} style={{ fontSize: "var(--text-caption)", color: "var(--text-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
          <p className="kicker-line nav-item" style={{ ["--i" as string]: 0 }}>ECOSISTEMA</p>

          {/* Fila por universo: un link, sin acordeones (D35) */}
          <nav aria-label="Ecosistema" className="nav-item" style={{ ["--i" as string]: 1 }}>
            <ul className="flex flex-col divide-y" role="list" style={{ borderColor: "var(--border)" }}>
              {PILLARS.map((p) => (
                <li key={p.pillar}>
                  <Link
                    href={p.href}
                    onClick={closeDrawer}
                    className="drawer-pillar"
                    style={{ ["--pillar-accent" as string]: p.accent }}
                    aria-current={activePillar?.pillar === p.pillar ? "true" : undefined}
                  >
                    <span className="label-mono drawer-pillar-code" style={{ color: p.accent }}>{p.pillar}</span>
                    <span className="drawer-pillar-main">
                      <span className="drawer-pillar-name">{p.name}</span>
                      <span className="drawer-pillar-tag">{p.tagline}</span>
                    </span>
                    <span aria-hidden="true" className="drawer-pillar-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="PROEFEX" className="nav-item flex flex-col gap-1" style={{ ["--i" as string]: 2 }}>
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

        <div className="nav-item pt-4" style={{ ["--i" as string]: 3 }}>
          <Link href={CONTACT_HREF} onClick={closeDrawer} className="btn btn-primary w-full">
            Solicitar asesoría
          </Link>
        </div>
      </div>
    </>
  );
}
