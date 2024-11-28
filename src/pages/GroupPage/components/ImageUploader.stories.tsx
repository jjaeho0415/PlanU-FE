import { Meta, StoryObj } from "@storybook/react";
import ImageUploader from "./ImageUploader";

const meta: Meta<typeof ImageUploader> = {
  title: "Components/ImageUploader",
  component: ImageUploader,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {
  args: {},
};
