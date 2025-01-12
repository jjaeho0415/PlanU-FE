import { Meta, StoryObj } from "@storybook/react";
import InlineEditableProfileItemWithButton from "./InlineEditableProfileItemWithButton";

const meta: Meta<typeof InlineEditableProfileItemWithButton> = {
  title: "Components/InlineEditableProfileItemWithButton",
  component: InlineEditableProfileItemWithButton,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InlineEditableProfileItemWithButton>;

export const Default: Story = {
  args: {
    label: "이름",
    value: "이다은",
    onChange: (newValue: string) => console.log("New Value:", newValue),
    buttonLabel: "확인",
    onButtonClick: () => alert("버튼이 클릭되었습니다."),
  },
};
