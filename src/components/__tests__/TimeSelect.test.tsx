import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import TimeSelect from "../TimeSelect";

describe("TimeSelect", () => {
  const systemDate = new Date("2025-10-25T12:00:00");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(systemDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("disables time slots that have already passed on the selected day", () => {
    render(
      <TimeSelect
        id="slot-09"
        name="time"
        value="09:00"
        checked={false}
        labelText="09:00"
        isDisabled={false}
        selectedDate={new Date(systemDate)}
        onChange={() => {}}
      />,
    );

    const radio = screen.getByRole("radio", { name: "09:00" });
    expect(radio).toBeDisabled();
  });

  it("keeps future time slots enabled on the selected day", () => {
    render(
      <TimeSelect
        id="slot-13"
        name="time"
        value="13:30"
        checked={false}
        labelText="13:30"
        isDisabled={false}
        selectedDate={new Date(systemDate)}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("radio", { name: "13:30" })).toBeEnabled();
  });

  it("honors the explicit disabled flag", () => {
    render(
      <TimeSelect
        id="slot-disabled"
        name="time"
        value="16:00"
        checked={false}
        labelText="16:00"
        isDisabled
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("radio", { name: "16:00" })).toBeDisabled();
  });

  it("calls the onChange handler when the slot is selected", async () => {
    const listener = vi.fn();

    const Harness = () => {
      const [value, setValue] = useState<string | null>(null);

      return (
        <TimeSelect
          id="slot-17"
          name="time"
          value="17:00"
          checked={value === "17:00"}
          labelText="17:00"
          isDisabled={false}
          onChange={(event) => {
            listener(event.target.value);
            setValue(event.target.value);
          }}
        />
      );
    };

    render(<Harness />);

    fireEvent.click(screen.getByRole("radio", { name: "17:00" }));

    expect(listener).toHaveBeenCalledWith("17:00");
    expect(screen.getByRole("radio", { name: "17:00" })).toBeChecked();
  });
});
