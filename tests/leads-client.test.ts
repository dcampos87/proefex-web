/**
 * Cliente del canal de contacto `POST /v1/leads` (misión de lanzamiento).
 *
 * Cubre: resolución de configuración (fail closed), validación alineada con el
 * esquema de `proefex-api`, construcción del payload contractual, y manejo de
 * respuestas reales (202, 422 con errors[], 429, 5xx, fallos de red y
 * respuestas fuera de contrato). No hay red real: el `fetch` se inyecta.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildLeadRequest,
  newLeadIdempotencyKey,
  resolveLeadFormConfig,
  submitLead,
  validateLeadValues,
  type LeadFormValues,
} from "../src/lib/leads/client.ts";

const FORM_ID = "3f1a7b2c-9d4e-4a51-8b6f-1c2d3e4f5a60";
const BASE_URL = "https://api.example.com/v1";

function validValues(overrides: Partial<LeadFormValues> = {}): LeadFormValues {
  return {
    nombres: "  Ana  ",
    apellidos: "Quispe",
    empresa: "",
    cargo: "",
    email: "Ana@Example.COM",
    countryCode: "+51",
    telefono: "999 999 999",
    servicio: "PROEFEX TECH — Desarrollo de software",
    sector: "Salud",
    mensaje: "Necesitamos automatizar nuestro proceso de facturación.",
    consentPrivacidad: true,
    honeypot: "",
    ...overrides,
  };
}

interface FetchCall {
  url: string;
  init: RequestInit;
}

function stubFetch(
  responder: Response | (() => Promise<Response> | Response),
): { impl: typeof fetch; calls: FetchCall[] } {
  const calls: FetchCall[] = [];
  const impl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init: init ?? {} });
    return typeof responder === "function" ? await responder() : responder;
  }) as typeof fetch;
  return { impl, calls };
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/problem+json" },
  });
}

test("resolveLeadFormConfig: sin variable → deshabilitado (fail closed)", () => {
  const config = resolveLeadFormConfig({});
  assert.equal(config.enabled, false);
  if (!config.enabled) assert.equal(config.reason, "unconfigured");
});

test("resolveLeadFormConfig: variable con formato inválido → deshabilitado", () => {
  const config = resolveLeadFormConfig({ NEXT_PUBLIC_PROEFEX_LEAD_FORM_ID: "no-es-un-uuid" });
  assert.equal(config.enabled, false);
  if (!config.enabled) assert.equal(config.reason, "invalid-form-id");
});

test("resolveLeadFormConfig: uuid válido → habilitado con formId", () => {
  const config = resolveLeadFormConfig({ NEXT_PUBLIC_PROEFEX_LEAD_FORM_ID: FORM_ID });
  assert.deepEqual(config, { enabled: true, formId: FORM_ID });
});

test("validateLeadValues: valores válidos → sin errores", () => {
  assert.deepEqual(validateLeadValues(validValues()), {});
});

test("validateLeadValues: obligatorios y formatos del contrato", () => {
  const errors = validateLeadValues(
    validValues({
      nombres: "   ",
      apellidos: "",
      email: "no-es-email",
      telefono: "abc",
      servicio: "",
      sector: "",
      mensaje: "corto",
      consentPrivacidad: false,
    }),
  );
  assert.ok(errors.nombres);
  assert.ok(errors.apellidos);
  assert.ok(errors.email);
  assert.ok(errors.telefono);
  assert.ok(errors.servicio);
  assert.ok(errors.sector);
  assert.ok(errors.mensaje);
  assert.ok(errors.consentPrivacidad);
});

test("validateLeadValues: límites máximos del esquema del API", () => {
  const errors = validateLeadValues(
    validValues({
      nombres: "x".repeat(81),
      email: `${"x".repeat(250)}@x.co`,
      mensaje: "x".repeat(4_001),
    }),
  );
  assert.ok(errors.nombres);
  assert.ok(errors.email);
  assert.ok(errors.mensaje);
});

test("validateLeadValues: avalancha de enlaces (el API descartaría en silencio)", () => {
  const errors = validateLeadValues(
    validValues({
      empresa: "http://a.com www.b.com",
      mensaje: "mira https://c.com y www.d.com",
    }),
  );
  assert.ok(errors.mensaje);
});

test("buildLeadRequest: mapea a la forma contractual, trimea, omite vacíos y normaliza el email", () => {
  const request = buildLeadRequest(validValues(), FORM_ID);
  assert.deepEqual(request, {
    formId: FORM_ID,
    fields: {
      firstName: "Ana",
      lastName: "Quispe",
      email: "ana@example.com",
      phone: "999 999 999",
      countryCode: "+51",
      service: "PROEFEX TECH — Desarrollo de software",
      sector: "Salud",
      message: "Necesitamos automatizar nuestro proceso de facturación.",
    },
    consents: [{ type: "privacy", granted: true }],
  });
  assert.equal("honeypot" in request, false);
});

test("buildLeadRequest: honeypot con contenido se incluye (señal anti-abuso)", () => {
  const request = buildLeadRequest(validValues({ honeypot: "spam" }), FORM_ID);
  assert.equal(request.honeypot, "spam");
});

test("newLeadIdempotencyKey: cumple el patrón del API", () => {
  assert.match(newLeadIdempotencyKey(), /^[A-Za-z0-9._-]{8,128}$/);
});

test("submitLead: 202 real usa POST, headers contractuales y el payload exacto", async () => {
  const { impl, calls } = stubFetch(jsonResponse(202, { status: "accepted", duplicate: false }));
  const request = buildLeadRequest(validValues(), FORM_ID);
  const outcome = await submitLead({
    request,
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });

  assert.deepEqual(outcome, { ok: true, duplicate: false });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${BASE_URL}/leads`);
  assert.equal(calls[0].init.method, "POST");
  const headers = new Headers(calls[0].init.headers);
  assert.equal(headers.get("Content-Type"), "application/json");
  assert.equal(headers.get("Idempotency-Key"), "key-1234567890");
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), request);
});

test("submitLead: 202 con duplicate=true (reintento con la misma clave)", async () => {
  const { impl } = stubFetch(jsonResponse(202, { status: "accepted", duplicate: true }));
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });
  assert.deepEqual(outcome, { ok: true, duplicate: true });
});

test("submitLead: 422 mapea errors[] del API a campos de la UI", async () => {
  const { impl, calls } = stubFetch(
    jsonResponse(422, {
      type: "about:blank",
      title: "Validation error",
      status: 422,
      code: "PROEFEX_VALIDATION_ERROR",
      instance: "/v1/leads",
      requestId: "req-1",
      errors: [
        { path: "fields.email", message: "email inválido" },
        { path: "consents", message: "el consentimiento de privacidad es obligatorio" },
      ],
    }),
  );
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });

  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.kind, "validation");
  if (outcome.kind !== "validation") return;
  assert.equal(outcome.fieldErrors.email, "email inválido");
  assert.equal(outcome.fieldErrors.consentPrivacidad, "el consentimiento de privacidad es obligatorio");
  assert.equal(outcome.requestId, "req-1");
  // Sin PII: el cuerpo enviado es el contractual, no se registra en el error.
  assert.ok(!JSON.stringify(outcome).includes("Ana"));
  assert.equal(calls.length, 1);
});

test("submitLead: 422 con path desconocido se reporta global, no en un campo", async () => {
  const { impl } = stubFetch(
    jsonResponse(422, {
      status: 422,
      requestId: "req-2",
      errors: [{ path: "formId", message: "formulario no disponible" }],
    }),
  );
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });
  if (!outcome.ok && outcome.kind === "validation") {
    assert.deepEqual(outcome.fieldErrors, {});
    assert.match(outcome.detail ?? "", /formId/);
  } else {
    assert.fail("se esperaba kind=validation");
  }
});

test("submitLead: 429 → rate-limited con requestId", async () => {
  const { impl } = stubFetch(
    jsonResponse(429, { status: 429, code: "PROEFEX_RATE_LIMITED", requestId: "req-3" }),
  );
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });
  assert.deepEqual(outcome, { ok: false, kind: "rate-limited", requestId: "req-3" });
});

test("submitLead: 5xx → server con requestId, sin detalle interno", async () => {
  const { impl } = stubFetch(
    jsonResponse(500, { status: 500, title: "Internal server error", requestId: "req-4" }),
  );
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });
  assert.deepEqual(outcome, { ok: false, kind: "server", requestId: "req-4" });
});

test("submitLead: fallo de red → resultado ambiguo (no reintentar automáticamente)", async () => {
  const impl = (async () => {
    throw new TypeError("fetch failed");
  }) as typeof fetch;
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });
  assert.deepEqual(outcome, { ok: false, kind: "network" });
});

test("submitLead: 202 fuera de contrato → ambiguo, nunca éxito simulado", async () => {
  const { impl } = stubFetch(jsonResponse(202, { unexpected: true }));
  const outcome = await submitLead({
    request: buildLeadRequest(validValues(), FORM_ID),
    idempotencyKey: "key-1234567890",
    apiBaseUrl: BASE_URL,
    fetchImpl: impl,
  });
  assert.deepEqual(outcome, { ok: false, kind: "network" });
});
