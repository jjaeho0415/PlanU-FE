import EyeClosedIcon from "@assets/icons/eye/Icon_eyeOff.svg?react";
import EyeOpenIcon from "@assets/icons/eye/Icon_eyeOn.svg?react";
import React, { useState } from "react";
import styles from "./inlineEditableProfileItem.module.scss";

interface Props {
  label: string;
  value: string | null;
  setRequestUserInfo?: React.Dispatch<React.SetStateAction<IUpdateUserProfileRequest>>;
  requestUserInfo?: IUpdateUserProfileRequest;
  buttonLabel?: string;
  onButtonClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InlineEditableProfileItemWithButton: React.FC<Props> = ({
  label,
  value,
  setRequestUserInfo,
  requestUserInfo,
  buttonLabel,
  onButtonClick,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else if (setRequestUserInfo && requestUserInfo) {
      if (label === "이메일") {
        setRequestUserInfo({
          ...requestUserInfo,
          email: e.target.value,
        });
      } else if (label === "기존 비밀번호") {
        setRequestUserInfo({
          ...requestUserInfo,
          password: e.target.value,
        });
      } else if (label === "새로운 비밀번호") {
        setRequestUserInfo({
          ...requestUserInfo,
          password: e.target.value,
        });
      } else if (label === "비밀번호 확인") {
        setRequestUserInfo({
          ...requestUserInfo,
          password: e.target.value,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={label.includes("비밀번호") ? (isPasswordVisible ? "text" : "password") : "text"}
          value={value ?? ""}
          onChange={handleInputChange}
        />

        {label.includes("비밀번호") && (
          <button type="button" className={styles.iconButton} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        )}

        {buttonLabel && onButtonClick && (
          <button className={styles.button} onClick={onButtonClick}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default InlineEditableProfileItemWithButton;
