import { Meta, StoryObj } from "@storybook/react";
import FindInput from "./FindInput";

const meta: Meta<typeof FindInput> = {
  title: "Components/FindPage/FindInput",
  component: FindInput,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FindInput>;

export const Default: Story = {
  args: {},
};
