-- PROEFEX — Migración inicial de esquema (Fase 1)
-- Aplicar SOLO al proyecto Supabase correspondiente (staging primero, A8).
-- Requiere: PROEFEX_INPUT_REQUIRED (proyecto Supabase y credenciales de entorno).

-- ============================================================
-- 1. Enums
-- ============================================================
create type cms_role as enum ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR', 'SEO_MANAGER');
create type universe as enum ('core', 'tech', 'growup');
create type content_status as enum ('draft', 'in_review', 'scheduled', 'published');
create type brand_line as enum ('tech', 'growup');
create type media_type as enum ('image', 'video', 'svg', 'lottie', 'gif', 'embed');

-- ============================================================
-- 2. Usuarios CMS y RBAC (D14 aprobado)
-- ============================================================
create table cms_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role cms_role not null default 'AUTHOR',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 3. Media (Doc 13)
-- ============================================================
create table media (
  id uuid primary key default gen_random_uuid(),
  type media_type not null,
  storage_path text not null,
  alt_text text not null,               -- obligatorio (accesibilidad)
  caption text,
  width int,
  height int,
  duration_ms int,
  focal_point jsonb,
  credit text,
  license_note text,                    -- LICENSE_REQUIRED se controla aquí
  uploaded_by uuid references cms_users(id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- 4. Páginas (composición por bloques, Doc 05)
-- ============================================================
create table pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  universe universe not null default 'core',
  seo jsonb not null default '{}',      -- title, description, ogImage, canonicalOverride, noindex
  blocks jsonb not null default '[]',   -- validado por @proefex/blocks-schema en la capa de aplicación
  status content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references cms_users(id),
  updated_by uuid references cms_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 5. Blog (D3 aprobado: categoría + slug en URL)
-- ============================================================
create table authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_title text,
  bio text,
  photo_id uuid references media(id)
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  seo jsonb not null default '{}'
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content jsonb not null default '[]',
  cover_image_id uuid references media(id),
  category_id uuid references categories(id),
  author_id uuid references authors(id),
  seo jsonb not null default '{}',
  status content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references cms_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- ============================================================
-- 6. Global: redirects, settings, auditoría (Doc 05 §2.12)
-- ============================================================
create table redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  status_code int not null default 301 check (status_code in (301, 302)),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references cms_users(id),
  updated_at timestamptz not null default now()
);

create table audit_log (
  id bigint generated always as identity primary key,
  actor uuid references cms_users(id),
  action text not null,
  entity text not null,
  entity_id text,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 7. Colecciones restantes (esqueleto; se completan en Fase 2/3)
-- ============================================================
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brand brand_line not null,
  category text,
  parent_id uuid references services(id),
  name text not null,
  tagline text,
  description text,
  content jsonb not null default '[]',
  seo jsonb not null default '{}',
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table sectors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  content jsonb not null default '[]',
  seo jsonb not null default '{}',
  status content_status not null default 'draft',
  published_at timestamptz
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('pantallas', 'pizarras', 'totems', 'alquiler')),
  description text,
  specs jsonb not null default '[]',
  content jsonb not null default '[]',
  seo jsonb not null default '{}',
  status content_status not null default 'draft',
  published_at timestamptz
);

create table saas_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  content jsonb not null default '[]',
  -- D15: estados finos definidos por PROEFEX; NO poblar sin input
  commercial_status text check (commercial_status in ('disponible','beta','en_desarrollo','proximamente','interno','no_publicar')),
  future_own_domain text,
  seo jsonb not null default '{}',
  status content_status not null default 'draft',
  published_at timestamptz
);

create table cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text,                     -- opcional, con consentimiento
  sector_id uuid references sectors(id),
  challenge text,
  solution text,
  results jsonb not null default '[]',  -- solo métricas provistas por el cliente
  consent boolean not null default false,
  seo jsonb not null default '{}',
  status content_status not null default 'draft',
  published_at timestamptz
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  scope text not null default 'global', -- 'global' | '<entidad>:<id>'
  sort_order int not null default 0
);

-- ============================================================
-- 8. Row Level Security (D14 + A8)
-- Patrón: lectura pública solo de contenido 'published';
--         escritura solo para roles CMS autenticados y activos.
-- ============================================================
alter table pages enable row level security;
alter table posts enable row level security;
alter table services enable row level security;
alter table sectors enable row level security;
alter table products enable row level security;
alter table saas_products enable row level security;
alter table cases enable row level security;
alter table faqs enable row level security;
alter table media enable row level security;
alter table redirects enable row level security;
alter table settings enable row level security;
alter table audit_log enable row level security;

-- Helper: usuario CMS activo
create or replace function is_active_cms_user()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from cms_users u
    where u.id = auth.uid() and u.active
  );
$$;

-- Helper: rol del usuario actual
create or replace function current_cms_role()
returns cms_role language sql stable security definer set search_path = public as $$
  select u.role from cms_users u where u.id = auth.uid() and u.active;
$$;

-- Lectura pública solo de contenido publicado
create policy "public_read_published_pages" on pages
  for select using (status = 'published');
create policy "public_read_published_posts" on posts
  for select using (status = 'published');
-- (patrón idéntico para services/sectors/products/saas_products/cases en su fase)

-- Escritura: cualquier rol CMS activo (afinamiento por rol en la capa de
-- aplicación; defensa en profundidad con validación server-side, Doc 06 §5)
create policy "cms_users_write_pages" on pages
  for all using (is_active_cms_user()) with check (is_active_cms_user());
create policy "cms_users_write_posts" on posts
  for all using (is_active_cms_user()) with check (is_active_cms_user());
create policy "cms_users_write_media" on media
  for all using (is_active_cms_user()) with check (is_active_cms_user());

-- Auditoría: solo lectura para CMS; escritura vía service role
create policy "audit_log_read_admins" on audit_log
  for select using (current_cms_role() in ('SUPER_ADMIN', 'ADMIN'));

-- Índices base
create index pages_status_idx on pages (status, published_at);
create index posts_status_idx on posts (status, published_at);
create index posts_category_idx on posts (category_id);
