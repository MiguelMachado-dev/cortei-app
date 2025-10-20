import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import ButtonIcon from "./ButtonIcon";

const meta = {
  title: "Main/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { control: "text" },
  },
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "340px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
