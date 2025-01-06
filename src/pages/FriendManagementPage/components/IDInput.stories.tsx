import { Meta, StoryObj } from "@storybook/react";
import IDInput from "./IDInput";

const meta: Meta<typeof IDInput> = {
  title: "Components/IDInput",
  component: IDInput,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof IDInput>;

export const Default: Story = {
  args: {},
};
