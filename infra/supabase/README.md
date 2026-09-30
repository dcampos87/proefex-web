# Supabase — Migraciones PROEFEX

Migraciones versionadas en Git (A8 aprobado). Se aplican primero a **staging**, nunca directamente a producción.

## Estado

| Elemento | Estado |
|---|---|
| Migración `0001_initial_schema.sql` (esquema + RBAC + RLS) | Lista, sin aplicar |
| Proyecto Supabase staging | `PROEFEX_INPUT_REQUIRED` — crear proyecto y proveer `SUPABASE_URL` / claves por entorno |
| Proyecto Supabase producción | `PROEFEX_INPUT_REQUIRED` — crear tras validar staging |
| Asignación de personas a roles (D14) | `PROEFEX_INPUT_REQUIRED` |

## Cómo aplicar (cuando exista el proyecto)

```bash
supabase link --project-ref <staging-ref>
supabase db push
```

Reglas:
1. Nunca aplicar a producción sin pasar por staging.
2. Toda nueva migración es un archivo nuevo versionado (`000N_*.sql`); no editar migraciones aplicadas.
3. Secretos: solo referencias en `.env` (gitignored); nunca en el repo.
