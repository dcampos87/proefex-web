const fs = require("fs");
const path = require("path");

// Universo por árbol (D33/D34): los stubs heredan la identidad visual
// de su línea de negocio (header + página + footer del mismo universo).
const stubs = [
  { dir: "src/app/tech/automatizacion", universe: "tech", pillar: "CREATE — PROEFEX TECH", title: "Automatización", crumb: "Automatización", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/ia-empresarial", universe: "tech", pillar: "CREATE — PROEFEX TECH", title: "IA empresarial", crumb: "IA empresarial", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/transformacion-digital", universe: "tech", pillar: "CREATE — PROEFEX TECH", title: "Transformación digital", crumb: "Transformación digital", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/implementacion-de-software", universe: "tech", pillar: "CREATE — PROEFEX TECH", title: "Implementación de software", crumb: "Implementación de software", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/ingenieria", universe: "tech", pillar: "CREATE — PROEFEX TECH", title: "Ingeniería", crumb: "Ingeniería", requires: "propuesta, alcance y subpáginas (Drones/IoT)", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/ingenieria/drones", universe: "tech", pillar: "CREATE — PROEFEX TECH / INGENIERÍA", title: "Drones", crumb: "Drones", requires: "propuesta y evidencia", back: "/tech/ingenieria", backLabel: "Volver a Ingeniería" },
  { dir: "src/app/tech/ingenieria/iot", universe: "tech", pillar: "CREATE — PROEFEX TECH / INGENIERÍA", title: "IoT", crumb: "IoT", requires: "propuesta y evidencia", back: "/tech/ingenieria", backLabel: "Volver a Ingeniería" },
  { dir: "src/app/grow-up/marketing-bpo", universe: "growup", pillar: "GROW — GROW UP", title: "Marketing BPO", crumb: "Marketing BPO", requires: "propuesta y método", back: "/grow-up", backLabel: "Volver a Grow Up" },
  { dir: "src/app/grow-up/growth-marketing", universe: "growup", pillar: "GROW — GROW UP", title: "Growth Marketing", crumb: "Growth Marketing", requires: "propuesta y método", back: "/grow-up", backLabel: "Volver a Grow Up" },
  { dir: "src/app/grow-up/consultoria", universe: "growup", pillar: "GROW — GROW UP", title: "Consultoría de marketing", crumb: "Consultoría de marketing", requires: "propuesta y método", back: "/grow-up", backLabel: "Volver a Grow Up" },
  { dir: "src/app/learns/cursos", universe: "learns", pillar: "LEARN — PROEFEX LEARNS", title: "Cursos", crumb: "Cursos", requires: "catálogo (D16: no inventar)", back: "/learns", backLabel: "Volver a PROEFEX LEARNS" },
  { dir: "src/app/learns/certificacion", universe: "learns", pillar: "LEARN — PROEFEX LEARNS", title: "Certificación", crumb: "Certificación", requires: "rutas de certificación (Certmind)", back: "/learns", backLabel: "Volver a PROEFEX LEARNS" },
  { dir: "src/app/equip/tecnologia", universe: "equip", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Tecnología", crumb: "Tecnología", requires: "catálogo", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/pantallas", universe: "equip", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Pantallas", crumb: "Pantallas", requires: "catálogo y especificaciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/interactivas", universe: "equip", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Interactivas", crumb: "Interactivas", requires: "catálogo y especificaciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/totems", universe: "equip", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Tótems", crumb: "Tótems", requires: "catálogo y especificaciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/alquiler", universe: "equip", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Alquiler", crumb: "Alquiler", requires: "catálogo y condiciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/solutions/proefact", universe: "solve", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "PROEFACT", crumb: "PROEFACT", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/my-bpass", universe: "solve", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "My Bpass", crumb: "My Bpass", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/atendigo", universe: "solve", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "AtendiGo", crumb: "AtendiGo", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/eleventto", universe: "solve", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "Eleventto", crumb: "Eleventto", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/klyra", universe: "solve", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "Klyra", crumb: "Klyra", requires: "producto reservado/futuro: sin información pública", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/sectores/industria", universe: "core", pillar: "PROEFEX — SECTORES", title: "Industria", crumb: "Industria", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/salud", universe: "core", pillar: "PROEFEX — SECTORES", title: "Salud", crumb: "Salud", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/retail", universe: "core", pillar: "PROEFEX — SECTORES", title: "Retail", crumb: "Retail", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/educacion", universe: "core", pillar: "PROEFEX — SECTORES", title: "Educación", crumb: "Educación", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/servicios", universe: "core", pillar: "PROEFEX — SECTORES", title: "Servicios", crumb: "Servicios", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/mineria", universe: "core", pillar: "PROEFEX — SECTORES", title: "Minería", crumb: "Minería", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/restaurantes", universe: "core", pillar: "PROEFEX — SECTORES", title: "Restaurantes", crumb: "Restaurantes", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/sectores/banca-seguros", universe: "core", pillar: "PROEFEX — SECTORES", title: "Banca y seguros", crumb: "Banca y seguros", requires: "descripción del sector y capacidades aplicables", back: "/sectores", backLabel: "Volver a Sectores" },
  { dir: "src/app/insights/tecnologia", universe: "core", pillar: "PROEFEX — INSIGHTS", title: "Tecnología", crumb: "Tecnología", requires: "artículos de la categoría", back: "/insights", backLabel: "Volver a Insights" },
  { dir: "src/app/insights/marketing", universe: "core", pillar: "PROEFEX — INSIGHTS", title: "Marketing", crumb: "Marketing", requires: "artículos de la categoría", back: "/insights", backLabel: "Volver a Insights" },
  { dir: "src/app/insights/innovacion", universe: "core", pillar: "PROEFEX — INSIGHTS", title: "Innovación", crumb: "Innovación", requires: "artículos de la categoría", back: "/insights", backLabel: "Volver a Insights" },
  { dir: "src/app/insights/formacion", universe: "core", pillar: "PROEFEX — INSIGHTS", title: "Formación", crumb: "Formación", requires: "artículos de la categoría", back: "/insights", backLabel: "Volver a Insights" },
];

const template = (s) => `import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: '${s.title} — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="${s.pillar}"
      title="${s.title}"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: '${s.crumb}' },
      ]}
      requires="${s.requires}"
      backHref="${s.back}"
      backLabel="${s.backLabel}"
      universe="${s.universe}"
    />
  );
}
`;

let count = 0;
for (const s of stubs) {
  const file = path.join(s.dir, "page.tsx");
  // Regenerar solo si la página es un stub (protege páginas custom como
  // /casos, /insights, /sectores, plantillas y landings).
  const isStub = !fs.existsSync(file) || fs.readFileSync(file, "utf8").includes("RouteStub");
  if (isStub) {
    fs.mkdirSync(s.dir, { recursive: true });
    fs.writeFileSync(file, template(s));
    count++;
  }
}
console.log("stubs creados/actualizados:", count);
