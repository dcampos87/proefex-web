import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omitir href en el último nivel (página actual). */
  href?: string;
}

/**
 * Breadcrumbs (§20/§29) — orientación + SEO (JSON-LD BreadcrumbList).
 * Usar solo en páginas internas con ≥2 niveles de profundidad real.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://www.proefexperu.com${item.href}` }
        : {}),
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
