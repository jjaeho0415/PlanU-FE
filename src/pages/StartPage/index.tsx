import styles from "./startPage.module.scss";
import React from "react";
import Logo from '@assets/logo/planU로고.svg?react';
import LoginButton from "@components/buttons/LoginButton";
import GoLogin from "@components/buttons/GoLogin";

const StartPage: React.FC = () => {
  return (
    <div className={styles.Container}>
      <Logo />
      <div className={styles.ButtonBox}>
        <LoginButton buttonType="login_kakao" onClick={()=>{return;}}/>
        <LoginButton buttonType="login_other" onClick={()=>{return;}}/>
      </div>
      <div className={styles.GoRegisterBox}>
       <GoLogin textType="회원가입" />
      </div>
    </div>
  );
};

export default StartPage;
