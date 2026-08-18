Como tu CTO, he analizado la visión del proyecto. La elección de una arquitectura serverless con Cloudflare Pages y Supabase es excelente para garantizar baja latencia, escalabilidad y reducción de costos operativos. Sin embargo, la combinación de un LMS/CMS con animaciones pesadas (GSAP/Three.js) requiere una planificación rigurosa para no comprometer el performance y el LCP (Largest Contentful Paint).

A continuación, presento el Documento de Especificaciones Técnicas (Tech Spec) detallado para que el equipo inicie el desarrollo de inmediato.

# Especificaciones Técnicas: Plataforma Web Corporativa (CMS + LMS)

## 1. Stack Tecnológico Principal

- **Frontend Framework:** Next.js (App Router). Se configurará para aprovechar el _Edge Runtime_ o en su defecto _Static Site Generation (SSG)_ compatible con Cloudflare Pages.
- **Lenguaje:** TypeScript (Strict Mode).
- **Estilos:** Tailwind CSS (para estructura y UI base).
- **Motor de Animaciones:**
  - **GSAP:** Para animaciones complejas basadas en scroll (ScrollTrigger) y secuencias en el landing page.
  - **Framer Motion:** Para transiciones de micro-interacciones, page-transitions y layouts dinámicos.
  - _(Opcional/Aislado)_ **Three.js / React Three Fiber:** Solo si hay elementos 3D específicos. Cargar de forma perezosa (lazy load) para no bloquear el hilo principal.
- **Backend, Base de Datos y Auth:** Supabase (PostgreSQL).
  - _Auth:_ Supabase Auth (Magic Links, OAuth, Email/Password).
  - _Storage:_ Supabase Storage para manejo de recursos multimedia y videos de los cursos.
- **Despliegue y CDN:** Cloudflare Pages.
- **Gestión de Estado:** Zustand (para estado global ligero, como progreso del LMS y sesión del carrito/usuario) + React Query (para fetching y caché de datos de Supabase).

## 2. Reglas de Código y Estilo

- **Nomenclatura:**
  - Componentes y Archivos TSX: `PascalCase` (ej. `CourseCard.tsx`).
  - Variables, utilidades y hooks: `camelCase` (ej. `useUserSession.ts`, `fetchCourses`).
  - Base de datos (Supabase): `snake_case` para tablas y columnas (ej. `user_profiles`, `course_id`).
- **Linting y Formateo:**
  - Uso estricto de ESLint y Prettier. El pipeline fallará si hay advertencias de linting.
  - Husky + lint-staged para ejecutar `eslint --fix` antes de cada commit.
- **Buenas Prácticas:**
  - **Zero 'any':** Prohibido el uso de `any` en TypeScript. Usar interfaces o tipos genéricos.
  - **Separación de responsabilidades:** Los componentes de UI (presentacionales) no deben contener lógica de fetching directo a Supabase.
  - **Animaciones:** Las animaciones pesadas de GSAP deben ir envueltas en `useLayoutEffect` (o custom hooks como `useGSAP`) y deben limpiarse (`revert()`) al desmontar el componente para evitar memory leaks.

## 3. Arquitectura de Carpetas

Adoptaremos una arquitectura basada en **Feature-Driven Development** (Módulos por funcionalidad) dentro del ecosistema de Next.js.

