import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Certificación — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="LEARN — PROEFEX LEARNS"
      title="Certificación"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Certificación' },
      ]}
      requires="rutas de certificación (Certmind)"
      backHref="/learns"
      backLabel="Volver a PROEFEX LEARNS"
      universe="learns"
    />
  );
}
