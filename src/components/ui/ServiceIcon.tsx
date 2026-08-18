import type { Service } from "@/types/landing";

interface IconProps {
  className?: string;
}

function LmsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m10 9.5 4.5-2.5v5L10 9.5Z" fill="currentColor" />
    </svg>
  );
}

function CmsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ConsultoriaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5v4.5l3 2M4.5 16.5 3 19m16.5-2.5L21 19M4.5 7.5 3 5m16.5 2.5L21 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const iconMap: Record<Service["icon"], (props: IconProps) => React.JSX.Element> = {
  lms: LmsIcon,
  cms: CmsIcon,
  consultoria: ConsultoriaIcon,
};

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const IconComponent = iconMap[icon];
  return <IconComponent className={className} />;
}
