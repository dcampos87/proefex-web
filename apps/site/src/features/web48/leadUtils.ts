import { OFFER_HARD_DEADLINE, OFFER_HOURS, UTM_KEYS } from "./constants";
import type { LeadFormValues, LeadPayload, LeadValidationErrors } from "./types";

export const OFFER_MILLISECONDS = OFFER_HOURS * 60 * 60 * 1000;

export function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value);
  return digits.length >= 6 && digits.length <= 15;
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizeEmail(value));
}

export function validateLeadForm(values: LeadFormValues): LeadValidationErrors {
  const errors: LeadValidationErrors = {};
  if (!isValidName(values.firstName)) {
    errors.firstName = "Ingresa tus nombres (mínimo 2 caracteres).";
  }
  if (!isValidName(values.lastName)) {
    errors.lastName = "Ingresa tus apellidos (mínimo 2 caracteres).";
  }
  if (!isValidEmail(values.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }
  if (!isValidPhone(values.phone)) {
    errors.phone = "Ingresa un número de WhatsApp válido (6 a 15 dígitos).";
  }
  return errors;
}

/**
 * Devuelve el deadline vigente de la oferta. Si el visitante ya tiene uno
 * almacenado (vigente o expirado) se conserva; la oferta expirada no se
 * renueva. En todos los casos el resultado queda topado por la ventana de
 * la oferta (OFFER_HOURS desde ahora) y por el límite global de la campaña
 * (OFFER_HARD_DEADLINE), de modo que ningún contador termina después del
 * 31/08/2026 22:00 (hora de Lima).
 */
export function getOrCreateDeadline(now: number, storedDeadline: number | null): number {
  const freshDeadline = Math.min(now + OFFER_MILLISECONDS, OFFER_HARD_DEADLINE);
  if (storedDeadline !== null && Number.isFinite(storedDeadline)) {
    return Math.min(storedDeadline, freshDeadline);
  }
  return freshDeadline;
}

export function readStoredDeadline(storage: Pick<Storage, "getItem">, key: string): number | null {
  const raw = storage.getItem(key);
  if (!raw) {
    return null;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getRemainingMs(deadline: number, now: number): number {
  return Math.max(0, deadline - now);
}

export function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function collectUtm(search: string): Record<string, string> | null {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  let hasParams = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      hasParams = true;
    }
  }
  return hasParams ? utm : null;
}

export function buildLeadPayload(
  values: LeadFormValues,
  options: { dialCode: string; source: string; now?: number; search?: string }
): LeadPayload {
  return {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: normalizeEmail(values.email),
    country: values.countryCode,
    dial_code: options.dialCode,
    whatsapp: normalizePhone(values.phone),
    intent: values.intent,
    source: options.source,
    utm: collectUtm(options.search ?? ""),
    created_at: new Date(options.now ?? Date.now()).toISOString(),
  };
}
