const fs = require("fs");
const path = require("path");

const stubs = [
  { dir: "src/app/tech/automatizacion", pillar: "CREATE — PROEFEX TECH", title: "Automatización", crumb: "Automatización", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/ia-empresarial", pillar: "CREATE — PROEFEX TECH", title: "IA empresarial", crumb: "IA empresarial", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/transformacion-digital", pillar: "CREATE — PROEFEX TECH", title: "Transformación digital", crumb: "Transformación digital", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/implementacion-de-software", pillar: "CREATE — PROEFEX TECH", title: "Implementación de software", crumb: "Implementación de software", requires: "propuesta y alcance", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/ingenieria", pillar: "CREATE — PROEFEX TECH", title: "Ingeniería", crumb: "Ingeniería", requires: "propuesta, alcance y subpáginas (Drones/IoT)", back: "/tech", backLabel: "Volver a PROEFEX TECH" },
  { dir: "src/app/tech/ingenieria/drones", pillar: "CREATE — PROEFEX TECH / INGENIERÍA", title: "Drones", crumb: "Drones", requires: "propuesta y evidencia", back: "/tech/ingenieria", backLabel: "Volver a Ingeniería" },
  { dir: "src/app/tech/ingenieria/iot", pillar: "CREATE — PROEFEX TECH / INGENIERÍA", title: "IoT", crumb: "IoT", requires: "propuesta y evidencia", back: "/tech/ingenieria", backLabel: "Volver a Ingeniería" },
  { dir: "src/app/grow-up/marketing-bpo", pillar: "GROW — GROW UP", title: "Marketing BPO", crumb: "Marketing BPO", requires: "propuesta y método", back: "/grow-up", backLabel: "Volver a Grow Up" },
  { dir: "src/app/grow-up/growth-marketing", pillar: "GROW — GROW UP", title: "Growth Marketing", crumb: "Growth Marketing", requires: "propuesta y método", back: "/grow-up", backLabel: "Volver a Grow Up" },
  { dir: "src/app/grow-up/consultoria", pillar: "GROW — GROW UP", title: "Consultoría de marketing", crumb: "Consultoría de marketing", requires: "propuesta y método", back: "/grow-up", backLabel: "Volver a Grow Up" },
  { dir: "src/app/learns/cursos", pillar: "LEARN — PROEFEX LEARNS", title: "Cursos", crumb: "Cursos", requires: "catálogo (D16: no inventar)", back: "/learns", backLabel: "Volver a PROEFEX LEARNS" },
  { dir: "src/app/learns/certificacion", pillar: "LEARN — PROEFEX LEARNS", title: "Certificación", crumb: "Certificación", requires: "rutas de certificación (Certmind)", back: "/learns", backLabel: "Volver a PROEFEX LEARNS" },
  { dir: "src/app/equip/tecnologia", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Tecnología", crumb: "Tecnología", requires: "catálogo", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/pantallas", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Pantallas", crumb: "Pantallas", requires: "catálogo y especificaciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/interactivas", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Interactivas", crumb: "Interactivas", requires: "catálogo y especificaciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/totems", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Tótems", crumb: "Tótems", requires: "catálogo y especificaciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/equip/alquiler", pillar: "EXPERIENCE — PROEFEX EQUIP", title: "Alquiler", crumb: "Alquiler", requires: "catálogo y condiciones", back: "/equip", backLabel: "Volver a PROEFEX EQUIP" },
  { dir: "src/app/solutions/proefact", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "PROEFACT", crumb: "PROEFACT", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/my-bpass", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "My Bpass", crumb: "My Bpass", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/atendigo", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "AtendiGo", crumb: "AtendiGo", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/eleventto", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "Eleventto", crumb: "Eleventto", requires: "detalle del producto (D15)", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/solutions/klyra", pillar: "SOLVE — PROEFEX SOLUTIONS", title: "Klyra", crumb: "Klyra", requires: "producto reservado/futuro: sin información pública", back: "/solutions", backLabel: "Volver a PROEFEX SOLUTIONS" },
  { dir: "src/app/sectores", pillar: "PROEFEX", title: "Sectores", crumb: "Sectores", requires: "descripciones por sector (dimensión transversal)", back: "/", backLabel: "Volver al inicio" },
  { dir: "src/app/casos", pillar: "PROEFEX", title: "Casos de éxito", crumb: "Casos de éxito", requires: "casos reales autorizados (no se inventan)", back: "/", backLabel: "Volver al inicio" },
  { dir: "src/app/insights", pillar: "PROEFEX", title: "Insights", crumb: "Insights", requires: "artículos (D3: sin CMS en esta etapa)", back: "/", backLabel: "Volver al inicio" },
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
    />
  );
}
`;

let count = 0;
for (const s of stubs) {
  const file = path.join(s.dir, "page.tsx");
  if (!fs.existsSync(file)) {
    fs.mkdirSync(s.dir, { recursive: true });
    fs.writeFileSync(file, template(s));
    count++;
  }
}
console.log("stubs creados:", count);
