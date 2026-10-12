/**
 * Cliente del canal de contacto `POST /v1/leads` (proefex-api Sprint 4).
 *
 * Fuente de verdad del contrato: `src/modules/leads/leads.schemas.ts` de
 * `proefex-api` (verificado contra el código real, no contra documentación):
 *
 *   POST {base}/v1/leads
 *   Headers: Content-Type: application/json, Idempotency-Key (8..128, [A-Za-z0-9._-])
 *   Body:    { formId: uuid, fields: {...}, consents: [...], honeypot? }  (strictObject)
 *   202 →    { status: "accepted", duplicate: boolean }
 *   422 →    RFC 7807 con errors[] { path, message } y paths "fields.*",
 *            "consents", "formId" o "(root)"
 *   429 →    RFC 7807 rate-limited
 *
 * Reglas operativas (misión de lanzamiento):
 * - El envío es DIRECTO del navegador al API público (CORS de producción
 *   verificado para https://www.proefexperu.com, incluido el header
 *   Idempotency-Key). No hay proxy: el Lead consume el contrato del API tal cual.
 * - `formId` proviene de una variable de entorno PÚBLICA (no es un secreto: es
 *   el id de un formulario publicado vía CMS). Sin ella el canal queda
 *   deshabilitado de forma honesta (fail closed), nunca simulando éxito.
 * - NO hay reintento automático: un fallo de red/timeout es un resultado
 *   ambiguo y reintentar podría crear leads duplicados. La misma
 *   `Idempotency-Key` se conserva para el reintento MANUAL del mismo envío
 *   (el API deduplica) y se regenera tras un envío exitoso.
 * - Sin PII en logs ni errores: los errores estructurados nunca incluyen el
 *   payload, solo códigos, mensajes del API y `requestId`.
 */

import { getApiConfig } from "../api/config.ts";

/** Variable pública con el `lead_forms.id` publicado en el CMS. */
export const LEAD_FORM_ID_VAR = "NEXT_PUBLIC_PROEFEX_LEAD_FORM_ID";

/** Base del API (incluye `/v1`), obtenida de la configuración única del contrato. */
export function resolveLeadsApiBaseUrl(): string | null {
  const config = getApiConfig();
  return config.enabled ? config.baseUrl : null;
}

export type LeadFormConfig =
  | { readonly enabled: true; readonly formId: string }
  | { readonly enabled: false; readonly reason: "unconfigured" | "invalid-form-id"; readonly detail: string };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Resuelve el formulario de destino. Falla cerrado: un id ausente o con
 * formato inválido deshabilita el canal en lugar de apuntar a un destino
 * adivinado.
 */
export function resolveLeadFormConfig(env: Readonly<Record<string, string | undefined>>): LeadFormConfig {
  const raw = (env[LEAD_FORM_ID_VAR] ?? "").trim();
  if (raw.length === 0) {
    return {
      enabled: false,
      reason: "unconfigured",
      detail: `define ${LEAD_FORM_ID_VAR} con el id de un formulario publicado en el CMS`,
    };
  }
  if (!UUID_PATTERN.test(raw)) {
    return { enabled: false, reason: "invalid-form-id", detail: `${LEAD_FORM_ID_VAR} no es un UUID válido` };
  }
  return { enabled: true, formId: raw };
}

/** Valores del formulario tal como los maneja la UI (ContactSection). */
export interface LeadFormValues {
  nombres: string;
  apellidos: string;
  empresa: string;
  cargo: string;
  email: string;
  countryCode: string;
  telefono: string;
  servicio: string;
  sector: string;
  mensaje: string;
  consentPrivacidad: boolean;
  /** Campo trampa anti-bot: un humano lo deja vacío. */
  honeypot: string;
}

export type LeadFieldErrors = Record<string, string>;

/**
 * Límites tomados de `leadFieldsSchema` (proefex-api). La UI puede ser más
 * estricta (p. ej. mínimo de mensaje), nunca más laxa.
 */
const LIMITS = {
  firstName: 80,
  lastName: 80,
  company: 120,
  jobTitle: 120,
  email: 254,
  phone: 40,
  countryCode: 8,
  service: 120,
  sector: 120,
  message: 4_000,
} as const;

/**
 * El API descarta en silencio (responde como éxito SIN persistir) envíos con
 * más de 3 enlaces (leads.antispam). Validarlo en cliente evita que un
 * remitente legítimo reciba un "éxito" falso.
 */
const MAX_LINK_COUNT = 3;
const LINK_PATTERN = /https?:\/\/|www\./gi;

function countLinks(value: string): number {
  return value.match(LINK_PATTERN)?.length ?? 0;
}

