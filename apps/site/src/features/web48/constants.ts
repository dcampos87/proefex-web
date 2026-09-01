import type { Country, LeadIntent } from "./types";

export const LANDING_SLUG = "landing_web_48horas";
export const THANKS_PATH = "/thanks_web_48horas";

export const PRICE_LABEL = "S/1199.00";
export const PRICE_DISPLAY_LABEL = "S/ 1199";
export const OFFER_HOURS = 24;

/**
 * Hora UTC del reinicio diario del contador: las 22:00 de Lima (GMT-5, sin
 * horario de verano) equivalen a las 03:00 UTC del día siguiente. La campaña
 * es constante, así que el contador siempre cuenta hacia la próxima
 * ocurrencia de esta hora.
 */
export const DAILY_RESET_UTC_HOUR = 3;

export const WHATSAPP_ASESOR_NUMBER = "51989551657";
export const WHATSAPP_ASESOR_MESSAGE =
  "Hola, acabo de registrarme en la oferta de la página web (24 horas) y quiero validar mi bono antes de que expire el contador.";
export const WHATSAPP_ASESOR_URL = `https://wa.me/${WHATSAPP_ASESOR_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_ASESOR_MESSAGE
)}`;

export const HEADLINE = "Lanza la página web de tu empresa hoy";
export const BONUS_LINE =
  "Llévate facturación electrónica y libro de reclamaciones gratis el primer mes";
export const SUBTITLE = "Solo 10 cupos disponibles a nivel nacional.";

export const DEFAULT_COUNTRY_CODE = "PE";

export const COUNTRIES: Country[] = [
  { code: "PE", dialCode: "+51", label: "Perú" },
  { code: "CO", dialCode: "+57", label: "Colombia" },
  { code: "MX", dialCode: "+52", label: "México" },
  { code: "EC", dialCode: "+593", label: "Ecuador" },
  { code: "BO", dialCode: "+591", label: "Bolivia" },
  { code: "CL", dialCode: "+56", label: "Chile" },
  { code: "AR", dialCode: "+54", label: "Argentina" },
  { code: "US", dialCode: "+1", label: "Estados Unidos" },
];

export interface IntentOption {
  value: LeadIntent;
  label: string;
}

export const INTENT_OPTIONS: IntentOption[] = [
  { value: "hot", label: "Sí, empiezo hoy" },
  { value: "cold", label: "Solo estoy mirando" },
];

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
