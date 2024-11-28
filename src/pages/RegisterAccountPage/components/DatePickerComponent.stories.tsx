import { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./DatePicker";
import { useState } from "react";

function DatePickerComponent() {
  const [userBirth, setUserBirth] = useState<string>("2000-04-15");
  return (
    <>
      <div>
        <h1>DatePickerComponent</h1>
        <DatePicker userBirth={userBirth} setUserBirth={setUserBirth} />
      </div>
      <hr />
    </>
  );
}

const meta: Meta<typeof DatePickerComponent> = {
  title: "DatePickerComponent",
  component: DatePickerComponent,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof DatePickerComponent>;

export const Default: Story = {
  args: {},
};
