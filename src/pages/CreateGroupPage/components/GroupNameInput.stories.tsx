import { Meta, StoryObj } from "@storybook/react";
import GroupNameInput from "./GroupNameInput";

const meta: Meta<typeof GroupNameInput> = {
  title: "Components/GroupNameInput",
  component: GroupNameInput,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GroupNameInput>;

export const Default: Story = {
  args: {},
};
