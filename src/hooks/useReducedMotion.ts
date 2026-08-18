"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Devuelve true si el sistema del usuario solicita reducción de movimiento.
 * Se usa para desactivar animaciones GSAP, Framer Motion y del fondo fluido.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
