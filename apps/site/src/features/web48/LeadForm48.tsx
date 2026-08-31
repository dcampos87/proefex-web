"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import {
  COUNTRIES,
  DEFAULT_COUNTRY_CODE,
  INTENT_OPTIONS,
  LANDING_SLUG,
  PRICE_LABEL,
  THANKS_PATH,
} from "./constants";
import { buildLeadPayload, validateLeadForm } from "./leadUtils";
import type { LeadFormValues, LeadIntent, LeadValidationErrors } from "./types";

const LEADS_API_URL = "/api/leads";

const INITIAL_VALUES: LeadFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: "",
  intent: "hot",
};

const inputClass =
  "w-full rounded-xl border border-proefex-navy/15 bg-white px-3.5 py-2.5 text-sm text-proefex-navy outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/15";

const labelClass = "flex flex-col gap-1 text-xs font-semibold text-proefex-navy/80";

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

    // TODO: remover logging temporal tras confirmar que el webhook recibe datos.
    console.info("[LeadForm48] payload:", payload);

    try {
      const response = await fetch(LEADS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      console.info("[LeadForm48] /api/leads response status:", response.status);
    } catch (error) {
      console.error("[LeadForm48] /api/leads fetch error:", error);
    }

    const intentParam: LeadIntent = values.intent;
    router.push(`${THANKS_PATH}?i=${intentParam}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white p-4 text-proefex-navy shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-6"
    >
      <div className="grid grid-cols-2 gap-2">
        <label className={labelClass}>
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
            <span role="alert" className="text-[11px] font-normal text-proefex-red">
              {errors.firstName}
            </span>
          )}
        </label>

        <label className={labelClass}>
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
            <span role="alert" className="text-[11px] font-normal text-proefex-red">
              {errors.lastName}
            </span>
          )}
        </label>
      </div>

      <div className="mt-3">
        <label className={labelClass}>
          Correo electrónico
          <input
            name="email"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={update("email")}
            placeholder="tucorreo@empresa.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
          {errors.email && (
            <span role="alert" className="text-[11px] font-normal text-proefex-red">
              {errors.email}
            </span>
          )}
        </label>
      </div>

      <div className="mt-3">
        <span className={labelClass}>Número de WhatsApp</span>
        <div className="mt-1 flex gap-2">
          <label className="sr-only" htmlFor="country">
            País y código telefónico
          </label>
          <select
            id="country"
            name="country"
            value={values.countryCode}
            onChange={update("countryCode")}
            className="w-28 shrink-0 rounded-xl border border-proefex-navy/15 bg-white px-2.5 py-2.5 text-xs text-proefex-navy outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/15 sm:w-40 sm:px-3 sm:text-sm"
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
          <span role="alert" className="mt-1 block text-[11px] text-proefex-red">
            {errors.phone}
          </span>
        )}
      </div>

      <fieldset className="mt-3">
        <legend className="text-xs font-semibold text-proefex-navy/80">
          ¿Ya tienes el presupuesto (
          <strong className="font-extrabold text-proefex-orange">{PRICE_LABEL}</strong>)?
        </legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {INTENT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex min-h-10 cursor-pointer items-center justify-center rounded-xl border px-2 py-2 text-center text-xs font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-proefex-orange/25 sm:text-[13px] ${
                values.intent === option.value
                  ? "border-proefex-orange bg-proefex-orange/10 text-proefex-navy shadow-sm"
                  : "border-proefex-navy/15 bg-white text-proefex-navy/60 hover:border-proefex-orange/50"
              }`}
            >
              <input
                type="radio"
                name="intent"
                value={option.value}
                checked={values.intent === option.value}
                onChange={update("intent")}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full rounded-2xl bg-proefex-orange px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-proefex-navy transition hover:bg-proefex-amber active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 sm:text-base"
      >
        {submitting ? "Enviando..." : "Reclamar mi bono y contratar web"}
      </button>

      <p className="mt-2 text-center text-[11px] text-proefex-navy/55">
        Tus datos solo se usarán para contactarte sobre esta oferta.
      </p>
    </form>
  );
}
