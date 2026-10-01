"use client";

import { useEffect, useState } from "react";

/**
 * ThemeToggle (Fase 2.3, D39): control global Light / Dark / System.
 * Cicla los tres estados, persiste en localStorage ('pfx-theme') y
 * fija data-theme en <html> (el script inline del layout resolvió el
 * valor inicial antes del primer paint → sin flash).
 * Independiente de los universos (D40): cambiar el tema no altera la
 * identidad TECH / Grow Up.
 * A11y: botón real, aria-label descriptivo del estado y del siguiente,
 * foco visible heredado del header.
 */
const ORDER = ["light", "dark", "system"] as const;
type ThemePref = (typeof ORDER)[number];

const LABEL: Record<ThemePref, string> = {
  light: "Claro",
  dark: "Oscuro",
  system: "Sistema",
};

const ICON: Record<ThemePref, string> = {
  light: "☀",
  dark: "☾",
  system: "◐",
};

function stored(): ThemePref {
  if (typeof window === "undefined") return "system";
  const t = window.localStorage.getItem("pfx-theme");
  return t === "light" || t === "dark" ? t : "system";
}

function apply(pref: ThemePref) {
  const resolved =
    pref === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : pref;
  document.documentElement.dataset.theme = resolved;
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [pref, setPref] = useState<ThemePref>("system");

  useEffect(() => {
    setPref(stored());
    // "System" sigue al SO en vivo mientras la preferencia sea system.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (stored() === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    setPref(next);
    window.localStorage.setItem("pfx-theme", next);
    apply(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Tema: ${LABEL[pref]}. Cambiar a ${LABEL[ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length]]}`}
      title={`Tema: ${LABEL[pref]}`}
      className="theme-toggle"
      data-pref={pref}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 36,
        padding: compact ? "0 10px" : "0 12px",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text)",
        font: "inherit",
        fontSize: "0.75rem",
        cursor: "pointer",
        transition: "border-color var(--motion-fast) var(--ease-out), background var(--motion-fast) var(--ease-out)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "0.9rem", lineHeight: 1 }}>
        {ICON[pref]}
      </span>
      {!compact ? <span style={{ letterSpacing: "0.04em" }}>{LABEL[pref]}</span> : null}
    </button>
  );
}
