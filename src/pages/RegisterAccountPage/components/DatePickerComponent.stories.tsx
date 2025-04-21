import { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./DatePicker";
import { useState } from "react";

function DatePickerComponent() {
  const [userBirth, setUserBirth] = useState<string|null>("2000-04-15");
  const [isBirthError, setIsBirthError] = useState<boolean>(false);
  console.log(isBirthError)
  return (
    <>
      <div>
        <h1>DatePickerComponent</h1>
        <DatePicker
          userBirth={userBirth}
          setUserBirth={setUserBirth}
          setIsBirthError={setIsBirthError}
        />
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
