import { Meta, StoryObj } from "@storybook/react";
import { DefaultButton } from "./DefaultButton";
import { GoLogin } from "./GoLogin";
import LoginButton from "./LoginButton";
import SmallButton from "./SmallButton";
import { MemoryRouter } from "react-router-dom";
import styles from "./buttonStory.module.scss";

function Button() {
  return (
    <>
      <div>
        <h1>DefaultButton</h1>
        <div className={styles.Container}>
          <DefaultButton
            buttonText="완료"
            onClick={() => {
              return;
            }}
          />
        </div>
      </div>

      <div>
        <h1>GoLogin</h1>
        <div className={styles.Container}>
          <GoLogin textType="로그인" />
          <GoLogin textType="회원가입" />
        </div>
      </div>

      <div>
        <h1>LoginButton</h1>
        <div className={styles.Container}>
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
      </div>

      <div>
        <h1>SmallButton</h1>
        <div className={styles.Container}>
          <SmallButton buttonText="확인" color="default" />
          <SmallButton buttonText="확인" color="light" />
        </div>
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
