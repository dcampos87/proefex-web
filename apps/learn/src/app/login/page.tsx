import Link from "next/link";

import { SiteShell } from "@proefex/shared/layouts/SiteShell";
import { Button } from "@proefex/shared/ui/Button";
import { Field } from "@proefex/shared/ui/Field";

export default function LoginPage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-28 sm:px-10">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-proefex-navy shadow-[0_24px_70px_rgba(0,34,84,0.14)] sm:p-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-proefex-azure">
            Tu espacio PROEFEX
          </span>
          <h1 className="mt-5 text-3xl font-bold">Bienvenido de nuevo.</h1>
          <p className="mt-3 text-sm leading-relaxed text-proefex-navy/60">
            Continúa tu ruta de aprendizaje desde donde la dejaste.
          </p>
          <form className="mt-8 flex flex-col gap-5" action="#" method="post">
            <Field
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="tu@empresa.com"
            />
            <Field label="Contraseña" name="password" type="password" placeholder="••••••••" />
            <Button type="submit">Iniciar sesión</Button>
          </form>
          <p className="mt-7 text-center text-sm text-proefex-navy/60">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold text-proefex-azure">
              Crear una cuenta
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
