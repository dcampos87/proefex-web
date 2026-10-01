import type { Metadata } from 'next';
import { RouteStub } from '@/components/pages/RouteStub';

export const metadata: Metadata = {
  title: 'Implementación de software — PROEFEX',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <RouteStub
      pillar="CREATE — PROEFEX TECH"
      title="Implementación de software"
      crumbs={[
        { label: 'PROEFEX', href: '/' },
        { label: 'Implementación de software' },
      ]}
      requires="propuesta y alcance"
      backHref="/tech"
      backLabel="Volver a PROEFEX TECH"
      universe="tech"
    />
  );
}
