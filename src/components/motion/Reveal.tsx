"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealVariant = "fade-rise" | "reveal-lines" | "ignite";

interface RevealProps {
  children: ReactNode;
  /** fade-rise (default) · reveal-lines (titulares con máscara) · ignite (firma TECH) */
  variant?: RevealVariant;
  /** Retardo en ms — usar para stagger (var(--stagger-current) por universo). */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Reveal — sistema de entrada por scroll (Doc 12 §3.2).
 * Sin librería: IntersectionObserver + clases CSS (transform/opacity/clip-path).
 * Se activa una vez; no reversible al subir. En reduced-motion el CSS
 * muestra el contenido estáticamente (globals.css §reduced-motion).
 * El contenido es visible sin JS: si el observer no corre, el estado
 * inicial oculto solo se aplica cuando JS hidrata este componente.
 */
export function Reveal({
  children,
  variant = "fade-rise",
  delay = 0,
  as = "div",
  className = "",
  id,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Stagger interno: los .ignite descendentes encienden en secuencia
            // (su --reveal-delay define el orden; firma TECH, Doc 12 §5).
            entry.target.querySelectorAll(".ignite").forEach((child) => {
              child.classList.add("is-visible");
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass = variant === "reveal-lines" ? "reveal-lines" : variant === "ignite" ? "ignite" : "reveal";

  return createElement(
    as,
    {
      ref,
      id,
      className: `${baseClass} ${className}`.trim(),
      style: { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties,
      ...rest,
    },
    children,
  );
}
