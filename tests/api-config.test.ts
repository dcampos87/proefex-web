/**
 * Resolución de configuración del API por entorno (F3.2).
 *
 * Cubre el requisito "URL de API por entorno": producción usa el dominio
 * aprobado del contrato, desarrollo usa el API local, staging no tiene default
 * (pendiente en `proefex-api`/infraestructura) y toda entrada inválida falla
 * cerrada en lugar de adivinar un destino.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import {
  API_BASE_URL_VAR,
  API_ENVIRONMENT_VAR,
  LOCAL_API_BASE_URL,
  PRODUCTION_API_BASE_URL,
  resolveApiConfig,
  resolveApiEnvironment,
} from "../src/lib/api/config.ts";

test("producción usa el dominio público aprobado del contrato", () => {
  const config = resolveApiConfig({}, "production");
  assert.equal(config.enabled, true);
  assert.equal(config.environment, "production");
  assert.equal(config.enabled && config.baseUrl, PRODUCTION_API_BASE_URL);
  assert.equal(config.enabled && config.source, "default");
});

test("desarrollo usa el API local y no el de producción", () => {
  const config = resolveApiConfig({}, "development");
  assert.equal(config.enabled, true);
  assert.equal(config.enabled && config.baseUrl, LOCAL_API_BASE_URL);
  assert.notEqual(config.enabled && config.baseUrl, PRODUCTION_API_BASE_URL);
});

test("staging no tiene default: queda deshabilitado y lo reporta", () => {
  const config = resolveApiConfig({ [API_ENVIRONMENT_VAR]: "staging" }, "production");
  assert.equal(config.environment, "staging");
  assert.equal(config.enabled, false);
  assert.equal(!config.enabled && config.reason, "unconfigured");
});

test("staging funciona cuando se define la variable explícitamente", () => {
  const config = resolveApiConfig(
    { [API_ENVIRONMENT_VAR]: "staging", [API_BASE_URL_VAR]: "https://api.staging.example.com/v1" },
    "production",
  );
  assert.equal(config.enabled, true);
  assert.equal(config.enabled && config.baseUrl, "https://api.staging.example.com/v1");
  assert.equal(config.enabled && config.source, "environment-variable");
});

test("la variable de entorno tiene prioridad sobre el default del entorno", () => {
  const config = resolveApiConfig({ [API_BASE_URL_VAR]: "https://api.example.com/v1/" }, "production");
  assert.equal(config.enabled && config.baseUrl, "https://api.example.com/v1");
});

test("una base URL inválida no habilita el cliente", () => {
  for (const invalid of ["no-es-una-url", "ftp://api.example.com", "https://api.example.com/v1?a=1", "https://user:pass@api.example.com/v1"]) {
    const config = resolveApiConfig({ [API_BASE_URL_VAR]: invalid }, "production");
    assert.equal(config.enabled, false, `debería rechazar "${invalid}"`);
    assert.equal(!config.enabled && config.reason, "invalid-base-url");
  }
});

test("un PROEFEX_API_ENV desconocido se ignora y se deduce de NODE_ENV", () => {
  assert.equal(resolveApiEnvironment({ [API_ENVIRONMENT_VAR]: "locura" }, "production"), "production");
  assert.equal(resolveApiEnvironment({ [API_ENVIRONMENT_VAR]: "locura" }, "development"), "development");
});

test("PROEFEX_API_ENV se normaliza (mayúsculas y espacios)", () => {
  assert.equal(resolveApiEnvironment({ [API_ENVIRONMENT_VAR]: "  STAGING " }, "production"), "staging");
});
