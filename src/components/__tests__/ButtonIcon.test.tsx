import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ButtonIcon from "../ButtonIcon";

describe("ButtonIcon", () => {
  it("renders an icon button", () => {
    render(<ButtonIcon onClick={() => {}} />);

    const iconButton = screen.getByRole("button");
    expect(iconButton.querySelector("svg")).not.toBeNull();
  });

  it("fires the provided click handler", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<ButtonIcon onClick={onClick} />);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
