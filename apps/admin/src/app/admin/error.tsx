"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-proefex-navy px-6 text-center text-white">
      <div className="max-w-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-proefex-amber">
          Error del espacio admin
        </span>
        <h1 className="mt-5 text-3xl font-bold">Algo no salió como esperábamos.</h1>
        <p className="mt-4 text-white/60">Puedes intentar cargar de nuevo esta sección.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-proefex-orange px-6 py-3 text-sm font-semibold text-proefex-navy"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}
