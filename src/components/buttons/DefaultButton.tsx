import styles from "./defaultButton.module.scss";
import React from "react";

interface IDefaultButton {
  buttonText: string;
  onClick: () => void;
}

export const DefaultButton: React.FC<IDefaultButton> = ({ buttonText }) => {
  return (
    <div className={styles.Container}>
      <p className={styles.buttonText}>{buttonText}</p>
    </div>
  );
};
