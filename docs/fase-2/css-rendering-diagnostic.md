# CSS RENDERING DIAGNOSTIC — Fase 2.2

Estado final: **`PHASE_2_2_CSS_RENDERING_FIXED — REQUIRES_PROEFEX_APPROVAL`**

Commit auditado: `96d88c6`. Diagnóstico ejecutado exactamente desde ese commit (working tree limpio, sin modificaciones hasta identificar la causa raíz).

---

## 1. Reproduction

| Escenario | Resultado |
|---|---|
| `npm run build` + `next start` (`.next` limpio) | ✅ Correcto: CSS 200 `text/css` (40.7 kB, 212 reglas), hidratación OK |
| `npm run dev` **sobre un `.next` generado por `next build`** | ❌ HTML referencia chunks que ya no existen → `page.js` **404** → sin hidratación |
| Dos servidores superpuestos sobre el mismo `.next` (p. ej. un `next dev` en :3001 y otro en :3000 — se encontró un proceso ajeno a esta sesión escuchando en :3001) | ❌ **CSS y JS servidos con `Content-Type: text/plain`** |
| Navegador (Edge headless + verificación manual) contra ese estado corrupto | ❌ `Refused to apply style from '.../layout.css' because its MIME type ('text/plain')...` + cada chunk JS rechazado → **páginas como texto plano**, `font-family: "Times New Roman"`, computed styles por defecto |

El síntoma reportado ("plain text") quedó reproducido byte a byte: hoja de estilos presente en el HTML pero **bloqueada por el navegador**.

## 2. Browser evidence (estado corrupto)

- `document.styleSheets` vacío o con hoja bloqueada; `getComputedStyle(body).fontFamily` → `"Times New Roman"`; footer sin fondo; `.ed-row`/`.mega-row` con estilos por defecto.
- Consola: `Refused to apply style ... ('text/plain')` (bloqueada por `X-Content-Type-Options: nosniff`, correcto y activo en el proyecto) y `Refused to execute script ... ('text/plain')` para todos los chunks → condición **A** (§15 del mandato): DOM con clases, estilos no aplicados → problema de **entrega de CSS**, no de diseño.

## 3. CSS network evidence

| Recurso | Estado corrupto | Estado saneado |
|---|---|---|
| `/_next/static/css/app/layout.css` (dev) | 200 pero `text/plain` → **bloqueada por nosniff** | 200 `text/css; charset=UTF-8` |
| `/_next/static/chunks/*.js` (dev) | `text/plain` o 404 → no ejecutados | 200 `application/javascript` |
| Fuentes `*.woff2` | n/a (sin hidratación no se pedían) | 200 `font/woff2` (5 archivos) |
| `favicon.ico` | 404 | 404 (preexistente, documentado en Fase 2; no relacionado) |

## 4. Generated CSS evidence

- `.next/static/css/c613338caf378baa.css` (producción): **40 714 bytes, 212 reglas**, contiene `.mega-row`, `.drawer-pillar`, `--grow-bg/--grow-accent`, `.site-footer`, `.ed-row`, `.display-xl`, `.container-pfx`. **El CSS nunca dejó de generarse.**
- Dev `layout.css`: 206 reglas con los mismos selectores cuando el servidor está sano.

## 5. Tailwind/PostCSS status

- `tailwindcss@4.1.x` + `@tailwindcss/postcss` vía `postcss.config.mjs` (`@tailwindcss/postcss`), entrada CSS `src/app/globals.css` con `@import "tailwindcss"` y `@theme inline`. **Sin cambios entre commits y funcionando** — el pipeline compila y emite todas las utilidades y tokens. No se reinstaló nada.

## 6. Global CSS status

- `src/app/layout.tsx:3` importa `./globals.css`. Integridad verificada: llaves balanceadas (164/164), ninguna eliminación accidental. El `diff ac8ea87..96d88c6` en CSS es solo la adición de los nuevos patrones (megamenú editorial, drawer, TECH).

## 7. Token status (runtime, tras saneamiento)

| Token | Valor computado |
|---|---|
| `--space-4` | `16px` |
| `--radius-md` | `12px` |
| `--motion-fast` | `240ms` |
| `--accent` (core) | `#f7931e` |
| `--grow-bg` | aplicado: body `rgb(34,39,46)` = `#22272E` en `/grow-up/*` |
| `--grow-accent` | `#00FFE6` (leído y usado en el universo Grow Up) |
| `--text-display-xl` | `clamp(2.6rem, 5.5vw, 4.5rem)` (hero de `/grow-up/marketing-bpo` computa 52px a 1440 y 33.6px a 375) |

## 8. Universe attribute status

