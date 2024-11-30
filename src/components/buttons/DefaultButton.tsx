import styles from "./defaultButton.module.scss";
import React from "react";

interface IDefaultButton {
  buttonText: string;
  onClick: () => void;
}

export const DefaultButton: React.FC<IDefaultButton> = ({ buttonText, onClick }) => {
  return (
    <div className={styles.Container} onClick={onClick}>
      <p className={styles.buttonText}>{buttonText}</p>
    </div>
  );
};
