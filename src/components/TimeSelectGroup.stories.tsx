import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import TimeSelectGroup, { type Items } from "./TimeSelectGroup";

const items: Items = [
  {
    label: "Test",
    value: "test",
    isDisabled: true,
  },
  {
    label: "Test 2",
    value: "test 2",
    isDisabled: false,
  },
];

const meta = {
  title: "Main/TimeSelectGroup",
  component: TimeSelectGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
    },
    onChange: fn(),
  },
  args: {
    name: "storybook",
    items,
    value: "test",
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "340px" }}>
        <Story />
      </div>
    ),
  ],
  render: (args, { updateArgs }) => (
    <TimeSelectGroup
      {...args}
      onChange={(next) => {
        updateArgs({ value: next });
        args.onChange?.(next);
      }}
    />
  ),
} satisfies Meta<typeof TimeSelectGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
