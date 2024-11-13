import styles from "./startPage.module.scss";
import React from "react";
import Logo from "../../../assets/logo/planU로고.svg?react";
import Kakao from "../../../assets/logo/kakaoLogin.svg?react";
import { useNavigate } from "react-router-dom";

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <Logo />
      <div className={styles.InputBox}>
        <input className={styles.Input} placeholder="ID" />
        <input className={styles.Input} placeholder="Password" />
      </div>
      <div className={styles.BottomButtonBox}>
        <p className={styles.Cursor} onClick={() => navigate("/login")}>
          로그인
        </p>
        <p>|</p>
        <p className={styles.Cursor} onClick={() => navigate("/registerAccount")}>
          회원가입
        </p>
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
