import { Meta, StoryObj } from "@storybook/react";
import InlineEditableProfileItem from "./InlineEditableProfileItem";

const meta: Meta<typeof InlineEditableProfileItem> = {
  title: "Components/InlineEditableProfileItem",
  component: InlineEditableProfileItem,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InlineEditableProfileItem>;

export const Default: Story = {
  args: {
    label: "이름",
    value: "이다은",
    onChange: (newValue: string) => console.log("New Value:", newValue),
  },
};
