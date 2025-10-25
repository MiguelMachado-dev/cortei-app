import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TimeSelectGroup, { type Items } from "../TimeSelectGroup";

describe("TimeSelectGroup", () => {
  const baseGroups: Items = [
    {
      period: "MORNING",
      times: [
        { time: "09:00", isAvailable: true },
        { time: "09:30", isAvailable: false },
      ],
    },
    {
      period: "AFTERNOON",
      times: [
        { time: "13:00", isAvailable: true },
        { time: "14:00", isAvailable: true },
      ],
    },
  ];

  it("renders a section header for each provided period", () => {
    render(
      <TimeSelectGroup
        name="schedule"
        timeGroups={baseGroups}
        value={null}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Manhã")).toBeInTheDocument();
    expect(screen.getByText("Tarde")).toBeInTheDocument();
  });

  it("notifies the parent when a time slot is chosen", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TimeSelectGroup
        name="schedule"
        timeGroups={baseGroups}
        value={null}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("radio", { name: "13:00" }));

    expect(onChange).toHaveBeenCalledWith("13:00");
  });
});
