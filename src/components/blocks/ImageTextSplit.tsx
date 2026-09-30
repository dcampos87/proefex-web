import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

interface ImageTextSplitProps {
  title: string;
  children?: ReactNode;
  cta?: { label: string; href: string };
  /** En móvil la media va primero (Doc 15 §2.3). */
  mediaSide?: "left" | "right";
  image?: ReactNode;
}

/**
 * ImageTextSplit — bloque split (Doc 05 §3). En sm/md apilado con media
 * primero; lg+ split 50/50. Sin imagen real → placeholder de media del CMS.
 */
export function ImageTextSplit({ title, children, cta, mediaSide = "right", image }: ImageTextSplitProps) {
  const media = (
    <Reveal className="order-1 lg:order-none" delay={120}>
      <div
        className="flex aspect-[4/3] items-center justify-center border"
        style={{
          borderRadius: "var(--radius-md)",
          background: "var(--bg-sunken)",
          borderStyle: "dashed",
          borderColor: "var(--border-strong)",
        }}
        role="img"
        aria-label="Espacio reservado para imagen gestionada por el CMS"
      >
        {image ?? <span className="content-required">MEDIA — CONTENT_REQUIRED</span>}
      </div>
    </Reveal>
  );

  const text = (
    <Reveal className="order-2 flex flex-col gap-4 lg:order-none">
      <h2 style={{ fontSize: "var(--text-display-lg)", fontFamily: "var(--font-display)", color: "var(--text)" }}>
        {title}
      </h2>
      {children}
      {cta ? (
        <p>
          <a href={cta.href} className="btn btn-secondary w-fit">
            {cta.label}
          </a>
        </p>
      ) : null}
    </Reveal>
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {mediaSide === "left" ? (
        <>
          {media}
          {text}
        </>
      ) : (
        <>
          {text}
          {media}
        </>
      )}
    </div>
  );
}
