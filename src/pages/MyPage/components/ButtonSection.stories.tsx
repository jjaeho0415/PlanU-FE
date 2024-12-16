import { Meta, StoryObj } from "@storybook/react";
import ButtonSection from "./ButtonSection";

const meta: Meta<typeof ButtonSection> = {
  title: "Components/ButtonSection",
  component: ButtonSection,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ButtonSection>;

export const Default: Story = {
  args: {},
};
