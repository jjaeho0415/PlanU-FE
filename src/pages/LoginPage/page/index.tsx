import React from "react";
import styles from "./login.module.scss";
import LoginInput from "@components/inputBoxes/LoginInput";
import { GoLogin } from "@components/buttons/GoLogin";
import LoginButton from "@components/buttons/LoginButton";
import FindComponent from "../components/FindComponent";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const inputList = [
    {
      inputText: "ID",
      buttonText: null,
      isPassword: false,
    },
    { inputText: "Password", buttonText: null, isPassword: true },
  ];
  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="로그인"
        pageType="login"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <div className={styles.InputBox}>
        {inputList.map((input, index) => (
          <div key={index}>
            <LoginInput
              inputText={input.inputText}
              buttonText={input.buttonText ?? ""}
              isPassword={input.isPassword}
            />
          </div>
        ))}
      </div>
      <div className={styles.FindBox}>
        <FindComponent />
      </div>
      <div className={styles.ButtonBox}>
        <LoginButton
          buttonType="login"
          onClick={() => {
            return;
          }}
        />
        <LoginButton
          buttonType="login_kakao_white"
          onClick={() => {
            return;
          }}
        />
      </div>
      <div className={styles.GoLoginBox}>
        <GoLogin textType="register" textColor="gray" />
      </div>
    </div>
  );
};

export default LoginPage;
