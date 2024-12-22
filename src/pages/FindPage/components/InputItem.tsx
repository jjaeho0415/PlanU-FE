import { forwardRef, useState } from "react";
import styles from "./inputItem.module.scss";
import Icon_eyeOff from "@assets/Icons/eye/Icon_eyeOff.svg?react";
import Icon_eyeOn from "@assets/Icons/eye/Icon_eyeOn.svg?react";
import FindButton from "@components/buttons/FindButton";

interface props {
  inputText: string;
  buttonText: string;
  isPassword?: boolean;
  onClick?: () => void;
}

const InputItem = forwardRef<HTMLInputElement, props>(
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
          <div className={styles.EyeIcon} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <Icon_eyeOn className={styles.Cursor} />
            ) : (
              <Icon_eyeOff className={styles.Cursor} />
            )}
          </div>
        )}
        {buttonText !== "" && onClick && <FindButton buttonText={buttonText} onClick={onClick} />}
      </div>
    );
  },
);

export default InputItem;
