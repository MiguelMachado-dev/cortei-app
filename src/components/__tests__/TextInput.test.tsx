import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import TextInput from "../TextInput";

describe("TextInput", () => {
  it("renders the input with placeholder and name", () => {
    render(
      <TextInput
        placeholder="Nome do cliente"
        name="client-name"
        inputValue=""
        setInputValue={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText("Nome do cliente");
    expect(input).toHaveAttribute("name", "client-name");
  });

  it("delegates changes to the provided setter", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();

    const Harness = () => {
      const [value, setValue] = useState("");

      const handleChange = (nextValue: string) => {
        setValue(nextValue);
        changes(nextValue);
      };

      return (
        <TextInput
          placeholder="Nome do cliente"
          name="client-name"
          inputValue={value}
          setInputValue={handleChange}
        />
      );
    };

    render(<Harness />);

    const input = screen.getByPlaceholderText("Nome do cliente");
    await user.type(input, "Ana");

    expect(changes).toHaveBeenCalledWith("Ana");
    expect(screen.getByDisplayValue("Ana")).toBeInTheDocument();
  });
});
