import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Ingeniería — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="CREATE — PROEFEX TECH"
      title="Ingeniería"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Ingeniería' },
      ]}
      requires="propuesta, alcance y subpáginas (Drones/IoT)"
      backHref="/tech"
      backLabel="Volver a PROEFEX TECH"
    />
  );
}
