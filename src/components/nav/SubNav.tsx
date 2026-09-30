import Link from "next/link";

export interface SubNavItem {
  label: string;
  href: string;
}

/**
 * SubNav — navegación contextual por universo (§19).
 * Pills con aria-current; scroll horizontal en móvil; tema heredado
 * del data-universe de la página. No sticky (el header ya es fijo).
 */
export function SubNav({
  items,
  ariaLabel,
  currentHref,
}: {
  items: SubNavItem[];
  ariaLabel: string;
  currentHref?: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="subnav" style={{ paddingBottom: 4 }}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={currentHref === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
