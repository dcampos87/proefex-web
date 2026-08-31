"use client";

import { useSyncExternalStore } from "react";

import { COUNTDOWN_STORAGE_KEY, OFFER_HOURS } from "./constants";
import {
  formatCountdown,
  getOrCreateDeadline,
  getRemainingMs,
  readStoredDeadline,
} from "./leadUtils";

const OFFER_SECONDS = OFFER_HOURS * 3600;

let cachedDeadline: number | null = null;

/**
 * Resuelve (una sola vez por carga de página) el deadline de la oferta y lo
 * persiste en localStorage. La oferta expirada no se renueva.
 */
function getDeadline(): number {
  if (cachedDeadline === null) {
    const now = Date.now();
    cachedDeadline = getOrCreateDeadline(
      now,
      readStoredDeadline(window.localStorage, COUNTDOWN_STORAGE_KEY)
    );
    try {
      window.localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(cachedDeadline));
    } catch {
      // localStorage bloqueado (modo privado): el contador funciona sin persistencia.
    }
  }
  return cachedDeadline;
}

function subscribe(onStoreChange: () => void): () => void {
  const intervalId = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(intervalId);
}

/** Segundos restantes, redondeados al segundo para mantener el snapshot estable. */
function getSnapshot(): number {
  return Math.floor(getRemainingMs(getDeadline(), Date.now()) / 1000);
}

function getServerSnapshot(): number {
  return OFFER_SECONDS;
}

/**
 * Contador regresivo de 24 horas por visitante en formato de franja compacta:
 * cabe en una sola línea para no obligar a hacer scroll en mobile. El deadline
 * se calcula en la primera visita y se persiste en localStorage, topado por el
 * límite global de la campaña (31/08/2026 22:00 hora de Lima); si ya expiró
 * se mantiene en 00:00:00 sin renovarse.
 */
export function Countdown48h() {
  const remainingSeconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const expired = remainingSeconds <= 0;
  const display = formatCountdown(remainingSeconds * 1000);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-proefex-red/40 bg-proefex-navy-deep/85 px-4 py-2.5 shadow-[0_16px_44px_rgba(214,64,34,0.18)] sm:px-5 sm:py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span aria-hidden className="relative flex h-2 w-2 shrink-0">
          {!expired && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-proefex-red opacity-70 motion-reduce:hidden" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              expired ? "bg-white/30" : "bg-proefex-red"
            }`}
          />
        </span>
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-proefex-amber sm:text-[11px]">
          {expired ? "La oferta ha expirado" : "Tu bono expira en"}
        </p>
      </div>
      <p
        role="timer"
        aria-live="off"
        className="font-mono text-[26px] font-bold leading-none tabular-nums text-white sm:text-3xl"
      >
        {display}
      </p>
    </div>
  );
}
