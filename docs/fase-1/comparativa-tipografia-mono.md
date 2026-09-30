# Comparativa de tipografía mono — D11 (Fase 1)

**Estado:** `REQUIRES_PROEFEX_INPUT` — decisión de PROEFEX tras revisar muestras.
**Uso restringido aprobado:** etiquetas, metadatos, datos técnicos, pequeños elementos UI. **No** para titulares ni texto corrido. La identidad TECH no debe volverse estética puramente "developer".

## Candidatas

| Criterio | JetBrains Mono | IBM Plex Mono | Source Code Pro |
|---|---|---|---|
| Licencia | SIL OFL 1.1 (gratis, uso web libre) | SIL OFL 1.1 | SIL OFL 1.1 |
| Diseño | Alta x-height, formas claras, ligaduras opcionales | Carácter "IBM" humanista, ligero toque editorial | Clásica Adobe, muy neutra y legible |
| Legibilidad en tamaños pequeños | Excelente | Muy buena | Muy buena |
| Personalidad | Técnica moderna | Técnica con calidez editorial | Neutra, discreta |
| Peso variable | Sí | Sí | Sí |
| Subsetting latino | Sí | Sí | Sí |
| Afinidad con Lexend Deca | Muy alta (geométrica, contemporánea) | Alta (humanista) | Media (más tradicional) |
| Riesgo | Puede sentirse "de developer" en uso abundante | Menor riesgo de estética dev | Puede sentirse genérica |

## Recomendación preliminar del Agent Master

1. **JetBrains Mono** — mejor afinidad con la familia principal (Lexend Deca) y máxima legibilidad en etiquetas pequeñas; con uso restringido el riesgo "developer" queda controlado.
2. **IBM Plex Mono** — alternativa sólida si la revisión humana percibe JetBrains demasiado "código".
3. **Source Code Pro** — opción de respaldo neutra.

## Muestras (pendientes)

Las muestras visuales se presentarán dentro del sistema TECH (etiquetas `01 / DESARROLLO`, datos de specs, meta-labels) cuando estén disponibles las herramientas de producción visual (`PROEFEX_INPUT_REQUIRED`). En el código, el token `--font-mono` ya declara las tres como pila de fallback (`src/app/globals.css`), por lo que la elección solo cambia una variable.

## Decisión

- [ ] Aprobada: ______ (marca de PROEFEX)
- Nota: la elección es de bajo impacto técnico y reversible vía token.
