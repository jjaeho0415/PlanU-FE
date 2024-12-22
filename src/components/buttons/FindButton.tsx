import React from "react";
import styles from "./find.module.scss";

interface props {
  buttonText: string;
  onClick: () => void;
}

const FindButton: React.FC<props> = ({ buttonText, onClick }) => {
  return (
    <div className={styles.ButtonContainer} onClick={onClick}>
      <p>{buttonText}</p>
    </div>
  );
};

export default FindButton;
