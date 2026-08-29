# PROEFEX Web Platform

Monorepo con tres aplicaciones Next.js independientes que comparten componentes, tipos y datos a través del paquete `@proefex/shared`.

## Estructura

```
proefex-web/
├── apps/
│   ├── site/          # Sitio público (landing, blog, servicios, cursos)
│   ├── learn/         # Plataforma LMS (dashboard, cursos, certificados)
│   └── admin/         # Panel de administración (gestión de contenido)
└── packages/
    └── shared/        # Componentes, tipos, datos y utilidades compartidas
```

## Apps

### Site (`@proefex/site`)

Sitio público con landing page, blog, servicios, cursos y contacto. Optimizado para SEO con SSG.

```bash
npm run dev              # http://localhost:3000
npm run build            # Build estático
```

### Learn (`@proefex/learn`)

Plataforma LMS para estudiantes: dashboard de cursos, reproductor de video, progreso y certificados.

```bash
npm run dev:learn        # http://localhost:3001
npm run build:learn
```

### Admin (`@proefex/admin`)

Panel de administración para gestionar cursos, blog, usuarios y recursos multimedia.

```bash
npm run dev:admin        # http://localhost:3002
npm run build:admin
```

## Package compartido

`@proefex/shared` contiene:

- **Componentes UI**: Button, Field, MetricCard, ProgressBar, ModuleList
- **Layouts**: AppShell, SiteShell, Header, Footer, BrandMark
- **Animaciones**: WaveBackground
- **Hooks**: useReducedMotion
- **Datos**: landing, platform
- **Tipos**: landing
- **Config**: appLinks (enlaces entre dominios)

## Variables de entorno

Para enlaces entre dominios en producción:

```bash
# En cada app
NEXT_PUBLIC_SITE_URL=https://proefexperu.com
NEXT_PUBLIC_LEARN_URL=https://learn.proefexperu.com
NEXT_PUBLIC_ADMIN_URL=https://admin.proefexperu.com
```

## Scripts globales

```bash
npm run build:all        # Build de todas las apps
npm run typecheck        # Typecheck de todas las apps
npm run lint             # ESLint de todo el monorepo
npm run test             # Tests de site
npm run test:e2e         # Tests E2E con Playwright
```

## Stack tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS 4
- **Animaciones**: GSAP, Framer Motion
- **Testing**: Vitest, Playwright
- **Linting**: ESLint, Prettier, Husky
- **Despliegue**: Cloudflare Pages (SSG)

## Despliegue

Proyecto en Cloudflare Pages: `proefex-web` (integración Git con este repositorio).

| Entorno        | Rama      | URL                                                                |
| :------------- | :-------- | :----------------------------------------------------------------- |
| **Producción** | `main`    | **https://proefexperu.com** (alias: https://proefex-web.pages.dev) |
| Staging        | `develop` | https://develop.proefex-web.pages.dev                              |

- **Dominio de producción del sitio público: `proefexperu.com`.**
- Solo la app `site` está desplegada actualmente. Los proyectos `admin` y `learn` existen en Cloudflare pero aún no tienen despliegues; cuando se desplieguen, cada uno debe apuntar a su subdirectorio (`apps/admin/out`, `apps/learn/out`).
- Google Tag Manager (`GTM-PH6SHS9X`) está instalado en el sitio: snippet inline en el `<head>` de `apps/site/src/app/layout.tsx` (debe mantenerse como `<script>` plano, no `next/script`, o Google no lo detecta).

## Arquitectura

- **Monorepo**: npm workspaces
- **Dependencias compartidas**: `@proefex/shared`
- **Build independiente**: Cada app se despliega por separado
- **Supabase**: Backend compartido (auth, database, storage)
- **RLS**: Row Level Security para aislamiento de datos

## Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev              # Site
npm run dev:learn        # Learn
npm run dev:admin        # Admin

# Verificación
npm run typecheck
npm run lint
npm run test
```

## Convenciones

- **Nomenclatura**: PascalCase (componentes), camelCase (hooks/utils), snake_case (DB)
- **Zero `any`**: TypeScript strict, sin tipos `any`
- **Separación de responsabilidades**: UI sin lógica de fetching directo
- **Animaciones**: Cleanup con `revert()` en `useEffect`
- **Accesibilidad**: `useReducedMotion` para respetar preferencias del usuario
