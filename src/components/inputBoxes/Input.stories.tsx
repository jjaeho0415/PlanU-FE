import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import LoginInput from "./LoginInput";

function Input() {
  const inputList = [
    { inputText: "Name", buttonText: null, isPassword: false },
    {
      inputText: "ID",
      buttonText: "중복 확인",
      isPassword: false,
      onClick: () => {
        return;
      },
    },
    { inputText: "Password", buttonText: null, isPassword: true },
    { inputText: "Confirm Password", buttonText: null, isPassword: false },
    {
      inputText: "e-mail",
      buttonText: "인증번호 발송",
      isPassword: false,
      onClick: () => {
        return;
      },
    },
    {
      inputText: "인증코드 6자리 입력",
      buttonText: "확인",
      isPassword: false,
      onClick: () => {
        return;
      },
    },
  ];
  return (
    <>
      <div>
        <h1>Login & Register Input</h1>
        {inputList.map((input, index) => (
          <div key={index}>
            <LoginInput
              inputText={input.inputText}
              buttonText={input.buttonText ?? ""}
              isPassword={input.isPassword}
              onClick={input.onClick}
            />
          </div>
        ))}
      </div>
      <hr />
    </>
  );
}

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
