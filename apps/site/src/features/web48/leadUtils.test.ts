import { describe, expect, it } from "vitest";

import { LANDING_SLUG } from "./constants";
import {
  OFFER_MILLISECONDS,
  buildLeadPayload,
  collectUtm,
  formatCountdown,
  getNextDailyDeadline,
  getRemainingMs,
  isValidEmail,
  isValidName,
  isValidPhone,
  normalizeEmail,
  normalizePhone,
  validateLeadForm,
} from "./leadUtils";
import type { LeadFormValues } from "./types";

const BASE_NOW = 1_700_000_000_000;

const validValues: LeadFormValues = {
  firstName: "Ana María",
  lastName: "Torres Paz",
  email: "ana.torres@empresa.com",
  countryCode: "PE",
  phone: "999 888-777",
  intent: "hot",
};

describe("normalizePhone", () => {
  it("elimina todo lo que no sea dígito", () => {
    expect(normalizePhone("+51 999-888.777")).toBe("51999888777");
  });

  it("devuelve cadena vacía si no hay dígitos", () => {
    expect(normalizePhone("abc ()")).toBe("");
  });
});

describe("isValidName", () => {
  it("acepta nombres de 2+ caracteres", () => {
    expect(isValidName("Ana")).toBe(true);
    expect(isValidName(" An ")).toBe(true);
  });

  it("rechaza nombres vacíos o de 1 carácter", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("A")).toBe(false);
    expect(isValidName("   ")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("acepta entre 6 y 15 dígitos", () => {
    expect(isValidPhone("987654")).toBe(true);
    expect(isValidPhone("987654321")).toBe(true);
    expect(isValidPhone("123456789012345")).toBe(true);
  });

  it("rechaza menos de 6 o más de 15 dígitos", () => {
    expect(isValidPhone("12345")).toBe(false);
    expect(isValidPhone("1234567890123456")).toBe(false);
    expect(isValidPhone("")).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("recorta espacios y convierte a minúsculas", () => {
    expect(normalizeEmail("  Ana@Empresa.COM ")).toBe("ana@empresa.com");
  });
});

describe("isValidEmail", () => {
  it("acepta correos con formato válido", () => {
    expect(isValidEmail("ana@empresa.com")).toBe(true);
    expect(isValidEmail(" Ana.Torres@sub.empresa.com.pe ")).toBe(true);
    expect(isValidEmail("usuario+tag@dominio.co")).toBe(true);
  });

  it("rechaza correos vacíos o mal formados", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("ana@empresa")).toBe(false);
    expect(isValidEmail("ana@empresa.")).toBe(false);
    expect(isValidEmail("ana empresa.com")).toBe(false);
    expect(isValidEmail("@empresa.com")).toBe(false);
    expect(isValidEmail("ana@.com")).toBe(false);
  });
});

describe("validateLeadForm", () => {
  it("no devuelve errores con datos válidos", () => {
    expect(validateLeadForm(validValues)).toEqual({});
  });

  it("devuelve un error por campo inválido", () => {
    const errors = validateLeadForm({
      firstName: "",
      lastName: "X",
      email: "correo-invalido",
      countryCode: "PE",
      phone: "123",
      intent: "hot",
    });
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
  });
});

describe("getNextDailyDeadline", () => {
  it("antes de las 22:00 Lima devuelve las 22:00 Lima del mismo día", () => {
    // 01/09/2026 15:00 Lima = 01/09/2026 20:00 UTC
    const now = Date.UTC(2026, 8, 1, 20, 0, 0);
    // 22:00 Lima del 01/09 = 03:00 UTC del 02/09
    expect(getNextDailyDeadline(now)).toBe(Date.UTC(2026, 8, 2, 3, 0, 0));
  });

  it("después de las 22:00 Lima devuelve las 22:00 Lima del día siguiente", () => {
    // 01/09/2026 23:00 Lima = 02/09/2026 04:00 UTC
    const now = Date.UTC(2026, 8, 2, 4, 0, 0);
    // 22:00 Lima del 02/09 = 03:00 UTC del 03/09
    expect(getNextDailyDeadline(now)).toBe(Date.UTC(2026, 8, 3, 3, 0, 0));
  });

  it("a las 22:00 Lima en punto se reinicia hacia el día siguiente", () => {
    // 22:00 Lima del 01/09 = 03:00 UTC del 02/09
    const now = Date.UTC(2026, 8, 2, 3, 0, 0);
    expect(getNextDailyDeadline(now)).toBe(Date.UTC(2026, 8, 3, 3, 0, 0));
  });

  it("un instante antes del cierre mantiene el cierre del día en curso", () => {
    const now = Date.UTC(2026, 8, 2, 3, 0, 0) - 1;
    expect(getNextDailyDeadline(now)).toBe(Date.UTC(2026, 8, 2, 3, 0, 0));
  });
});

describe("getRemainingMs", () => {
  it("devuelve la diferencia cuando falta tiempo", () => {
    expect(getRemainingMs(BASE_NOW + 5000, BASE_NOW)).toBe(5000);
  });

  it("devuelve 0 cuando el deadline ya pasó", () => {
    expect(getRemainingMs(BASE_NOW - 5000, BASE_NOW)).toBe(0);
  });
});

describe("formatCountdown", () => {
  it("formatea 24 horas exactas", () => {
    expect(formatCountdown(OFFER_MILLISECONDS)).toBe("24:00:00");
  });

  it("formatea horas, minutos y segundos mixtos", () => {
    const ms = (7 * 3600 + 9 * 60 + 5) * 1000;
    expect(formatCountdown(ms)).toBe("07:09:05");
  });

  it("muestra 00:00:00 al expirar", () => {
    expect(formatCountdown(0)).toBe("00:00:00");
    expect(formatCountdown(-123)).toBe("00:00:00");
  });
});

describe("collectUtm", () => {
  it("devuelve null si no hay parámetros UTM", () => {
    expect(collectUtm("")).toBeNull();
    expect(collectUtm("?foo=bar")).toBeNull();
  });

  it("extrae solo las claves UTM presentes", () => {
    expect(collectUtm("?utm_source=fb&utm_campaign=web48&other=1")).toEqual({
      utm_source: "fb",
      utm_campaign: "web48",
    });
  });
});

describe("buildLeadPayload", () => {
  it("construye el payload completo con UTMs", () => {
    const payload = buildLeadPayload(validValues, {
      dialCode: "+51",
      source: LANDING_SLUG,
      now: BASE_NOW,
      search: "?utm_source=facebook",
    });

    expect(payload).toEqual({
      first_name: "Ana María",
      last_name: "Torres Paz",
      email: "ana.torres@empresa.com",
      country: "PE",
      dial_code: "+51",
      whatsapp: "999888777",
      intent: "hot",
      source: "landing_web_48horas",
      utm: { utm_source: "facebook" },
      created_at: new Date(BASE_NOW).toISOString(),
    });
  });

  it("deja utm en null sin parámetros y usa la fecha actual por defecto", () => {
    const payload = buildLeadPayload(validValues, { dialCode: "+57", source: LANDING_SLUG });
    expect(payload.utm).toBeNull();
    expect(payload.dial_code).toBe("+57");
    expect(payload.created_at).toBeTruthy();
  });

  it("normaliza el correo a minúsculas y sin espacios", () => {
    const payload = buildLeadPayload(
      { ...validValues, email: "  Ana.Torres@Empresa.COM " },
      { dialCode: "+51", source: LANDING_SLUG, now: BASE_NOW }
    );
    expect(payload.email).toBe("ana.torres@empresa.com");
  });
});
