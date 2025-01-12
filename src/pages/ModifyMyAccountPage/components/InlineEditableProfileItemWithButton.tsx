import EyeClosedIcon from "@assets/icons/eye/Icon_eyeOff.svg?react";
import EyeOpenIcon from "@assets/icons/eye/Icon_eyeOn.svg?react";
import React, { useState } from "react";
import styles from "./inlineEditableProfileItem.module.scss";

interface Props {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const InlineEditableProfileItemWithButton: React.FC<Props> = ({
  label,
  value,
  onChange,
  buttonLabel,
  onButtonClick,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button type="button" className={styles.iconButton} onClick={togglePasswordVisibility}>
          {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>

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
