import styles from "./startPage.module.scss";
import React from "react";
import Logo from "@assets/logo/planU로고.svg?react";
import LoginButton from "@components/buttons/LoginButton";
import { GoLogin } from "@components/buttons/GoLogin";
import { useNavigate } from "react-router-dom";

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Container}>
      <div className={styles.LogoBox}></div>
      <Logo />
      <div className={styles.ButtonBox}>
        <LoginButton
          buttonType="login_kakao"
          onClick={() => {
            return;
          }}
        />
        <LoginButton
          buttonType="login_other"
          onClick={() => {
            navigate("/login");
          }}
        />
      </div>
      <div className={styles.GoRegisterBox}>
        <GoLogin textType="회원가입" />
      </div>
    </div>
  );
};

export default StartPage;
