import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base = "btn";
const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

interface CommonProps {
  variant?: Variant;
  size?: "md" | "sm";
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button primitivo (Doc 14 §5). Estados hover/focus-visible/active/disabled
 * definidos en globals.css; focus ring 2px global. Alto táctil ≥48px (≥40 en sm).
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const cls = `${base} ${variants[variant]}${size === "sm" ? " btn-sm" : ""} ${className}`.trim();

  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
