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
 * Contador regresivo de 48 horas por visitante. El deadline se calcula en la
 * primera visita y se persiste en localStorage; si ya expiró se mantiene en
 * 00:00:00 sin renovarse.
 */
export function Countdown48h() {
  const remainingSeconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const expired = remainingSeconds <= 0;
  const display = formatCountdown(remainingSeconds * 1000);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-proefex-red/40 bg-proefex-navy-deep/80 px-6 py-5 text-center shadow-[0_18px_50px_rgba(214,64,34,0.18)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-proefex-amber">
        {expired ? "La oferta ha expirado" : "Tu bono expira en"}
      </p>
      <p
        role="timer"
        aria-live="off"
        className="mt-2 font-mono text-4xl font-bold tabular-nums text-white sm:text-5xl"
      >
        {display}
      </p>
      {!expired && (
        <p className="mt-2 text-xs text-white/60">Horas : minutos : segundos — cupos limitados</p>
      )}
    </div>
  );
}
