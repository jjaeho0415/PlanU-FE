import styles from "./loginBtn.module.scss";
import React from "react";
import Icon_kakao from "@assets/Icons/startPage/Icon_Kakao.svg?react";

interface ILoginBtn {
  onClick: () => void;
  buttonType: "login_kakao" | "login_kakao_white" | "login_other" | "register" | "login";
}

const LoginButton: React.FC<ILoginBtn> = ({ onClick, buttonType }) => {
  const buttonText = (() => {
    switch (buttonType) {
      case "login_kakao":
        return "카카오톡으로 로그인";
      case "login_kakao_white":
        return "카카오 로그인";
      case "login_other":
        return "다른 방법으로 로그인";
      case "register":
        return "회원가입";
      case "login":
      default:
        return "로그인";
    }
  })();

  return (
    <div role="button" className={`${styles.Container} ${styles[buttonType]}`} onClick={onClick}>
      {(buttonType === "login_kakao" || buttonType === "login_kakao_white") && <Icon_kakao width={35} height={35} />}
      <p>{buttonText}</p>
    </div>
  );
};

export default LoginButton;
