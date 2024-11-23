import React from "react";
import styles from "./check.module.scss";

interface ICheckButton {
  buttonText: string;
  onClick: () => void;
}

const CheckButton: React.FC<ICheckButton> = ({ buttonText, onClick }) => {
  return (
    <div className={styles.ButtonContainer} onClick={onClick}>
      <p>{buttonText}</p>
    </div>
  );
};

export default CheckButton;
