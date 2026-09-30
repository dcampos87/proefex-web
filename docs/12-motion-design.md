# Documento 12 — Sistema de Motion Design

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Principios

El motion es parte de la arquitectura UX, no decoración posterior. Toda animación debe cumplir al menos una función:

| Función | Significado | Ejemplos |
|---|---|---|
| **Comunicar** | Explicar qué hace algo | Demostración de flujo IA, diagramas que se trazan |
| **Orientar** | Decir dónde estoy y a dónde voy | Transición de universo al entrar a TECH/Grow Up, indicador de sección activa |
| **Enfatizar** | Dirigir la atención al elemento clave | Entrada del titular, señal del CTA |
| **Explicar** | Mostrar causa-efecto o proceso | Steps de Process, timeline |
| **Generar continuidad** | Conectar estados y páginas | Transiciones de página, hover que anticipa navegación |
| **Reforzar identidad** | Hacer reconocible el universo visual | Firma de motion TECH (sistema que enciende) vs Grow Up (elástico editorial) |

**Reglas duras:**
1. Nada se mueve sin función. Si no puede justificarse con la tabla anterior, se elimina.
2. Máximo **una animación protagonista por viewport**; el resto es apoyo sutil.
3. Toda animación es interrumpible y respeta `prefers-reduced-motion` (ver §8).
4. Solo propiedades GPU-friendly: `transform` y `opacity`. Animar layout (`top/left/width/height`) prohibido.
5. Presupuesto de performance por encima de cualquier efecto (Doc 16).

## 2. Tokens de motion

```ts
const motionTokens = {
  duration: {
    instant: 120,   // feedback de microinteracción
    fast: 240,      // hovers, fades de UI
    base: 400,      // entradas de elementos
    slow: 700,      // revelados de sección
    epic: 1100,     // momentos firma (máx. 1 por página)
  },
  easing: {
    out:     'cubic-bezier(0.22, 1, 0.36, 1)',   // entradas estándar
    inOut:   'cubic-bezier(0.65, 0, 0.35, 1)',   // transiciones de estado
    spring:  { stiffness: 120, damping: 18 },    // universo Grow Up
    tech:    'cubic-bezier(0.4, 0, 0.2, 1)',     // universo TECH (preciso)
  },
  stagger: { tight: 40, base: 70, loose: 110 }, // ms entre elementos
};
```

## 3. Inventario de animaciones por tipo

### 3.1 Entrada (page load)
- Hero: titular por líneas (clip-path/translateY, stagger 70ms) → subtítulo → CTA (fade+rise).
- Elementos críticos (CTA, navegación) nunca retrasados más de 600ms; el contenido principal es visible sin JS.
- Skeleton states en listas dinámicas.

### 3.2 Scroll animations
- **Reveal de sección:** fade+rise 24px (una vez, no reversible al subir).
- **Parallax con sentido:** solo capas de fondo (factor 0.1–0.2); nunca texto crítico.
- **Contadores:** cifras de StatsSection animadas al entrar en viewport (solo datos reales).
- **Draw on scroll:** líneas/diagramas que se trazan (TECH), formas que morphean (Grow Up).
- Scroll progress discreto en landings largas de área.

### 3.3 Microinteracciones
- Hover de card: elevación 4px + borde de acento (TECH) / tilt sutil (Grow Up), 240ms.
- Botones: estado hover/active/focus visibles siempre; iconos que desplazan 4px.
- Links de navegación: subrayado animado desde la izquierda.
- Formularios: labels flotantes, validación con shake sutil solo en error, éxito con check animado.

### 3.4 Transiciones de sección
- Fondos que cambian de tema con un wash de gradiente (transición Core→TECH→Grow Up en home).
- Secciones con anclas suaves (scroll-behavior + compensación de header).

### 3.5 Transiciones de página
- View Transitions API (con fallback): fade corto 240ms + persistencia de navegación.
- Al navegar a áreas: transición de tema definida por universo (firma TECH: línea de datos que barre; firma Grow Up: forma orgánica que revela).
- Nunca bloquear la navegación: la animación es salida del contenido nuevo, no entrada obligatoria.

### 3.6 Texto
- Revelado por líneas/palabras en titulares (split con máscara), solo en titulares ≤ 12 palabras.
- Marquee (Grow Up) a velocidad legible, pausable al hover/focus.

### 3.7 Imágenes y video
- Imágenes: fade + escala 1.04→1 al entrar; blur-up desde placeholder.
- Video: play/pausa con transición; poster obligatorio; controles nativos accesibles.

### 3.8 Navegación e indicadores
- Header: encoge al scroll (64→56px), fondo que gana blur/borde.
- Indicador de universo activo en navegación (punto/acento).
- Menú móvil: overlay con stagger de ítems, cierre con focus trap.

### 3.9 Loading states
- Skeletons que replican la forma del contenido (evitan CLS).
- Sin spinners decorativos; skeletons + mensajes concretos.

## 4. Herramientas

| Necesidad | Herramienta |
|---|---|
| Animación declarativa UI | Motion (Framer Motion) — entradas, microinteracciones, layout |
| Secuencias scroll complejas | GSAP + ScrollTrigger (usado con criterio, tree-shaken) |
| Assets de diseño (Lottie) | lottie-react con autoplay off-screen disabled |
| View Transitions | API nativa + fallback CSS |
| 3D (si se aprueba) | React Three Fiber, lazy, solo hero TECH |

Presupuesto de librerías de animación: ≤ 45KB gzip combinadas en el bundle inicial.

## 5. Firma de motion por universo

| | CORE | TECH | GROW UP |
|---|---|---|---|
| Easing | `out` estándar | `tech` preciso | `spring` elástico |
| Firma | Aparición limpia y ordenada | Módulos que "encienden" en secuencia; líneas que se trazan | Elastilidad editorial; texto cinético; formas vivas |
| Stagger | base | tight | loose |

## 6. Gobernanza

- Toda animación nueva se registra en este inventario con su función justificada.
- Review de motion: revisar en dispositivos de gama media (throttled) antes de aprobar.
- Métrica: INP y CLS no pueden degradarse por una animación (Doc 16).

## 7. `prefers-reduced-motion` — implementación obligatoria

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Además, por JS (matchMedia): partículas, parallax, marquees, contadores y fondos de video se **desactivan**; los revelados se sustituyen por aparición estática. El contenido nunca depende de una animación para ser legible.

## 8. Checklist de aprobación de una animación

1. ¿Tiene función (tabla §1)? 2. ¿Es interrumpible? 3. ¿Respeta reduced-motion? 4. ¿Es GPU-friendly? 5. ¿Pasa presupuestos CWV en móvil gama media? 6. ¿Tiene fallback sin JS?
