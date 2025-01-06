import { Meta, StoryObj } from "@storybook/react";
import FriendsTab from "./FriendsTab";

const meta: Meta<typeof FriendsTab> = {
  title: "Components/FriendsTab",
  component: FriendsTab,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FriendsTab>;

export const Default: Story = {
  args: {},
};
