# Documento 04 — Arquitectura de URLs

**Fase:** 0 — Definición
**Estado:** Propuesta para revisión

---

## 1. Dominios y subdominios

| Host | Aplicación | Propósito |
|---|---|---|
| `proefexperu.com` | Redirect 301 → `www.proefexperu.com` | Canonical en www |
| `www.proefexperu.com` | proefex-web | Sitio público |
| `admin.proefexperu.com` | proefex-cms | Panel de administración (no indexable) |
| `api.proefexperu.com` | proefex-api | API de negocio y contenido (no indexable) |
| `learn.proefexperu.com` | LMS futuro | Reservado, sin DNS activo hasta fase LMS |

### Modificaciones propuestas a la arquitectura original

1. **Añadir `staging.proefexperu.com`** (o `*.pages.dev` de Cloudflare con dominio custom) para entorno de pruebas: necesario para validar migraciones, SEO y performance antes de producción.
2. **`noindex` estricto en `admin.` y `api.`**: header `X-Robots-Tag: noindex`, `robots.txt` que los excluya, y firewall básico (Cloudflare Access opcional para admin).
3. **`learn.proefexperu.com` se reserva conceptualmente** pero no se publica hasta que exista la app LMS; evita una URL vacía indexada.
4. **Assets:** los media se sirven desde Supabase Storage a través de transform/CDN de Cloudflare con URLs canónicas bajo `www.proefexperu.com/cdn-cgi/...` o un subdominio de assets si se requiere; mantener un solo esquema documentado.

## 2. Convenciones de URLs

- Idioma: español (minúsculas, sin tildes ni eñes en slugs).
- Separador: guion medio (`-`), sin guiones bajos.
- Sin extensión de archivo; sin trailing slash (Next.js `trailingSlash: false`, con redirect).
- Máximo 3 niveles de profundidad bajo dominio.
- Slugs estables: el CMS permite cambiar el slug generando **redirect 301 automático** del anterior.

## 3. Patrones de URL

| Tipo | Patrón | Ejemplo |
|---|---|---|
| Área TECH | `/tech` | `/tech` |
| Categoría de servicio | `/tech/[categoria]` | `/tech/desarrollo-a-medida` |
| Servicio | `/tech/[categoria]/[servicio]` | `/tech/desarrollo-a-medida/web-software` |
| Área Grow Up | `/grow-up` | `/grow-up` |
| Servicio Grow Up | `/grow-up/[servicio]` | `/grow-up/growth-marketing` |
| Productos | `/productos/[slug]` | `/productos/pizarras-interactivas` |
| SaaS | `/saas/[producto]` | `/saas/turu-crm` |
| Sectores | `/sectores/[sector]` | `/sectores/mineria` |
| Casos | `/casos/[slug]` | `/casos/[slug]` |
| Blog listado | `/insights` | `/insights` |
| Blog categoría | `/insights/[categoria]` | `/insights/inteligencia-artificial` |
| Post | `/insights/[categoria]/[slug]` | `/insights/inteligencia-artificial/ia-para-pymes` |
| Institucional | `/nosotros`, `/contacto` | — |
| Legales | `/legal/[slug]` | `/legal/privacidad` |

**Nota blog:** la categoría en la URL (`/insights/[categoria]/[slug]`) beneficia el SEO pero genera redirects al recategorizar. Alternativa: `/insights/[slug]` plano con categoría como metadato. *Decisión a validar en Documento 19.*

## 4. URLs administrativas y de API

| Patrón | Ámbito |
|---|---|
| `api.proefexperu.com/v1/...` | Versionado desde el día uno (`/v1`) |
| `api.proefexperu.com/v1/content/...` | Lectura de contenido (web frontend) |
| `api.proefexperu.com/v1/leads` | Captura de formularios |
| `api.proefexperu.com/v1/webhooks/...` | Eventos CMS → web |
| `admin.proefexperu.com/...` | Rutas del panel (auth obligatoria) |

## 5. SEO en URLs

- **Canonical absoluto** en cada página (`https://www.proefexperu.com/...`).
- Una sola URL por contenido; filtros y ordenación con parámetros `?` no indexables (rel=canonical a la URL limpia).
- Redirects gestionados en CMS (tabla `redirects`) y desplegados como reglas en Cloudflare; nunca cadenas de redirects.
- 404 personalizada por universo visual con navegación de recuperación.
- Paginación con `?page=n` + canonical a la primera página y `prev/next` semántico si aplica.

## 6. Preparación para i18n futuro (sin implementar hoy)

- Si se aprueba multi-idioma, el patrón será prefijo por locale: `www.proefexperu.com/en/...` con español en raíz (evita migrar URLs existentes).
- `hreflang` se implementaría en esa fase; el modelo de contenidos ya contempla traducciones por campo (Documento 05).
