"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { WHATSAPP_ASESOR_URL } from "./constants";
import type { LeadIntent } from "./types";

function resolveIntent(param: string | null): LeadIntent {
  return param === "cold" ? "cold" : "hot";
}

export function ThanksContent() {
  const searchParams = useSearchParams();
  const intent = resolveIntent(searchParams.get("i"));

  if (intent === "cold") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div
          aria-hidden
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-proefex-amber" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-balance text-3xl font-extrabold sm:text-4xl">
          ¡Listo! Registramos tus datos.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">
          Gracias por tu interés. Cuando estés listo para lanzar la página web de tu empresa con
          facturación electrónica y libro de reclamaciones, nuestro equipo te contactará con todos
          los detalles.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <div
        aria-hidden
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-400" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-balance text-3xl font-extrabold sm:text-4xl">
        ¡Tu bono está separado!
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-white/75">
        Si no puedes esperar a que nos comuniquemos, dale clic al botón de abajo para hablar
        directamente con un asesor y validar tu oferta antes de que expire el contador.
      </p>
      <Link
        href={WHATSAPP_ASESOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-base font-bold uppercase tracking-wide text-proefex-navy transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Hablar con un asesor por WhatsApp
      </Link>
      <p className="mt-4 text-sm text-white/55">
        Respuesta inmediata en horario de oficina. Tu cupo queda reservado por ahora.
      </p>
    </div>
  );
}
