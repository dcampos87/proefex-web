import { SiteShell } from "@proefex/shared/layouts/SiteShell";
import { Button } from "@proefex/shared/ui/Button";
import { Field } from "@proefex/shared/ui/Field";
import { PageHero } from "@/components/ui/PageHero";

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Hablemos"
        title="El próximo paso empieza con una buena conversación."
        description="Cuéntanos qué quieres transformar y te ayudaremos a encontrar la ruta más clara."
      />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[2rem] bg-proefex-orange p-8 text-proefex-navy sm:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Contacto directo
            </span>
            <h2 className="mt-7 text-3xl font-bold">Estamos para escucharte.</h2>
            <p className="mt-5 leading-relaxed text-proefex-navy/70">
              Agenda una sesión de 30 minutos o escríbenos a{" "}
              <a className="font-semibold underline" href="mailto:hola@proefex.com">
                hola@proefex.com
              </a>
              .
            </p>
            <div className="mt-10 text-sm font-semibold">
              Lunes a viernes
              <br />
              <span className="font-normal text-proefex-navy/60">8:00 a.m. — 5:00 p.m.</span>
            </div>
          </div>
          <form
            className="rounded-[2rem] bg-white p-8 text-proefex-navy shadow-[0_24px_70px_rgba(0,34,84,0.12)] sm:p-10"
            action="#"
            method="post"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" name="name" placeholder="Tu nombre" />
              <Field
                label="Correo corporativo"
                name="email"
                type="email"
                placeholder="tu@empresa.com"
              />
            </div>
            <div className="mt-5">
              <label className="flex flex-col gap-2 text-sm font-medium">
                ¿En qué podemos ayudarte?
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos sobre tu reto..."
                  className="resize-none rounded-2xl border border-proefex-navy/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-proefex-orange focus:ring-4 focus:ring-proefex-orange/10"
                />
              </label>
            </div>
            <div className="mt-7">
              <Button type="submit">Enviar mensaje</Button>
            </div>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
