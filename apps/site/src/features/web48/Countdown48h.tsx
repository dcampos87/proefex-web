"use client";

import { useSyncExternalStore } from "react";

import { OFFER_HOURS } from "./constants";
import { formatCountdown, getNextDailyDeadline, getRemainingMs } from "./leadUtils";

const OFFER_SECONDS = OFFER_HOURS * 3600;

function subscribe(onStoreChange: () => void): () => void {
  const intervalId = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(intervalId);
}

/**
 * Segundos restantes hasta las 22:00 de Lima, redondeados al segundo para
 * mantener el snapshot estable. El deadline se recalcula en cada tick, por lo
 * que al llegar las 10 PM el contador se reinicia solo hacia el día siguiente.
 */
function getSnapshot(): number {
  const now = Date.now();
  return Math.floor(getRemainingMs(getNextDailyDeadline(now), now) / 1000);
}

function getServerSnapshot(): number {
  return OFFER_SECONDS;
}

/**
 * Contador regresivo de la campaña constante en formato de franja compacta:
 * cabe en una sola línea para no obligar a hacer scroll en mobile. Siempre
 * cuenta hacia las 22:00 de Lima (GMT-5) y se reinicia automáticamente cada
 * noche, sin expirar ni depender del visitante.
 */
export function Countdown48h() {
  const remainingSeconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const display = formatCountdown(remainingSeconds * 1000);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-proefex-red/40 bg-proefex-navy-deep/85 px-4 py-2.5 shadow-[0_16px_44px_rgba(214,64,34,0.18)] sm:px-5 sm:py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span aria-hidden className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-proefex-red opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-proefex-red" />
        </span>
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-proefex-amber sm:text-[11px]">
          Tu bono expira en
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
