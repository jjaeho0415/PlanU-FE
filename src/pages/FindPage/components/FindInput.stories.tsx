import { Meta, StoryObj } from "@storybook/react";
import FindInput from "./FindInput";

function Input() {
  return (
    <div>
      <h1>Find ID</h1>
      <FindInput findType="id" />
      <h1>Find Password</h1>
      <FindInput findType="pw" />
    </div>
  );
}
const meta: Meta<typeof Input> = {
  title: "Components/FindPage/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
