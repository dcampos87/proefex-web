import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';
import { SectorDetailView } from '@/components/content/SectorDetailView';
import { getContentEntry } from '@/lib/content';
import type { Crumb } from '@/components/nav/Breadcrumbs';

export const metadata: Metadata = {
  title: { absolute: 'Restaurantes — PROEFEX' },
  robots: { index: false, follow: false },
};

const CRUMBS: Crumb[] = [{ label: 'PROEFEX', href: '/' }, { label: 'Restaurantes' }];

/**
 * Detalle de sector (F3.2). Si el sector está publicado en el CMS, `proefex-api`
 * devuelve la entidad y la página se renderiza con contenido real; si no está
 * publicado, o el API no está configurado en el entorno, se conserva la
 * plantilla de arquitectura (mismo HTML que antes de F3.2). Nada se inventa.
 */
export default async function Page() {
  const sector = await getContentEntry('sectors', 'restaurantes');

  if (sector.outcome === 'ok' && sector.data !== null) {
    return (
      <SectorDetailView
        sector={sector.data}
        crumbs={CRUMBS}
        backHref="/sectores"
        backLabel="Volver a Sectores"
      />
    );
  }

  return (
    <RouteStub
      pillar="PROEFEX — SECTORES"
      title="Restaurantes"
      crumbs={CRUMBS}
      requires="descripción del sector y capacidades aplicables"
      backHref="/sectores"
      backLabel="Volver a Sectores"
      universe="core"
      variant="industry"
    />
  );
}
