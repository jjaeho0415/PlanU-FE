import { Meta, StoryObj } from "@storybook/react";
import FindTypeTab from "./FindTypeTab";

const meta: Meta<typeof FindTypeTab> = {
  title: "Components/FindTypeTab",
  component: FindTypeTab,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FindTypeTab>;

export const Default: Story = {
  args: {},
};
