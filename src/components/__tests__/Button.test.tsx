import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "../Button";

describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button label="Confirmar" />);

    expect(
      screen.getByRole("button", { name: "Confirmar" }),
    ).toBeInTheDocument();
  });

  it("invokes the click handler when enabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button label="Salvar" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("allows overriding the button type attribute", () => {
    render(<Button label="Enviar" type="submit" />);

    expect(screen.getByRole("button", { name: "Enviar" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("does not invoke the click handler when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button label="Excluir" disabled onClick={onClick} />);

    const button = screen.getByRole("button", { name: "Excluir" });
    expect(button).toBeDisabled();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
