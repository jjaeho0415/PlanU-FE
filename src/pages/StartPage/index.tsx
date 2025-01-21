import Logo from "@assets/logo/planU.svg?react";
import { GoLogin } from "@components/buttons/GoLogin";
import LoginButton from "@components/buttons/LoginButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./startPage.module.scss";

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
      <GoLogin textType="register" textColor="white" />
    </div>
  );
};

export default StartPage;
