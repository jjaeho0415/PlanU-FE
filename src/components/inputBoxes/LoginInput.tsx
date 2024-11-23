import React, { useState } from "react";
import styles from "./loginInput.module.scss";
import Icon_eyeOff from "@assets/Icons/eye/Icon_eyeOff.svg?react";
import Icon_eyeOn from "@assets/Icons/eye/Icon_eyeOn.svg?react";
import CheckButton from "@components/buttons/CheckButton";

interface ILoginInput {
  inputText: string;
  buttonText: string;
  isPassword?: boolean;
  onClick?: () => void;
}

const LoginInput: React.FC<ILoginInput> = ({
  inputText,
  buttonText,
  isPassword = false,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.Container}>
      <input className={styles.Input} placeholder={inputText}></input>
      {isPassword && (
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <Icon_eyeOff className={styles.Cursor} />
          ) : (
            <Icon_eyeOn className={styles.Cursor} />
          )}
        </div>
      )}
      {buttonText !== "" && onClick && <CheckButton buttonText={buttonText} onClick={onClick} />}
    </div>
  );
};

export default LoginInput;
