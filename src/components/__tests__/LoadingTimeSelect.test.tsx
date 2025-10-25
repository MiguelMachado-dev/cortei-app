import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LoadingTimeSelect from "../LoadingTimeSelect";

describe("LoadingTimeSelect", () => {
  it("renders a descriptive loading title and placeholder groups", () => {
    const { container } = render(<LoadingTimeSelect />);

    expect(
      screen.getByTitle("Carregando... Escolha um horário"),
    ).toBeInTheDocument();

    const placeholderRows = container.querySelectorAll(".grid");
    expect(placeholderRows.length).toBeGreaterThanOrEqual(3);
  });
});
