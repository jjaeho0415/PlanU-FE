import styles from "./startPage.module.scss";
import React from "react";
import Logo from '@assets/logo/planU로고.svg?react';
import Kakao from "@assets/logo/kakaoLogin.svg?react";
import LoginButton from "@components/buttons/LoginButton";

const StartPage: React.FC = () => {
  return (
    <div className={styles.Container}>
      <Logo />
      <div className={styles.ButtonBox}>
        <LoginButton buttonType="login_kakao" onClick={()=>{return;}}/>
        <LoginButton buttonType="login_other" onClick={()=>{return;}}/>
      </div>
      <div className={styles.EasyLoginBox}>
        <p className={styles.EasyLoginTitle}>간편 로그인</p>
        <div className={styles.HRLine}></div>
        <Kakao className={styles.Kakao} />
      </div>
    </div>
  );
};

export default StartPage;