/**
 * Validación de cliente alineada con el esquema del API. Devuelve errores por
 * clave de la UI. La ausencia del consentimiento de privacidad es un error:
 * el API lo rechaza (superRefine del contrato).
 */
export function validateLeadValues(values: LeadFormValues): LeadFieldErrors {
  const errors: LeadFieldErrors = {};

  const nombres = values.nombres.trim();
  if (nombres.length === 0) errors.nombres = "Ingresa tu nombre.";
  else if (nombres.length > LIMITS.firstName) errors.nombres = `Máximo ${LIMITS.firstName} caracteres.`;

  const apellidos = values.apellidos.trim();
  if (apellidos.length === 0) errors.apellidos = "Ingresa tus apellidos.";
  else if (apellidos.length > LIMITS.lastName) errors.apellidos = `Máximo ${LIMITS.lastName} caracteres.`;

  const empresa = values.empresa.trim();
  if (empresa.length > LIMITS.company) errors.empresa = `Máximo ${LIMITS.company} caracteres.`;

  const cargo = values.cargo.trim();
  if (cargo.length > LIMITS.jobTitle) errors.cargo = `Máximo ${LIMITS.jobTitle} caracteres.`;

  const email = values.email.trim();
  if (email.length === 0) errors.email = "Ingresa un email válido.";
  else if (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Ingresa un email válido.";

  const telefono = values.telefono.replace(/\s/g, "");
  if (telefono.length === 0) errors.telefono = "Ingresa un teléfono válido (solo números).";
  else if (!/^\d{6,15}$/.test(telefono)) errors.telefono = "Ingresa un teléfono válido (solo números).";

  if (values.countryCode.trim().length > LIMITS.countryCode) errors.countryCode = "Código de país demasiado largo.";

  const servicio = values.servicio.trim();
  if (servicio.length === 0) errors.servicio = "Selecciona un servicio.";
  else if (servicio.length > LIMITS.service) errors.servicio = `Máximo ${LIMITS.service} caracteres.`;

  const sector = values.sector.trim();
  if (sector.length === 0) errors.sector = "Selecciona un sector.";
  else if (sector.length > LIMITS.sector) errors.sector = `Máximo ${LIMITS.sector} caracteres.`;

  const mensaje = values.mensaje.trim();
  if (mensaje.length < 10) errors.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
  else if (mensaje.length > LIMITS.message) errors.mensaje = `Máximo ${LIMITS.message} caracteres.`;

  if (
    countLinks(mensaje) + countLinks(empresa) + countLinks(cargo) > MAX_LINK_COUNT
  ) {
    errors.mensaje = "Demasiados enlaces: describe tu necesidad sin incluir más de 3.";
  }

  if (!values.consentPrivacidad) {
    errors.consentPrivacidad = "Debes aceptar la política de privacidad para enviar el mensaje.";
  }

  return errors;
}

/** DTO contractual `LeadRequestDto` (campos opcionales vacíos se OMITEN: el contrato es strictObject). */
export interface LeadRequest {
  readonly formId: string;
  readonly fields: {
    readonly firstName: string;
    readonly lastName?: string;
    readonly company?: string;
    readonly jobTitle?: string;
    readonly email: string;
    readonly phone?: string;
    readonly countryCode?: string;
    readonly service?: string;
    readonly sector?: string;
    readonly message: string;
  };
  readonly consents: readonly { readonly type: "privacy"; readonly granted: boolean }[];
  readonly honeypot?: string;
}

type LeadFieldsInput = {
  -readonly [K in keyof LeadRequest["fields"]]: LeadRequest["fields"][K];
};

function optionalText(value: string, max: number): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return undefined;
  return trimmed;
}

/**
 * Construye el payload contractual desde los valores de la UI.
 * El email se normaliza a minúsculas igual que el API (persistencia determinista).
 */
export function buildLeadRequest(values: LeadFormValues, formId: string): LeadRequest {
  const fields: LeadFieldsInput = {
    firstName: values.nombres.trim(),
    email: values.email.trim().toLowerCase(),
    message: values.mensaje.trim(),
  };
  const lastName = optionalText(values.apellidos, LIMITS.lastName);
  if (lastName !== undefined) fields.lastName = lastName;
  const company = optionalText(values.empresa, LIMITS.company);
  if (company !== undefined) fields.company = company;
  const jobTitle = optionalText(values.cargo, LIMITS.jobTitle);
  if (jobTitle !== undefined) fields.jobTitle = jobTitle;
  const phone = optionalText(values.telefono, LIMITS.phone);
  if (phone !== undefined) fields.phone = phone;
  const countryCode = optionalText(values.countryCode, LIMITS.countryCode);
  if (countryCode !== undefined) fields.countryCode = countryCode;
  const service = optionalText(values.servicio, LIMITS.service);
  if (service !== undefined) fields.service = service;
  const sector = optionalText(values.sector, LIMITS.sector);
  if (sector !== undefined) fields.sector = sector;

  const honeypot = values.honeypot.trim();

  return {
    formId,
    fields,
    // El contrato exige privacy.granted: la validación de cliente lo garantiza.
    consents: [{ type: "privacy", granted: values.consentPrivacidad }],
    ...(honeypot.length > 0 && honeypot.length <= 200 ? { honeypot } : {}),
  };
}

