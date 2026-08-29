import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import Page from "./page";

describe("Landing web 48 horas", () => {
  it("renderiza el titular de la oferta", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: /lanza la página web/i })
    ).toBeInTheDocument();
  });

  it("renderiza el subtítulo de acción con los cupos limitados", () => {
    render(<Page />);
    expect(screen.getByText(/solo 10 cupos disponibles/i)).toBeInTheDocument();
  });

  it("renderiza el contador de la oferta", () => {
    render(<Page />);
    expect(screen.getByText(/tu bono expira en/i)).toBeInTheDocument();
  });

  it("renderiza el formulario con el botón de reclamo", () => {
    render(<Page />);
    expect(
      screen.getByRole("button", { name: /reclamar mi bono y contratar web/i })
    ).toBeInTheDocument();
  });

  it("no contiene enlaces de navegación (anti-navegación)", () => {
    render(<Page />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
