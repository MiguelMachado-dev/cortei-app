import type { Meta, StoryObj } from "@storybook/react-vite";

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

export const Default: Story = {};
