import EyeClosedIcon from "@assets/icons/eye/Icon_eyeOff.svg?react";
import EyeOpenIcon from "@assets/icons/eye/Icon_eyeOn.svg?react";
import React, { useState } from "react";
import styles from "./inlineEditableProfileItem.module.scss";

interface InlineEditableProfileItemWithButtonProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showEyeIcon?: boolean;
}

const InlineEditableProfileItemWithButton: React.FC<InlineEditableProfileItemWithButtonProps> = ({
  label,
  value,
  onChange,
  buttonLabel,
  onButtonClick,
  showEyeIcon = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={showEyeIcon && !isPasswordVisible ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {showEyeIcon && (
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
