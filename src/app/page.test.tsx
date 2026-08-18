import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "@/app/page";

describe("Landing page", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
  });
});
