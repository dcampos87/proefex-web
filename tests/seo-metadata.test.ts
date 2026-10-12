/**
 * Convenciones SEO de lanzamiento (misión autorizada).
 *
 * Dos capas:
 * 1. `sitemap.ts` se importa real y se verifican exclusiones (las rutas
 *    noindex de productos/servicios sin contenido no deben listarse).
 * 2. Guardas de convención sobre el fuente: los módulos de página importan
 *    `@/...` y CSS de layout, que el runner nativo de Node no resuelve; por
 *    eso las reglas de metadata se verifican como texto fuente, que es
 *    exactamente lo que Next renderiza.
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import sitemap from "../src/app/sitemap.ts";

function walkPages(dir: string): string[] {
  const acc: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) acc.push(...walkPages(full));
    else if (entry === "page.tsx") acc.push(full);
  }
  return acc;
}

// npm test ejecuta desde la raíz del repositorio (package.json).
const APP_DIR = join(process.cwd(), "src", "app");

test("sitemap: excluye las rutas noindex sin contenido aprobado", () => {
  const routes = sitemap().map((entry) => new URL(entry.url).pathname);
  assert.ok(routes.includes("/contacto"));
  assert.equal(routes.includes("/solutions/turu-crm"), false);
  assert.equal(routes.includes("/tech/desarrollo-de-software"), false);
});

test("títulos: ningún título con marca usa el template (sin 'PROEFEX | PROEFEX')", () => {
  const offenders: string[] = [];
  for (const file of walkPages(APP_DIR)) {
    const normalized = file.split("\\").join("/");
    // La home define el título completo y el template no se le aplica.
    if (normalized.endsWith("src/app/page.tsx")) continue;
    const source = readFileSync(file, "utf8");
    for (const line of source.split("\n")) {
      if (!line.includes("title:") || !line.includes("PROEFEX")) continue;
      if (!/title:\s*\{\s*absolute:/.test(line)) offenders.push(normalized);
    }
  }
  assert.deepEqual(offenders, []);
});

test("títulos: los nombres de pilar se conservan en los hubs", () => {
  const cases: [string, string][] = [
    ["src/app/tech/page.tsx", "PROEFEX TECH — Desarrollo y Digitalización"],
    ["src/app/solutions/page.tsx", "PROEFEX SOLUTIONS — Productos y soluciones"],
    ["src/app/learns/page.tsx", "PROEFEX LEARNS — Formación y Certificación"],
    ["src/app/equip/page.tsx", "PROEFEX EQUIP — Tecnología y equipamiento"],
  ];
  for (const [file, expected] of cases) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    assert.ok(source.includes(`absolute: "${expected}"`), `${file} debe conservar "${expected}"`);
  }
});

test("noindex: turu-crm y desarrollo-de-software no son indexables", () => {
  for (const file of [
    "src/app/solutions/turu-crm/page.tsx",
    "src/app/tech/desarrollo-de-software/page.tsx",
  ]) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    assert.match(source, /robots:\s*\{\s*index:\s*false/);
  }
});

test("layout: twitter:card summary_large_image e imagen OG real del repositorio", () => {
  const source = readFileSync(join(APP_DIR, "layout.tsx"), "utf8");
  assert.match(source, /card:\s*"summary_large_image"/);
  assert.match(source, /\/media\/hero-ecosistema\.webp/);
  assert.ok(statSync(join(process.cwd(), "public", "media", "hero-ecosistema.webp")).size > 0);
});
