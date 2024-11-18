import { useNavigate } from "react-router-dom";
import styles from "./goLogin.module.scss";
import React, { useEffect, useState } from "react";

interface IGoLogin {
  textType: "로그인" | "회원가입";
}

export const GoLogin: React.FC<IGoLogin> = ({ textType }) => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");

  const handleClickBtn = () => {
    if (textType === "로그인") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    if (textType === "로그인") {
      setText("기존 회원이신가요?");
      setButtonText("로그인");
    } else if (textType === "회원가입") {
      setText("아직 회원이 아니신가요?");
      setButtonText("회원가입");
    }
  }, []);

  return (
    <div className={styles.Container}>
      <p className={styles.Text}>{text}</p>
      <p className={styles.ButtonText} onClick={handleClickBtn}>
        {buttonText}
      </p>
    </div>
  );
};