| Ruta | `body[data-universe]` | Fondo body |
|---|---|---|
| `/` | `core` | blanco |
| `/tech`, `/tech/desarrollo-de-software` | `tech` | `rgb(0,18,51)` |
| `/grow-up`, `/grow-up/marketing-bpo` | `growup` | `rgb(34,39,46)` |
| `documentElement.dataset.universe` | siempre ausente (por diseño; el scope lo porta body y las secciones) | — |

Nota: con el servidor corrupto, `body` quedaba sin atributo porque el efecto que lo sincroniza vive en el footer, cuyo JS estaba bloqueado. Es un **síntoma**, no la causa.

## 9. Font status

- 5 archivos `woff2` servidos con 200 `font/woff2` (Poppins, Lexend Deca, Source Code Pro + fallbacks). `next/font` self-hosted: sin 404, sin MIME incorrecto. Computed: body `lexend`, headings `poppins`, labels `source code pro`.

## 10. Console errors

**Bloqueo CSS/estilo (causa):**
- `Refused to apply style from '...layout.css' because its MIME type ('text/plain')` — solo con servidor corrupto; desaparece tras el fix.

**No relacionados / preexistentes:**
- `favicon.ico` 404 (conocido desde Fase 2, pendiente Fase 3).
- Warning de hidratación `class="js"` en `<html>`: el script inline del page-reveal (Fase 2, commit `392ad27`) añade la clase antes de que React hidrate. Solo dev, benigno ("This won't be patched up"), preexistente. Registramos mejorar el patrón (suprimir con `suppressHydrationWarning` en `<html>`) como tarea menor futura, no aplicada en este fix quirúrgico.

## 11. Commit comparison (`ac8ea87` vs `96d88c6`)

El diff solo toca `globals.css` (+155/-x: nuevos patrones), `Header.tsx`, `HeroTech.tsx` y docs. No toca `layout.tsx`, PostCSS, Tailwind, providers ni la lógica de universo. **Fase 2.2 NO introdujo una regresión de rendering**: los mismos síntomas se reproducen en `ac8ea87` cuando el servidor está en el estado corrupto (verificado conceptualmente por naturaleza ambiental del fallo; el estado corrupto es independiente del commit).

## 12. Root cause

**Contaminación del directorio `.next` entre modos e instancias**: `next dev` y `next build`/`next start` (y dos servidores simultáneos) comparten `.next` por defecto. Al ejecutar `npm run dev` sobre artefactos de producción (o con otro servidor vivo), Next sirve HTML que referencia chunks inexistentes (404) y, en el estado degradado, responde **todos los assets con `text/plain`**. Como el proyecto envía `X-Content-Type-Options: nosniff`, el navegador **bloquea CSS y JS** → páginas sin estilos ("plain text") y sin hidratación. El código, el design system y el CSS generado estaban íntegros en todo momento.

## 13. Minimal fix

Sin cambios visuales, de dependencias ni de arquitectura (mandato §17):

1. **`next.config.ts`** — aislamiento de artefactos por modo:
   `distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next"`.
   Ahora `next dev` nunca lee/escribe el `.next` de producción, eliminando la única vía de contaminación.
2. **`.gitignore`** — añadir `/.next-dev/`.
3. **Procedimiento** (documentado aquí): un solo servidor a la vez; si se alterna dev/build, no hace falta limpiar nada con el guard; ante cualquier estado raro: detener servidores y eliminar `.next`/`.next-dev`.

## 14. Verification after fix

Ejecutado con `verify-render.js` (Puppeteer/Edge headless, hidratación + computed styles + red + consola):

- **Producción** (`next build` limpio + `next start`, `.next` aislado): 5 rutas × 1440/375 → hoja 200 con 212 reglas aplicadas, `hydrated: true`, universos correctos (core/tech/growup), Grow Up body `#22272E` + acento `#00ffe6` + footer `#1B2027`, TECH body `#001233`, `ed-row` grid, `mega-row` 64px, overflow 0. First Load **103 kB** (≤180 kB). Typecheck OK.
- **Dev con el guard** (`npm run dev` con `.next` de producción presente — el escenario exacto del fallo): 5 rutas × 1440/375 → CSS 200 `text/css` (206 reglas), `hydrated: true`, mismos universos/tokens, overflow 0. Screenshots `fix-home-*.png`, `fix-tech-*.png`, `fix-grow-up-*.png` en 1440 y 375 confirman rendering completo (Grow Up idéntico a Fase 2.1/2.2).
- Consola post-fix: solo favicon 404 y el warning benigno de `class="js"` (ambos preexistentes, ninguno afecta estilos).

---

**Conclusión:** condición A resuelta (entrega de CSS). El diseño no requiere cambios. Estado: `PHASE_2_2_CSS_RENDERING_FIXED — REQUIRES_PROEFEX_APPROVAL`. No se inicia Fase 3.
