"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Video de hero con autoplay consciente de reduced-motion (§11/§24).
 * Sin JS, con prefers-reduced-motion o sin datos suficientes se
 * muestra el poster (Image): el contenido nunca depende del video.
 * Autoplay siempre muted + playsInline; sin proveedores externos.
 */
export function MediaHeroVideo({
  src,
  poster,
  alt,
  focal = "50% 50%",
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  poster: string;
  alt: string;
  focal?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMotionOk(!mq.matches);
      if (!mq.matches) ref.current?.play().catch(() => {});
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <video
      ref={ref}
      className="media-frame-img"
      src={motionOk ? src : undefined}
      poster={poster}
      autoPlay={motionOk}
      muted
      loop
      playsInline
      preload="metadata"
      style={{ objectPosition: focal }}
      aria-label={alt}
      role="img"
      data-priority={priority ? "true" : undefined}
      data-sizes={sizes}
    />
  );
}
