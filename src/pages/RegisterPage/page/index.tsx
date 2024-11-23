import { GoLogin } from "@components/buttons/GoLogin";
import styles from "./register.module.scss";
import React, { useState } from "react";
import Icon_alert from "@assets/Icons/Icon_alert.svg?react";
import LoginButton from "@components/buttons/LoginButton";
import LoginInput from "@components/inputBoxes/LoginInput";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSendingEmailCode, setIsSendingEmailCode] = useState<boolean>(false);

  const handleCheckDuplication = () => {};

  const handleSendCode = () => {
    setIsSendingEmailCode(true);
  };

  const handleConfirmCode = () => {};

  const inputList = [
    { inputText: "Name", buttonText: null, isPassword: false },
    {
      inputText: "ID",
      buttonText: "중복 확인",
      isPassword: false,
      onClick: handleCheckDuplication,
    },
    { inputText: "Password", buttonText: null, isPassword: true },
    { inputText: "Confirm Password", buttonText: null, isPassword: false },
    {
      inputText: "e-mail",
      buttonText: "인증번호 발송",
      isPassword: false,
      onClick: handleSendCode,
    },
    {
      inputText: "인증코드 6자리 입력",
      buttonText: "확인",
      isPassword: false,
      onClick: handleConfirmCode,
    },
  ];

  const filteredInputList = isSendingEmailCode
    ? [...inputList]
    : inputList.slice(0, inputList.length - 1);

  return (
    <div className={styles.Container}>
      <HasOnlyBackArrowHeader
        title="회원가입"
        pageType="register"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <div className={styles.InputBox}>
        {filteredInputList.map((input, index) => (
          <div key={index}>
            <LoginInput
              inputText={input.inputText}
              buttonText={input.buttonText ?? ""}
              isPassword={input.isPassword}
              onClick={input.onClick}
            />
            {input.inputText === "인증코드 6자리 입력" && (
              <div className={styles.ResendBox}>
                <Icon_alert />
                <p className={styles.ResendP}>
                  이메일을 받지 못하셨나요?<span className={styles.Span}>이메일 재전송하기</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.ButtonBox}>
        <LoginButton
          buttonType="register"
          onClick={() => {
            return;
          }}
        />
        <GoLogin textType="login" textColor="gray" />
      </div>
    </div>
  );
};

export default RegisterPage;
