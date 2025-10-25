import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TextInput from "./TextInput";

const meta = {
  title: "Main/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
  args: {
    placeholder: "Agendar",
    name: "storybook",
    inputValue: "",
    setInputValue: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "340px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
