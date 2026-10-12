"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import {
  buildLeadRequest,
  newLeadIdempotencyKey,
  resolveLeadFormConfig,
  resolveLeadsApiBaseUrl,
  submitLead,
  validateLeadValues,
  type LeadFieldErrors,
  type LeadFormValues,
} from "@/lib/leads/client";

/**
 * ContactSection — formulario de contacto (D17) conectado al canal real
 * `POST /v1/leads` de `proefex-api` (Sprint 4), vía `src/lib/leads/client`.
 *
 * Comportamiento:
 * - Validación de cliente alineada con el esquema del API (incluye el
 *   consentimiento de privacidad obligatorio del contrato).
 * - Un solo envío por clic; el botón se deshabilita durante el envío.
 * - Éxito SOLO tras un 202 real del API. Sin simulación ni almacenamiento
 *   local de los datos (nada de localStorage).
 * - Sin reintento automático: un fallo de red es ambiguo; el reintento manual
 *   reutiliza la misma Idempotency-Key (el API deduplica).
 * - Honeypot presente para el anti-abuso del API.
 * - Si el canal no está configurado (falta NEXT_PUBLIC_PROEFEX_LEAD_FORM_ID),
 *   el envío queda deshabilitado de forma honesta.
 */

const COUNTRY_CODES = [
  { code: "+51", country: "Perú" },
  { code: "+1", country: "Estados Unidos / Canadá" },
  { code: "+34", country: "España" },
  { code: "+52", country: "México" },
  { code: "+57", country: "Colombia" },
  { code: "+56", country: "Chile" },
  { code: "+593", country: "Ecuador" },
  { code: "+58", country: "Venezuela" },
  { code: "+591", country: "Bolivia" },
  { code: "+598", country: "Uruguay" },
  { code: "+54", country: "Argentina" },
] as const;

const SERVICES = [
  "PROEFEX TECH — Desarrollo de software",
  "PROEFEX TECH — Automatización",
  "PROEFEX TECH — IA empresarial",
  "PROEFEX TECH — Transformación digital",
  "PROEFEX TECH — Ingeniería / drones / IoT",
  "GROW UP — Marketing BPO",
  "GROW UP — Growth Marketing",
  "GROW UP — Consultoría de marketing",
  "Learning — Formación",
  "Otro",
] as const;

const SECTORS = [
  "Industria",
  "Salud",
  "Retail",
  "Educación",
  "Servicios",
  "Minería",
  "Restaurantes",
  "Banca y seguros",
  "Otro",
] as const;

type Status = "idle" | "submitting" | "success" | "unavailable";

const INITIAL: LeadFormValues = {
  nombres: "",
  apellidos: "",
  empresa: "",
  cargo: "",
  email: "",
  countryCode: "+51",
  telefono: "",
  servicio: "",
  sector: "",
  mensaje: "",
  consentPrivacidad: false,
  honeypot: "",
};

