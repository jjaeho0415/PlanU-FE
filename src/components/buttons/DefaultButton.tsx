import React from "react";
import styles from "./defaultButton.module.scss";

interface IDefaultButton {
  buttonText: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export const DefaultButton: React.FC<IDefaultButton> = ({
  buttonText,
  onClick,
  isDisabled = false,
}) => {
  return (
    <div
      className={`${styles.Container} ${isDisabled ? styles.DisabledColor : styles.DefaultColor}`}
      onClick={onClick}
    >
      <p>{buttonText}</p>
    </div>
  );
};