```text
src/
├── app/                  # Rutas de Next.js (App Router: /, /blog, /cursos, /admin)
├── components/           # Componentes UI globales y reutilizables
│   ├── ui/               # Botones, modales, inputs (Tailwind)
│   ├── animations/       # Wrappers de GSAP y Framer Motion
│   └── layouts/          # Header, Footer, Sidebars
├── features/             # Lógica agrupada por dominio del negocio
│   ├── admin/            # Dashboard de administración CMS
│   ├── lms/              # Reproductor de cursos, tracking de progreso
│   ├── blog/             # Renderizado y gestión de artículos
│   └── auth/             # Formularios de login, registro, perfiles
├── lib/                  # Configuraciones de terceros
│   └── supabase/         # Clientes de Supabase (browser y server)
├── hooks/                # Custom hooks globales
├── store/                # Store global (Zustand)
├── types/                # Interfaces TypeScript globales y generadas por Supabase
└── utils/                # Funciones puras de ayuda (formateo de fechas, etc.)

## 4. Gestión de Errores y Logs

Implementaremos una estrategia de observabilidad integral y recuperación rápida para garantizar que ni las animaciones pesadas ni los fallos de red degraden la experiencia del usuario.

| Capa | Herramienta / Estrategia | Descripción de Implementación |
| :--- | :--- | :--- |
| **Frontend UI** | Next.js Error Boundaries (`error.tsx`) | Aislamiento de errores por segmento. Muestra una UI de *fallback* amigable sin romper el layout global ni bloquear los contextos de GSAP/Three.js activos. |
| **Peticiones HTTP** | React Query / Axios Interceptors | Manejo global de códigos 4xx y 5xx. Configuración de reintentos automáticos (Retries) con *exponential backoff* para fallos de red esporádicos al consumir Supabase. |
| **Monitoreo APM** | Sentry (Browser & Edge) | Captura de excepciones no controladas en tiempo real. Configurado para monitorear Core Web Vitals y caídas de *framerate* provocadas por animaciones complejas. |
| **Base de Datos** | PostgreSQL Triggers / Supabase Logs | Auditoría automatizada de operaciones críticas (ej. cambios de roles, publicación en CMS) utilizando *triggers* nativos para trazar el ciclo de vida del dato. |

## 5. Pruebas y Calidad

Para asegurar la estabilidad del LMS y el CMS a medida que el proyecto escala, el pipeline exigirá el pase de las siguientes pruebas:

| Tipo de Prueba | Herramienta | Alcance y Objetivo |
| :--- | :--- | :--- |
| **Unitarias** | Vitest + React Testing Library | Validación de lógica de negocio aislada (cálculos de progreso del LMS, validación de formularios, *parsers*). **Cobertura mínima exigida: 80%**. |
| **Integración** | React Testing Library | Interacción entre los componentes de la UI y el estado global (Zustand) o caché (React Query). Ej: Flujo de enrolamiento en un curso. |
| **End-to-End (E2E)** | Playwright | Simulación de flujos críticos de usuario en entornos reales: Login, compra de curso, reproducción de video y publicación de post en el CMS. |
| **Performance** | Lighthouse CI / Vercel Analytics | Auditorías automatizadas en cada Pull Request. **Regla estricta:** Las implementaciones con GSAP o Three.js no deben disminuir el score de *Performance* por debajo de 90. |

## 6. Flujo de Trabajo (Workflow)

Adoptaremos un **GitHub Flow adaptado** y automatizado mediante GitHub Actions para integrarnos a la perfección con Cloudflare Pages.

*   **Estrategia de Ramas:**
    *   `main`: Producción (Despliegue estable en Cloudflare Pages).
    *   `develop`: Entorno de Staging y pruebas de QA.
    *   Ramas efímeras: `feat/nombre-feature`, `fix/descripcion-bug`, `chore/mantenimiento`.
*   **Pipeline CI/CD (GitHub Actions):**
    1.  **PR hacia `develop`:** Dispara el CI. Ejecuta el linter, validación de tipos estricta (TypeScript) y pruebas unitarias (Vitest). Genera automáticamente un *Preview Deployment* en Cloudflare Pages.
    2.  **Merge a `develop`:** Despliegue automático a la URL de Staging.
    3.  **PR hacia `main`:** Ejecuta la suite pesada de pruebas E2E (Playwright) contra el entorno de Staging.
    4.  **Merge a `main`:** Genera un *tag* semántico de release y despliega a Producción.
*   **Revisiones de Código:** Todo PR requiere al menos la aprobación de 1 Code Reviewer. Los *commits* deben seguir el estándar de *Conventional Commits*.

## 7. Reglas de Negocio (Core Técnico)

1.  **Seguridad a Nivel de Fila (RLS) en Supabase:** Es la barrera arquitectónica principal.
    *   **LMS:** Los metadatos de los cursos son públicos, pero los recursos en Supabase Storage (videos, PDFs) están en *buckets* privados. El cliente debe solicitar URLs firmadas (*Signed URLs*) que el servidor solo generará si `auth.uid()` existe en la tabla de `enrollments` para dicho curso.
    *   **CMS:** Las operaciones de mutación (INSERT, UPDATE, DELETE) en tablas como `blog`, `services`, `team` o `courses` estarán restringidas estrictamente a usuarios que posean el *claim* o rol de `admin` validado a través de JWT.
2.  **Tracking de Progreso (LMS):** El reproductor de video emitirá eventos periódicos (*heartbeats*) y un evento de finalización. Estos actualizarán el estado local (Zustand/localStorage) y sincronizarán asíncronamente con la base de datos para no saturar la red, garantizando que el usuario pueda retomar el curso exactamente donde lo dejó.
3.  **Accesibilidad y Degradación Elegante (Animaciones):** Se implementará un *hook* global (`useReducedMotion`). Si el sistema operativo del usuario tiene configurado `prefers-reduced-motion`, el framework desactivará las animaciones de GSAP, Framer Motion y Three.js, ofreciendo un renderizado estático inmediato para proteger la usabilidad.
4.  **Generación de Contenido Híbrido (SEO vs Dinamismo):** Las páginas públicas orientadas al SEO (Blog, Servicios) consumirán datos utilizando ISR (Incremental Static Regeneration) o revalidación bajo demanda. Cada vez que un `admin` publique en el CMS, Supabase disparará un *webhook* hacia Next.js para purgar y regenerar la caché de esas rutas específicas en Cloudflare.
```
