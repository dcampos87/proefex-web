# Documento 10 — Dirección Visual PROEFEX TECH

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Premisa

PROEFEX TECH debe verse como **un producto tecnológico vivo**, no como la página de servicios de una consultora. El visitante debe percibir capacidad de construir sistemas: interfaces, datos, automatización, ingeniería de campo.

> Sensación objetivo: *"estas personas construyen y operan sistemas reales".*

## 2. Sistema visual TECH

### 2.1 Color

| Uso | Color | Notas |
|---|---|---|
| Fondo base | Azul profundo #002254 → variante casi negra (mezcla #001233 aprox.) | Superficies en capas: base / panel / elevado |
| Acento primario | Naranja #F7931E | CTAs, señales de interacción, líneas de datos activos |
| Texto | #FFFFFF y #414141 (sobre claro); blanco 80–60% para secundarios en oscuro | Verificar contraste AA (Doc 16) |
| Secundarios de soporte | #005A9E (capas, gráficos), #EFB729 / #D64022 (señal en visualizaciones) | Paleta de datos para charts y estados |
| Cuidado | Nunca naranja grande de fondo; es *señal*, no superficie | |

### 2.2 Tipografía

- **Lexend Deca Regular** para títulos y cuerpo (técnica, alta legibilidad).
- Fuente mono (ej. JetBrains Mono o similar, a definir) para: datos, métricas, fragmentos de código, etiquetas de sistema (`01 / DESARROLLO`, `v2.0`).
- Escala: titulares grandes pero contenidos (48–72px desktop); jerarquía clara con etiquetas mono uppercase pequeñas como prefijos de sección.

### 2.3 Composición

- **Grid tecnológico visible con sutileza:** retícula de fondo al 3–6% de opacidad, líneas que animan ligeramente en scroll.
- **Módulos de sistema:** las cards se comportan como paneles de instrumentación (bordes de 1px, esquinas con marcas de encuadre, estados hover que "encienden" el módulo).
- **Espacio negativo generoso**; la densidad se concentra en los elementos de datos.
- Numeración de secciones estilo especificación técnica (`01 —, 02 —`).

### 2.4 Gráfica y elementos generativos

| Elemento | Uso con criterio | Prohibido |
|---|---|---|
| Partículas | Fondo de hero: campo sutil de nodos conectados (red), pausa fuera de viewport, ≤ 60 partículas | Lluvias de puntos sin sentido |
| Visualización de datos | Charts abstractos con datos ilustrativos claramente no ficticios de negocio (ej. formas de onda, topología) | Charts con cifras que parezcan métricas reales de clientes |
| 3D | 1–2 piezas hero (ej. drone low-poly en wireframe, isométrico de infraestructura) con rotación por scroll; lazy-loaded | Escenas 3D pesadas en móvil |
| Código | Fragmentos reales del stack (Next.js, SQL, Python para IA) como textura en fondos y transiciones | Código falso illegible |
| Grids y blueprint | Diagramas tipo blueprint para ingeniería (geodesia, IoT) | — |

### 2.5 Fotografía y video

Cinematográfico: bajo key, acentos naranja/azul, profundidad de campo. Temas: drones topográficos en operación, salas técnicas, pantallas con dashboards reales del propio stack, manos ensamblando/configurando. Video de fondo solo en el hero del área TECH, con poster estático y desactivación en móvil/reduced-motion.

## 3. Interacciones TECH

- **Revelado de sistema:** las secciones se revelan como arranque de sistema (líneas que trazan, módulos que encienden en secuencia).
- **Hover de panel:** elevación sutil + borde naranja + micro-datos que aparecen (sin animar texto largo).
- **Scroll:** parallax leve en capas de fondo; elementos de datos con conteo animado (solo cifras reales provistas).
- **Cursor:** cursor estándar; opcional cursor-estado en zonas interactivas del hero (siempre accesible por teclado).

## 4. Aplicaciones por página

| Página | Momento visual clave |
|---|---|
| `/tech` (landing área) | Hero inmersivo con campo de red + demostración de capacidades en módulos de sistema |
| Servicios de desarrollo | Split con fragmentos de stack + diagrama de proceso |
| IA y automatización | Visualización de flujo animado (input → modelo → acción) |
| Ingeniería/drones | Blueprints + fotografía de campo |
| Infraestructura/Cloud | Isométrico de infraestructura + specs en mono |

## 5. Restricciones de performance (no negociables)

- Canvas/partículas: pausadas fuera de viewport y en `document.hidden`; desactivadas con `prefers-reduced-motion`.
- 3D: solo si el presupuesto de JS lo permite (Doc 16); alternativa: render estático con parallax.
- Video hero: poster primero, carga diferida, sin autoplay en móvil.
- Toda animación GPU-friendly (transform/opacity).

## 6. Entregables de diseño requeridos antes de F1

1. Moodboard + 2 direcciones de estilo TECH para elección.
2. Key visual del hero.
3. Especificación de componentes TECH (hero, panel, data-module, blueprint).
4. Shotlist fotográfico/video TECH.
