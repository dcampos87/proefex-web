# Documento 14 — Design System Inicial

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Estructura

Un único design system con **tres temas de universo** (core, tech, growup) sobre tokens compartidos. Implementado como paquete interno del frontend (`src/design-system`), documentado con Storybook (o similar) para que diseño y desarrollo revisen lo mismo.

```text
tokens (globales + por universo)
  → primitives (Button, Input, Tag, Card shell)
    → components (nav, hero variants, section blocks)
      → blocks (los 19 bloques del CMS — Doc 05)
```

## 2. Tokens de color

```css
:root {
  /* Marca */
  --pfx-blue: #002254;
  --pfx-orange: #F7931E;
  --pfx-red: #D64022;
  --pfx-yellow: #EFB729;
  --pfx-blue-light: #005A9E;
  --pfx-white: #FFFFFF;
  --pfx-gray: #414141;

  /* Semánticos (tema core, default) */
  --bg: var(--pfx-white);
  --bg-sunken: #F4F6F9;
  --surface: #FFFFFF;
  --text: var(--pfx-blue);
  --text-body: var(--pfx-gray);
  --text-inverse: var(--pfx-white);
  --accent: var(--pfx-orange);
  --accent-contrast: var(--pfx-blue);
  --border: rgba(0, 34, 84, 0.12);
}
```

```css
[data-universe='tech'] {
  --bg: #001233;               /* azul profundo casi negro (a validar en diseño) */
  --bg-sunken: #000D22;
  --surface: rgba(255, 255, 255, 0.04);
  --text: #FFFFFF;
  --text-body: rgba(255, 255, 255, 0.72);
  --accent: var(--pfx-orange);
  --border: rgba(255, 255, 255, 0.14);
}

[data-universe='growup'] {
  --bg: #FFFFFF;
  --bg-sunken: #FDF6EC;        /* cálido cálido (a validar) */
  --text: var(--pfx-blue);
  --text-body: var(--pfx-gray);
  --accent: var(--pfx-red);
  --accent-2: var(--pfx-yellow);
}
```

Reglas: los tokens semánticos son la única API para componentes; nunca un hex directo en un componente. Contraste AA validado por token (Doc 16).

## 3. Tipografía

| Token | Valor | Uso |
|---|---|---|
| `font-sans` | Lexend Deca Regular | Base, cuerpo, TECH |
| `font-display` | Poppins | Titulares, Grow Up expresivo |
| `font-mono` | (a definir, ej. JetBrains Mono) | Datos, etiquetas técnicas TECH |

Escala (clamp fluido, mobile → desktop):

| Token | Desktop | Móvil |
|---|---|---|
| display-2xl | clamp(3.5rem → 8.75rem) | Hero creativo Grow Up |
| display-xl | clamp(2.75rem → 4.5rem) | Heroes |
| display-lg | clamp(2.25rem → 3.25rem) | Titulares de sección |
| heading | clamp(1.5rem → 2rem) | Subtítulos |
| body-lg | 1.125rem | Intro |
| body | 1rem | Cuerpo |
| caption | 0.875rem | Apoyos |
| label-mono | 0.8125rem uppercase tracking | Etiquetas TECH |

Line-height: 1.1 títulos, 1.6 cuerpo. Máx. 65–75 caracteres por línea.

## 4. Espaciado, grilla y radios

- Escala espacial: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160.
- Contenedor: max-width 1280px (landing) / 1440px (secciones anchas), gutter fluido.
- Secciones: padding vertical 96–160px desktop, 64–96px móvil.
- Radios: `sm 6px · md 12px · lg 20px · full`; TECH tiende a esquinas rectas con marcas de encuadre.
- Sombras: minimalistas (y-negativa); TECH usa bordes 1px en lugar de sombra.

## 5. Componentes primitivos

Button (primary/secondary/ghost, por universo), Link, Tag/Chip, Input/Select/Textarea, Checkbox/Radio, Accordion, Tabs, Modal/Sheet (accesibles), Tooltip, Badge, Skeleton, Breadcrumbs, Pagination.

Reglas: todos con estados hover/focus-visible/active/disabled, focus ring de 2px con offset, y navegación por teclado garantizada.

## 6. Componentes estructurales

- Header (3 variantes por universo + megamenú TECH + menú móvil).
- Footer global.
- Section shell (spacing, theme, background, animation — hereda props de bloque).
- UniverseProvider: aplica `data-universe` y transiciones de tema.

## 7. Bloques CMS → componentes

Los 19 bloques del Documento 05 se implementan como componentes React deterministas que consumen las props validadas. Cada bloque: `schema.ts` (Zod, compartido con CMS) + `Component.tsx` + variantes por universo + `stories` documentadas.

## 8. Iconografía e ilustración

- Set de iconos de línea propio (24px, stroke 1.75, esquinas redondeadas), exportado como sprite/inline.
- Ilustraciones por universo (Doc 09 §6) versionadas en el paquete de diseño.

## 9. Gobernanza del design system

- Cambios de token requieren PR con impacto visual documentado (screenshots).
- El paquete `@proefex/blocks-schema` es la única dependencia compartida con el CMS (Doc 06).
- Checklist de accesibilidad y performance por componente nuevo (Docs 15–16).
