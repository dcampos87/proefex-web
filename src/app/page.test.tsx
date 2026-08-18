import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "@/app/page";

describe("Landing page", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getAllByLabelText("PROEFEX - inicio").length).toBeGreaterThan(0);
  });

  it("muestra el hero con la propuesta de valor", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: /impulsa el talento/i })
    ).toBeInTheDocument();
  });

  it("muestra los tres pilares de servicios", () => {
    render(<Page />);
    expect(screen.getByText("LMS Corporativo")).toBeInTheDocument();
    expect(screen.getByText("CMS de Contenido")).toBeInTheDocument();
    expect(screen.getByText("Consultoría de Aprendizaje")).toBeInTheDocument();
  });

  it("muestra el CTA final de demo", () => {
    render(<Page />);
    const ctas = screen.getAllByText(/solicitar demo/i);
    expect(ctas.length).toBeGreaterThan(0);
  });
});
