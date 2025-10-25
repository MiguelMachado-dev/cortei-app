import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import TimeSelectGroup, { type Items } from "./TimeSelectGroup";

const timeGroups: Items = [
  {
    period: "MORNING",
    times: [
      { time: "09:00", isAvailable: true },
      { time: "10:00", isAvailable: false },
      { time: "11:00", isAvailable: true },
      { time: "12:00", isAvailable: true },
    ],
  },
  {
    period: "AFTERNOON",
    times: [
      { time: "13:00", isAvailable: true },
      { time: "14:00", isAvailable: true },
      { time: "15:00", isAvailable: false },
      { time: "16:00", isAvailable: true },
    ],
  },
  {
    period: "EVENING",
    times: [
      { time: "19:00", isAvailable: true },
      { time: "20:00", isAvailable: true },
      { time: "21:00", isAvailable: true },
    ],
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
    timeGroups: {
      control: "object",
    },
    onChange: fn(),
  },
  args: {
    name: "storybook",
    timeGroups,
    value: "09:00",
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
