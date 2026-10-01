import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Cursos — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="LEARN — PROEFEX LEARNS"
      title="Cursos"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Cursos' },
      ]}
      requires="catálogo (D16: no inventar)"
      backHref="/learns"
      backLabel="Volver a PROEFEX LEARNS"
      universe="learns"
      variant="default"
    />
  );
}
