import { Meta, StoryObj } from "@storybook/react";
import { GoLogin } from "./GoLogin";
import LoginButton from "./LoginButton";
import SmallButton from "./SmallButton";
import { MemoryRouter } from "react-router-dom";
import styles from "./buttonStory.module.scss";
import CheckButton from "./CheckButton";
import MiniButton from "./MiniButton";
import FindButton from "./FindButton";
import DefaultButton from "./DefaultButton";

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
          <DefaultButton
            buttonText="완료"
            onClick={() => {
              return;
            }}
            isDisabled={true}
          />
        </div>
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
      <hr />

      <div>
        <h1>SmallButton</h1>
        <div className={styles.Container}>
          <SmallButton
            buttonText="확인"
            color="default"
            onClick={() => {
              return;
            }}
          />
          <SmallButton
            buttonText="확인"
            color="light"
            onClick={() => {
              return;
            }}
          />
        </div>
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

      <hr />
      <h1>MiniButton</h1>
      <MiniButton
        buttonText="완료"
        color="purple"
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="수락"
        color="purple"
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="거절"
        color="white"
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="요청중.."
        color="white"
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="요청취소"
        color="red"
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="달력보기"
        color="white"
        isCalendar={true}
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="친구요청"
        color="purple_light"
        isAddFriend={true}
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="그룹탈퇴"
        color="red"
        onClick={() => {
          return;
        }}
      />
      <MiniButton
        buttonText="강제퇴장"
        color="gray"
        onClick={() => {
          return;
        }}
      />
      <h1>FindButton</h1>
      <div className={styles.Container}>
        <FindButton
          buttonText="인증번호 전송"
          onClick={() => {
            return;
          }}
        />
        <FindButton
          buttonText="확인"
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
