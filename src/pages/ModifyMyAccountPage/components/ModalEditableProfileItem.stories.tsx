import { Meta, StoryObj } from "@storybook/react";
import ModalEditableProfileItem from "./ModalEditableProfileItem";

const meta: Meta<typeof ModalEditableProfileItem> = {
  title: "Components/ModalEditableProfileItem",
  component: ModalEditableProfileItem,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ModalEditableProfileItem>;

export const Default: Story = {
  args: {
    label: "이메일",
    value: "daeunlee0713@naver.com",
    onArrowClick: () => {
      console.log("Arrow clicked!");
    },
  },
};
