"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import {
  COUNTRIES,
  DEFAULT_COUNTRY_CODE,
  INTENT_OPTIONS,
  LANDING_SLUG,
  THANKS_PATH,
} from "./constants";
import { buildLeadPayload, validateLeadForm } from "./leadUtils";
import type { LeadFormValues, LeadIntent, LeadValidationErrors } from "./types";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_LEADS_WEBHOOK_URL;

const INITIAL_VALUES: LeadFormValues = {
  firstName: "",
  lastName: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: "",
  intent: "hot",
};

const inputClass =
  "w-full rounded-2xl border border-proefex-navy/15 bg-white px-4 py-3 text-sm text-proefex-navy outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/15";

export function LeadForm48() {
  const router = useRouter();
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedCountry =
    COUNTRIES.find((country) => country.code === values.countryCode) ?? COUNTRIES[0];

  const update =
    (field: keyof LeadFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateLeadForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const payload = buildLeadPayload(values, {
      dialCode: selectedCountry.dialCode,
      source: LANDING_SLUG,
      search: window.location.search,
    });

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      } catch {
        // El flujo de conversión no se detiene si el webhook falla.
      }
    }

    const intentParam: LeadIntent = values.intent;
    router.push(`${THANKS_PATH}?i=${intentParam}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2rem] bg-white p-6 text-proefex-navy shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8"
    >
      <p className="text-center text-sm font-semibold text-proefex-red">
        Quedan 10 cupos — completa tus datos
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Nombres
          <input
            name="firstName"
            value={values.firstName}
            onChange={update("firstName")}
            placeholder="Tus nombres"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            className={inputClass}
          />
          {errors.firstName && (
            <span role="alert" className="text-xs font-normal text-proefex-red">
              {errors.firstName}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Apellidos
          <input
            name="lastName"
            value={values.lastName}
            onChange={update("lastName")}
            placeholder="Tus apellidos"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            className={inputClass}
          />
          {errors.lastName && (
            <span role="alert" className="text-xs font-normal text-proefex-red">
              {errors.lastName}
            </span>
          )}
        </label>
      </div>

      <div className="mt-4">
        <span className="text-sm font-medium">Número de WhatsApp</span>
        <div className="mt-1.5 flex gap-2">
          <label className="sr-only" htmlFor="country">
            País y código telefónico
          </label>
          <select
            id="country"
            name="country"
            value={values.countryCode}
            onChange={update("countryCode")}
            className="w-40 shrink-0 rounded-2xl border border-proefex-navy/15 bg-white px-3 py-3 text-sm text-proefex-navy outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/15"
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label} ({country.dialCode})
              </option>
            ))}
          </select>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            value={values.phone}
            onChange={update("phone")}
            placeholder={`${selectedCountry.dialCode.replace("+", "")} 999 999 999`}
            autoComplete="tel-national"
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
          />
        </div>
        {errors.phone && (
          <span role="alert" className="mt-1 block text-xs text-proefex-red">
            {errors.phone}
          </span>
        )}
      </div>

      <fieldset className="mt-5 rounded-2xl bg-proefex-cream px-4 py-4">
        <legend className="px-1 text-sm font-semibold">
          Para reservar tu cupo, sé honesto con nosotros:
        </legend>
        <div className="mt-2 space-y-2">
          {INTENT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                values.intent === option.value
                  ? "border-proefex-orange bg-white font-semibold shadow-sm"
                  : "border-proefex-navy/10 bg-white/60 hover:border-proefex-orange/50"
              }`}
            >
              <input
                type="radio"
                name="intent"
                value={option.value}
                checked={values.intent === option.value}
                onChange={update("intent")}
                className="mt-0.5 accent-proefex-orange"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-2xl bg-proefex-orange px-6 py-4 text-base font-bold uppercase tracking-wide text-proefex-navy transition hover:bg-proefex-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-proefex-orange disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Reclamar mi bono y contratar web"}
      </button>

      <p className="mt-3 text-center text-xs text-proefex-navy/55">
        Tus datos solo se usarán para contactarte sobre esta oferta.
      </p>
    </form>
  );
}
