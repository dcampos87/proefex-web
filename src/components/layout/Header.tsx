"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Navegación principal (Doc 14 §6, Doc 15 §2.1).
 * - lg+: links inline con subrayado animado + CTA contacto persistente.
 * - sm/md: overlay fullscreen con stagger, focus trap y cierre con Escape.
 * - Header encoge al scroll (64→56px) con blur/borde (Doc 12 §3.8).
 * Nota Fase 2: los href apuntan a anclas de la home (única página construida).
 * En Fase 3 se sustituyen por las rutas definitivas del mapa (Doc 03).
 */
const NAV_ITEMS = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "TECH", href: "/#tech" },
  { label: "Grow Up", href: "/#grow-up" },
  { label: "Learning", href: "/#learning" },
  { label: "SaaS", href: "/#saas" },
  { label: "Sectores", href: "/#sectores" },
  { label: "Insights", href: "/#insights" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
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
  }, [open, close]);

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
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

          {/* lg+ */}
          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="underline-anim"
                    style={{ color: "var(--text)", fontSize: "var(--text-caption)", fontWeight: 500 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Link href="/#contacto" className="btn btn-primary btn-sm">
              Contacto
            </Link>
          </div>

          {/* sm/md */}
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn icon-btn-lg-hide"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay móvil */}
      <div
        id="menu-movil"
        ref={panelRef}
        className={`mobile-nav lg:hidden${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        hidden={!open ? true : undefined}
      >
        <button
          type="button"
          className="icon-btn absolute right-5 top-4"
          onClick={close}
          aria-label="Cerrar menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        <nav aria-label="Navegación móvil">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label} className="nav-item" style={{ ["--i" as string]: i }}>
                <Link
                  href={item.href}
                  onClick={close}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "1.75rem",
                    color: "var(--text)",
                    minHeight: 48,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-item mt-auto" style={{ ["--i" as string]: NAV_ITEMS.length }}>
          <Link href="/#contacto" onClick={close} className="btn btn-primary w-full">
            Contacto
          </Link>
        </div>
      </div>
    </>
  );
}
