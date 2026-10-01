# 12+ Años de Experiencia — Fase 2.3

Los **más de 12 años** de PROEFEX se integran como elemento narrativo central de la Home (Acto 02), no como card convencional (mandato §5).

## Composición (Acto 02 — EXPERIENCIA)

1. **Cifra protagonista**: `12+` en escala tipográfica dominante (`.years-figure`, `clamp(6rem, 15vw, 15rem)`) con reveal al scroll (IntersectionObserver, D19 — sin librerías).
2. **Declaración**: "Más de 12 años integrando tecnología, ingeniería y creatividad para la transformación de las organizaciones." *(texto provisional hasta validar contenido comercial — D12: dirección conceptual aprobada, copy final pendiente).*
3. **Línea temporal `2012 → 2026`**: evolución del ecosistema como recorrido visual (números + años, no cards).
4. Los **hitos del timeline están en `CONTENT_REQUIRED`**: no se inventan fechas de fundación, clientes, proyectos ni logros (mandato §5, §30). El año 2012 es derivado de "12+ años" y queda marcado como provisional.

## Integración narrativa

- La cifra funciona como **proof point** de apertura del recorrido (Acto 02, tras el hero audiovisual) y prepara los Actos 04–07 (capacidad, industrias, proyectos, productos).
- Relación con scroll: reveal secuencial cifra → texto → timeline; `prefers-reduced-motion` muestra el bloque estático.
- En tema dark el bloque consume tokens globales; en universos TECH/Grow Up heredaría su identidad (la pieza vive en Home/universo core).

## Verificación

- QA: presencia del Acto 12+ en Home (light y dark) — PASS.
- Sin datos ficticios: hitos marcados `CONTENT_REQUIRED`.
