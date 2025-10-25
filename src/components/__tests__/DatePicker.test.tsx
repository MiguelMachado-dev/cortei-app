import { render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

type MockCalendarProps = {
  onSelect?: (value: Date | undefined) => void;
};

const calendarPropsStore: MockCalendarProps[] = [];

vi.mock("@/components/ui/calendar", () => {
  return {
    Calendar: (props: MockCalendarProps) => {
      calendarPropsStore.push(props);
      return <div data-testid="calendar" />;
    },
  };
});

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...rest }: ComponentPropsWithoutRef<"button">) => (
    <button type="button" {...rest}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, ...rest }: ComponentPropsWithoutRef<"label">) => (
    <label {...rest}>{children}</label>
  ),
}));

vi.mock("@/components/ui/popover", () => ({
  Popover: ({ children }: PropsWithChildren) => <div>{children}</div>,
  PopoverTrigger: ({ children }: PropsWithChildren) => <>{children}</>,
  PopoverContent: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

import { DatePicker } from "../DatePicker";

describe("DatePicker", () => {
  beforeEach(() => {
    calendarPropsStore.length = 0;
  });

  it("shows the placeholder and label when no date is selected", () => {
    render(<DatePicker date={undefined} setDate={() => {}} />);

    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("selecione uma data")).toBeInTheDocument();
  });

  it("hides the label when hideLabel is true", () => {
    render(<DatePicker date={undefined} setDate={() => {}} hideLabel />);

    expect(screen.queryByText("Data")).toBeNull();
  });

  it("passes the selected date back to the caller", async () => {
    const setDate = vi.fn();

    render(<DatePicker date={undefined} setDate={setDate} />);

    const lastProps = calendarPropsStore.at(-1);
    expect(lastProps).toBeDefined();

    const onSelect = lastProps?.onSelect as
      | ((value: Date | undefined) => void)
      | undefined;

    expect(onSelect).toBeDefined();

    const selectedDate = new Date("2025-01-05T00:00:00");
    onSelect?.(selectedDate);

    expect(setDate).toHaveBeenCalledWith(selectedDate);
  });

  it("closes the placeholder message once a date is present", () => {
    render(
      <DatePicker date={new Date("2025-01-05T00:00:00")} setDate={() => {}} />,
    );

    expect(screen.queryByText("selecione uma data")).toBeNull();
  });
});
