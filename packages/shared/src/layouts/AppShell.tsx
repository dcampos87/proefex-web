import type { ReactNode } from "react";
import Link from "next/link";

import { BrandMark } from "./BrandMark";
import { appLinks } from "../config/appLinks";

interface AppShellProps {
  children: ReactNode;
  admin?: boolean;
}

export function AppShell({ children, admin = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-proefex-navy">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-proefex-navy px-7 py-8 text-white lg:flex">
        <BrandMark />
        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            {admin ? "Centro de administración" : "Tu espacio de aprendizaje"}
          </p>
          <nav className="mt-5 flex flex-col gap-1" aria-label="Navegación de aplicación">
            {(admin
              ? [
                  ["Resumen", "/admin"],
                  ["Cursos", "/admin/cursos"],
                  ["Blog", "/admin/blog"],
                  ["Usuarios", "/admin/usuarios"],
                  ["Media", "/admin/media"],
                ]
              : [
                  ["Resumen", "/dashboard"],
                  ["Mis cursos", "/dashboard/cursos"],
                  ["Certificados", "/dashboard/certificados"],
                  ["Mi perfil", "/dashboard/perfil"],
                ]
            ).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl px-4 py-3 text-sm text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto rounded-3xl bg-white/[0.08] p-5">
          <p className="text-sm font-semibold">¿Necesitas ayuda?</p>
          <p className="mt-2 text-xs leading-relaxed text-white/55">
            Consulta nuestro centro de ayuda o habla con soporte.
          </p>
          <Link
            href={appLinks.site("/contacto")}
            className="mt-4 inline-block text-xs font-semibold text-proefex-amber"
          >
            Ir a soporte →
          </Link>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="flex h-20 items-center justify-between border-b border-proefex-navy/10 bg-white/75 px-5 backdrop-blur-xl sm:px-10">
          <div className="lg:hidden">
            <BrandMark light={false} compact />
          </div>
          <div className="hidden text-sm text-proefex-navy/60 sm:block">
            {admin ? "Martes, 18 de agosto de 2026" : "Continúa tu aprendizaje"}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notificaciones"
              className="rounded-full p-2 text-proefex-navy/60 hover:bg-proefex-navy/5"
            >
              <span aria-hidden="true">◌</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="hidden text-right text-sm sm:block">
                <strong className="block font-semibold">María González</strong>
                <span className="text-xs text-proefex-navy/50">
                  {admin ? "Administradora" : "Estudiante"}
                </span>
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-proefex-orange font-semibold text-proefex-navy">
                MG
              </span>
            </div>
          </div>
        </header>
        <main className="px-5 py-8 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
