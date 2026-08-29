import { SiteShell } from "@proefex/shared/layouts/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { CourseCatalog } from "@/features/catalog/CourseCatalog";

export default function CoursesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Catálogo PROEFEX"
        title="Aprendizaje que se convierte en acción."
        description="Explora rutas de formación diseñadas para desarrollar las capacidades que mueven a tu organización."
        ctaLabel="Hablar con un asesor"
        ctaHref="/contacto"
      />
      <section className="relative px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <CourseCatalog />
        </div>
      </section>
    </SiteShell>
  );
}
