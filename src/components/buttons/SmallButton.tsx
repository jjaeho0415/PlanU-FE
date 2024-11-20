import styles from "./smallButton.module.scss";
import React from "react";

interface ISmallButton {
  buttonText: string;
  color: "default" | "light";
}

const SmallButton: React.FC<ISmallButton> = ({ buttonText, color }) => {
  return (
    <div className={`${styles.Container} ${styles[color]}`}>
      <p>{buttonText}</p>
    </div>
  );
};

export default SmallButton;
