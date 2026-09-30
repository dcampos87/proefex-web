"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * ContactSection — formulario de contacto (D17).
 * Campos definidos: Nombre, Apellidos, Empresa, Cargo, Email, Teléfono
 * (con selector de código de país), Servicio, Sector, Mensaje.
 *
 * Fase 2: UX completa (validación, errores accesibles, loading, éxito).
 * El envío NO integra Turu CRM todavía (fase posterior): se simula el
 * estado de loading y se resuelve en éxito local para validar la experiencia.
 */

interface FieldErrors {
  [key: string]: string;
}

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

type Status = "idle" | "submitting" | "success";

const INITIAL = {
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
};

function validate(values: typeof INITIAL): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.nombres.trim()) errors.nombres = "Ingresa tu nombre.";
  if (!values.apellidos.trim()) errors.apellidos = "Ingresa tus apellidos.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Ingresa un email válido.";
  if (!/^\d{6,15}$/.test(values.telefono.replace(/\s/g, "")))
    errors.telefono = "Ingresa un teléfono válido (solo números).";
  if (!values.servicio) errors.servicio = "Selecciona un servicio.";
  if (!values.sector) errors.sector = "Selecciona un sector.";
  if (values.mensaje.trim().length < 10) errors.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
  return errors;
}

export function ContactSection() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
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

  const set = (key: keyof typeof INITIAL) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((err) => {
      if (!err[key]) return err;
      const next = { ...err };
      delete next[key];
      return next;
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus("submitting");
    // Fase 3: POST al endpoint → Turu CRM (D17). Aquí solo se valida la UX.
    window.setTimeout(() => setStatus("success"), 900);
  };

  const field = (
    key: keyof typeof INITIAL,
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

  const inputProps = (key: keyof typeof INITIAL, type = "text", opts: Record<string, unknown> = {}) => ({
    id: key,
    name: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    ...opts,
    ...(type !== "text" ? { type } : {}),
  });

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
                  style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-heading)" }}>
                  Mensaje registrado
                </h3>
                <p className="max-w-[44ch]" style={{ color: "var(--text-body)" }}>
                  Gracias por escribirnos. Nuestro equipo te contactará pronto.
                </p>
                <p style={{ fontSize: "var(--text-caption)", color: "var(--text-muted)" }}>
                  Vista de validación UX — la entrega a Turu CRM se integra en una fase posterior.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setValues(INITIAL);
                    setStatus("idle");
                  }}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                {field("nombres", "Nombre", <input className="field-input" {...inputProps("nombres")} autoComplete="given-name" />)}
                {field("apellidos", "Apellidos", <input className="field-input" {...inputProps("apellidos")} autoComplete="family-name" />)}
                {field("empresa", "Empresa", <input className="field-input" {...inputProps("empresa")} autoComplete="organization" />, { required: false })}
                {field("cargo", "Cargo", <input className="field-input" {...inputProps("cargo")} autoComplete="organization-title" />, { required: false })}
                {field("email", "Email", <input className="field-input" {...inputProps("email", "email")} autoComplete="email" inputMode="email" />)}

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
                    <textarea className="field-input" {...inputProps("mensaje")} rows={5} />,
                  )}
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={status === "submitting"}>
                    {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
                  </Button>
                  {status === "submitting" ? (
                    <span className="sr-only" role="status">
                      Enviando mensaje
                    </span>
                  ) : null}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
