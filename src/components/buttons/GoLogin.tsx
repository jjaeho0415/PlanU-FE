import { useNavigate } from "react-router-dom";
import styles from "./goLogin.module.scss";
import React, { useEffect, useState } from "react";

interface IGoLogin {
  textType: "login" | "register";
  textColor: "white" | "gray";
}

export const GoLogin: React.FC<IGoLogin> = ({ textType, textColor }) => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");

  const handleClickBtn = () => {
    if (textType === "login") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    if (textType === "login") {
      setText("기존 회원이신가요?");
      setButtonText("로그인");
    } else if (textType === "register") {
      setText("아직 회원이 아니신가요?");
      setButtonText("회원가입");
    }
  }, []);

  return (
    <div className={styles.Container}>
      <p className={styles[textColor]}>{text}</p>
      <p className={styles.ButtonText} onClick={handleClickBtn}>
        {buttonText}
      </p>
    </div>
  );
};
