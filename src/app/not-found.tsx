import Link from "next/link";

/**
 * 404 con el design system (tema core). El root layout aporta
 * header/footer/skip-link; aquí solo el contenido del error.
 */
export default function NotFound() {
  return (
    <div data-universe="core">
      <section
        className="relative"
        style={{
          paddingTop: "calc(var(--header-h) + clamp(64px, 10vw, 128px))",
          paddingBottom: "clamp(64px, 10vw, 128px)",
          background: "linear-gradient(180deg, var(--bg-sunken) 0%, var(--bg) 100%)",
        }}
      >
        <div className="container-pfx flex flex-col items-start gap-5">
          <p className="label-mono">
            ERROR <span aria-hidden="true" style={{ color: "var(--accent)" }}> / 404</span>
          </p>
          <h1 style={{ fontSize: "var(--text-display-lg)" }}>Página no encontrada</h1>
          <p className="max-w-[60ch]" style={{ fontSize: "var(--text-body-lg)" }}>
            La dirección que buscas no existe o cambió. Vuelve al inicio o
            escríbenos directamente.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary w-fit">
              Ir al inicio
            </Link>
            <Link href="/contacto" className="btn btn-secondary w-fit">
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