/** Clave de idempotencia (UUID: cumple el patrón del API). */
export function newLeadIdempotencyKey(): string {
  return globalThis.crypto.randomUUID();
}

export type SubmitLeadOutcome =
  | { readonly ok: true; readonly duplicate: boolean }
  | {
      readonly ok: false;
      readonly kind: "validation";
      readonly fieldErrors: LeadFieldErrors;
      readonly detail?: string;
      readonly requestId?: string;
    }
  | { readonly ok: false; readonly kind: "rate-limited"; readonly requestId?: string }
  | { readonly ok: false; readonly kind: "server"; readonly requestId?: string }
  /** Red/timeout/respuesta ilegible: resultado ambiguo, NO reintentar automáticamente. */
  | { readonly ok: false; readonly kind: "network" };

/** Paths `errors[].path` del API → claves de la UI. Lo desconocido se reporta global. */
const FIELD_PATH_TO_UI: Readonly<Record<string, string>> = {
  "fields.firstName": "nombres",
  "fields.lastName": "apellidos",
  "fields.company": "empresa",
  "fields.jobTitle": "cargo",
  "fields.email": "email",
  "fields.phone": "telefono",
  "fields.countryCode": "countryCode",
  "fields.service": "servicio",
  "fields.sector": "sector",
  "fields.message": "mensaje",
  consents: "consentPrivacidad",
};

interface ProblemDetails {
  status?: number;
  detail?: string;
  requestId?: string;
  errors?: readonly { path?: string; message?: string }[];
}

function mapServerFieldErrors(errors: ProblemDetails["errors"]): {
  fieldErrors: LeadFieldErrors;
  globalMessages: string[];
} {
  const fieldErrors: LeadFieldErrors = {};
  const globalMessages: string[] = [];
  for (const issue of errors ?? []) {
    const path = issue.path ?? "";
    const message = issue.message ?? "Valor inválido.";
    const uiKey = FIELD_PATH_TO_UI[path];
    if (uiKey !== undefined && fieldErrors[uiKey] === undefined) {
      fieldErrors[uiKey] = message;
    } else {
      globalMessages.push(`${path}: ${message}`);
    }
  }
  return { fieldErrors, globalMessages };
}

async function readProblem(response: Response): Promise<ProblemDetails | null> {
  try {
    const body = (await response.json()) as ProblemDetails;
    return typeof body === "object" && body !== null ? body : null;
  } catch {
    return null;
  }
}

export interface SubmitLeadOptions {
  readonly request: LeadRequest;
  readonly idempotencyKey: string;
  readonly apiBaseUrl: string;
  readonly fetchImpl?: typeof fetch;
  readonly timeoutMs?: number;
}

/**
 * Envía el lead al contrato real. Un solo intento por llamada: la UI decide si
 * ofrece reintento manual (conservando la misma `Idempotency-Key`).
 */
export async function submitLead(options: SubmitLeadOptions): Promise<SubmitLeadOutcome> {
  const { request, idempotencyKey, apiBaseUrl } = options;
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 15_000;

  let response: Response;
  try {
    response = await fetchImpl(`${apiBaseUrl}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    // Red caída, CORS, timeout: el estado real del envío es desconocido.
    return { ok: false, kind: "network" };
  }

  if (response.status === 202) {
    const body = await readProblem(response);
    // Respuesta fuera de contrato se trata como ambigua (network).
    const accepted = body as { status?: unknown; duplicate?: unknown } | null;
    if (accepted === null || accepted.status !== "accepted") {
      return { ok: false, kind: "network" };
    }
    return { ok: true, duplicate: accepted.duplicate === true };
  }

  const problem = await readProblem(response);

  if (response.status === 422) {
    const { fieldErrors, globalMessages } = mapServerFieldErrors(problem?.errors);
    return {
      ok: false,
      kind: "validation",
      fieldErrors,
      detail: globalMessages.length > 0 ? globalMessages.join(" ") : problem?.detail,
      requestId: problem?.requestId,
    };
  }

  if (response.status === 429) {
    return { ok: false, kind: "rate-limited", requestId: problem?.requestId };
  }

  return { ok: false, kind: "server", requestId: problem?.requestId };
}
