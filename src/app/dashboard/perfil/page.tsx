import { AppShell } from "@/components/layouts/AppShell";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-azure">
          Tu cuenta
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Mi perfil.</h1>
        <p className="mt-4 text-proefex-navy/60">
          Mantén tus datos actualizados para que la experiencia se adapte mejor a ti.
        </p>
        <form
          className="mt-10 rounded-[2rem] bg-white p-8 shadow-[0_16px_45px_rgba(0,34,84,0.08)] sm:p-10"
          action="#"
          method="post"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre" name="name" placeholder="María" />
            <Field label="Apellido" name="last_name" placeholder="González" />
          </div>
          <div className="mt-5">
            <Field
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="maria@empresa.co"
            />
          </div>
          <div className="mt-7">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
