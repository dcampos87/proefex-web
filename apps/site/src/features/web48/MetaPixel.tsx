"use client";

import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

interface MetaPixelProps {
  /** Dispara el evento estándar "Lead" (Cliente potencial) al cargar la página. */
  trackLead?: boolean;
}

/**
 * Inyecta el código base del Pixel de Meta. No renderiza nada si
 * NEXT_PUBLIC_META_PIXEL_ID no está definido. El evento Lead se dispara en la
 * página de agradecimiento; en la landing solo se carga el pixel para medir el
 * embudo completo.
 */
export function MetaPixel({ trackLead = false }: MetaPixelProps) {
  if (!META_PIXEL_ID) {
    return null;
  }

  const pixelSnippet = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
    ${trackLead ? "fbq('track', 'Lead');" : ""}
  `;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: pixelSnippet }}
    />
  );
}
