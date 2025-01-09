import React from "react";
import styles from "./smallButton.module.scss";

interface ISmallButton {
  buttonText: string;
  color: "default" | "light";
  onClick: () => void;
}

const SmallButton: React.FC<ISmallButton> = ({ buttonText, color }) => {
  return (
    <div className={`${styles.Container} ${styles[color]}`}>
      <p>{buttonText}</p>
    </div>
  );
};

export default SmallButton;
