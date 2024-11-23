import { Meta, StoryObj } from "@storybook/react";
import { DefaultButton } from "./DefaultButton";
import { GoLogin } from "./GoLogin";
import LoginButton from "./LoginButton";
import SmallButton from "./SmallButton";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import CheckButton from "./CheckButton";

function Button() {
  return (
    <>
      <div>
        <h1>DefaultButton</h1>
        <DefaultButton
          buttonText="완료"
          onClick={() => {
            return;
          }}
        />
      </div>
      <hr />
      <div>
        <h1>GoLogin</h1>
        <GoLogin textType="login" textColor="gray" />
        <GoLogin textType="register" textColor="gray" />
      </div>
      <hr />

      <div>
        <h1>LoginButton</h1>
        <LoginButton
          buttonType="login"
          onClick={() => {
            alert("로그인");
          }}
        />
        <LoginButton
          buttonType="login_kakao"
          onClick={() => {
            alert("카카오톡으로 로그인");
          }}
        />
        <LoginButton
          buttonType="login_kakao_white"
          onClick={() => {
            alert("카카오 로그인");
          }}
        />
        <LoginButton
          buttonType="login_other"
          onClick={() => {
            alert("다른 방법으로 로그인");
          }}
        />
        <LoginButton
          buttonType="register"
          onClick={() => {
            alert("회원가입");
          }}
        />
      </div>
      <hr />

      <div>
        <h1>SmallButton</h1>
        <SmallButton buttonText="확인" color="default" />
        <SmallButton buttonText="확인" color="light" />
      </div>
      <hr />

      <div>
        <h1>checkButton</h1>
        <CheckButton
          buttonText="확인"
          onClick={() => {
            return;
          }}
        />
        <CheckButton
          buttonText="인증번호 전송"
          onClick={() => {
            return;
          }}
        />
        <CheckButton
          buttonText="중복 확인"
          onClick={() => {
            return;
          }}
        />
      </div>
    </>
  );
}

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};
