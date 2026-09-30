import type { Metadata } from "next";
import { ContactSection } from "@/components/forms/ContactSection";

export const metadata: Metadata = {
  title: "Contacto — PROEFEX",
  description:
    "Solicitar asesoría, contactar o cotizar con el equipo correcto del ecosistema PROEFEX.",
  alternates: { canonical: "/contacto" },
};

/**
 * /contacto — página propia (§12 del megamenú, §13 home).
 * El formulario vive aquí (antes sección de la home). D17: entrega a Turu
 * CRM en fase posterior.
 */
export default function ContactoPage() {
  return (
    <div style={{ paddingTop: "var(--header-h)" }}>
      <ContactSection />
    </div>
  );
}
