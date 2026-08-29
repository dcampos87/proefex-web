export type LeadIntent = "hot" | "cold";

export interface Country {
  code: string;
  dialCode: string;
  label: string;
}

export interface LeadFormValues {
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  intent: LeadIntent;
}

export interface LeadPayload {
  first_name: string;
  last_name: string;
  country: string;
  dial_code: string;
  whatsapp: string;
  intent: LeadIntent;
  source: string;
  utm: Record<string, string> | null;
  created_at: string;
}

export interface LeadValidationErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
}