export function ContactSection() {
  // Resolución de configuración una sola vez (fail closed, sin destinos adivinados).
  const [channel] = useState(() => {
    const form = resolveLeadFormConfig(process.env);
    const baseUrl = resolveLeadsApiBaseUrl();
    return { form, baseUrl };
  });
  const [values, setValues] = useState<LeadFormValues>(INITIAL);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>(
    channel.form.enabled && channel.baseUrl !== null ? "idle" : "unavailable",
  );
  const [globalError, setGlobalError] = useState<string | null>(null);
  // La misma clave cubre reintentos manuales del MISMO envío (el API deduplica
  // si el primer intento llegó); se regenera tras un éxito.
  const idempotencyKeyRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Al validar con errores, mover el foco al primer campo inválido
  // (esperando el re-render que aplica aria-invalid). WCAG 3.3.1/2.4.3.
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
    }
  }, [errors]);

  const set = (key: keyof LeadFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === "checkbox"
      ? e.target.checked
      : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((err) => {
      if (!err[key]) return err;
      const next = { ...err };
      delete next[key];
      return next;
    });
  };

  const applyFieldErrors = (fieldErrors: LeadFieldErrors) => {
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const nextErrors = validateLeadValues(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!channel.form.enabled || channel.baseUrl === null) {
      setStatus("unavailable");
      return;
    }

    idempotencyKeyRef.current ??= newLeadIdempotencyKey();
    setStatus("submitting");
    setGlobalError(null);

    const outcome = await submitLead({
      request: buildLeadRequest(values, channel.form.formId),
      idempotencyKey: idempotencyKeyRef.current,
      apiBaseUrl: channel.baseUrl,
    });

    if (outcome.ok) {
      idempotencyKeyRef.current = null;
      setValues(INITIAL);
      setErrors({});
      setStatus("success");
      return;
    }

    setStatus("idle");
    if (outcome.kind === "validation") {
      applyFieldErrors(outcome.fieldErrors);
      setGlobalError(
        outcome.detail ??
          "No pudimos procesar el envío: revisa los datos del formulario e inténtalo de nuevo.",
      );
      return;
    }
    if (outcome.kind === "rate-limited") {
      setGlobalError(
        "Has enviado demasiadas solicitudes. Espera unos minutos antes de intentarlo de nuevo.",
      );
      return;
    }
    if (outcome.kind === "server") {
      setGlobalError(
        `No pudimos procesar tu mensaje en este momento. Inténtalo de nuevo en unos minutos.${
          outcome.requestId ? ` (Referencia: ${outcome.requestId})` : ""
        }`,
      );
      return;
    }
    // network: resultado ambiguo; el reintento manual conserva la misma clave.
    setGlobalError(
      "No pudimos conectar con el servidor. Tu mensaje puede no haberse enviado; revisa tu conexión e inténtalo una vez más.",
    );
  };

  const field = (
    key: keyof LeadFormValues,
    label: string,
    input: React.ReactNode,
    { required = true }: { required?: boolean } = {},
  ) => {
    const error = errors[key];
    const errorId = `${key}-error`;
    return (
      <div className="field">
        <label className="field-label" htmlFor={key}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : <span style={{ fontWeight: 400 }}> (opcional)</span>}
        </label>
        {input}
        {error ? (
          <p className="field-error" id={errorId} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  const inputProps = (key: keyof LeadFormValues, type = "text", opts: Record<string, unknown> = {}) => ({
    id: key,
    name: key,
    value: values[key] as string,
    onChange: set(key),
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    ...opts,
    ...(type !== "text" ? { type } : {}),
  });

  const submitting = status === "submitting";

  return (
    <section data-universe="core" aria-labelledby="contacto-title">
      <div className="container-pfx">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            <p className="label-mono">CONTACTO</p>
            <h2 id="contacto-title" style={{ fontSize: "var(--text-display-lg)" }}>
              Hablemos de lo que su empresa necesita
            </h2>
            <p className="max-w-[52ch]" style={{ fontSize: "var(--text-body-lg)" }}>
              Cuéntanos tu proyecto o necesidad y el equipo correspondiente del
              ecosistema PROEFEX te responderá.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-caption)" }}>
              Los campos marcados con <span aria-hidden="true">*</span> son obligatorios.
            </p>
          </Reveal>

          <Reveal delay={120}>
            {status === "success" ? (
              <div
                className="card flex flex-col items-center gap-3 p-10 text-center"
                role="status"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "var(--bg-sunken)", color: "var(--accent)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-heading)" }}>
                  Tu mensaje fue enviado
                </h3>
                <p className="max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                  Recibimos tu solicitud correctamente. El equipo correspondiente
                  del ecosistema PROEFEX te responderá a la brevedad.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setStatus("idle")}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : status === "unavailable" ? (
              <div
                className="card flex flex-col items-center gap-3 p-10 text-center"
                role="status"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "var(--bg-sunken)", color: "var(--accent)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="12" cy="16.5" r="1.4" fill="currentColor" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-heading)" }}>
                  El envío en línea todavía no está disponible
                </h3>
                <p className="max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                  Tu mensaje <strong>no fue enviado</strong>: este formulario aún
                  no está conectado a un canal de recepción. No guardamos ni
                  reutilizamos los datos ingresados.
                </p>
                <p className="max-w-[48ch]" style={{ color: "var(--text-body)" }}>
                  Mientras se habilita el canal definitivo, contáctanos por los
                  canales oficiales de PROEFEX:{" "}
                  <span className="content-required">DATOS DE CONTACTO — CONTENT_REQUIRED</span>
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setStatus("idle")}
                >
                  Volver al formulario
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                {field("nombres", "Nombre", <input className="field-input" {...inputProps("nombres")} autoComplete="given-name" maxLength={80} />)}
                {field("apellidos", "Apellidos", <input className="field-input" {...inputProps("apellidos")} autoComplete="family-name" maxLength={80} />)}
                {field("empresa", "Empresa", <input className="field-input" {...inputProps("empresa")} autoComplete="organization" maxLength={120} />, { required: false })}
                {field("cargo", "Cargo", <input className="field-input" {...inputProps("cargo")} autoComplete="organization-title" maxLength={120} />, { required: false })}
                {field("email", "Email", <input className="field-input" {...inputProps("email", "email")} autoComplete="email" inputMode="email" maxLength={254} />)}

                <div className="field">
                  <label className="field-label" htmlFor="telefono">
                    Teléfono <span aria-hidden="true">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      aria-label="Código de país"
                      className="field-input phone-code"
                      name="countryCode"
                      value={values.countryCode}
                      onChange={set("countryCode")}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} {c.country}
                        </option>
                      ))}
                    </select>
                    <input
                      className="field-input min-w-0 flex-1"
                      {...inputProps("telefono", "tel")}
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="999 999 999"
                      maxLength={40}
                    />
                  </div>
                  {errors.telefono ? (
                    <p className="field-error" id="telefono-error" role="alert">
                      {errors.telefono}
                    </p>
                  ) : null}
                </div>

                {field(
                  "servicio",
                  "Servicio de interés",
                  <select className="field-input" {...inputProps("servicio")}>
                    <option value="">Selecciona un servicio…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>,
                )}
                {field(
                  "sector",
                  "Sector",
                  <select className="field-input" {...inputProps("sector")}>
                    <option value="">Selecciona un sector…</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>,
                )}

                <div className="sm:col-span-2">
                  {field(
                    "mensaje",
                    "Mensaje",
                    <textarea className="field-input" {...inputProps("mensaje")} rows={5} maxLength={4000} />,
                  )}
                </div>

                {/* Honeypot: invisible para humanos, los bots lo rellenan.
                    El API responde como éxito pero NO persiste estos envíos. */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="honeypot">No completar</label>
                  <input
                    id="honeypot"
                    name="honeypot"
                    value={values.honeypot}
                    onChange={set("honeypot")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="sm:col-span-2 field">
                  <div className="flex items-start gap-3">
                    <input
                      id="consentPrivacidad"
                      name="consentPrivacidad"
                      type="checkbox"
                      checked={values.consentPrivacidad}
                      onChange={set("consentPrivacidad")}
                      aria-invalid={errors.consentPrivacidad ? ("true" as const) : undefined}
                      aria-describedby={errors.consentPrivacidad ? "consentPrivacidad-error" : undefined}
                      className="mt-1"
                    />
                    <label htmlFor="consentPrivacidad" className="field-label" style={{ fontWeight: 400 }}>
                      He leído y acepto la{" "}
                      <a href="/legal/privacidad" className="underline">
                        política de privacidad
                      </a>{" "}
                      y autorizo el tratamiento de mis datos para responder a esta solicitud.{" "}
                      <span aria-hidden="true">*</span>
                    </label>
                  </div>
                  {errors.consentPrivacidad ? (
                    <p className="field-error" id="consentPrivacidad-error" role="alert">
                      {errors.consentPrivacidad}
                    </p>
                  ) : null}
                </div>

                {globalError ? (
                  <div className="sm:col-span-2">
                    <p className="field-error" role="alert">
                      {globalError}
                    </p>
                  </div>
                ) : null}

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Enviando…" : "Enviar mensaje"}
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
