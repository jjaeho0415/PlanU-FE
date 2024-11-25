import { forwardRef, useState } from "react";
import styles from "./loginInput.module.scss";
import Icon_eyeOff from "@assets/Icons/eye/Icon_eyeOff.svg?react";
import Icon_eyeOn from "@assets/Icons/eye/Icon_eyeOn.svg?react";
import CheckButton from "@components/buttons/CheckButton";

interface ILoginInputProps {
  inputText: string;
  buttonText: string;
  isPassword?: boolean;
  onClick?: () => void;
}

const LoginInput = forwardRef<HTMLInputElement, ILoginInputProps>(
  ({ inputText, buttonText, isPassword, onClick, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <div className={styles.Container}>
        <input
          className={styles.Input}
          placeholder={inputText}
          type={isPassword && isOpen ? "text" : isPassword ? "password" : "text"}
          ref={ref}
          {...props}
        />
        {isPassword && buttonText !== "확인" && (
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
  },
);

export default LoginInput;
