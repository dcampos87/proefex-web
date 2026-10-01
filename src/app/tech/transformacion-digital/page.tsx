import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Transformación digital — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="CREATE — PROEFEX TECH"
      title="Transformación digital"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Transformación digital' },
      ]}
      requires="propuesta y alcance"
      backHref="/tech"
      backLabel="Volver a PROEFEX TECH"
      universe="tech"
      variant="service"
    />
  );
}
