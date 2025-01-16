import React from "react";
import styles from "./Inputs.module.scss";
import Icon_arrow from "@assets/Icons/arrow/RightArrow.svg?react";

const ColorBox: React.FC = () => {
  return (
    <div className={styles.Box}>
      <p className={styles.Title}>색상</p>
      <div className={styles.RightBox}>
        <div className={styles.Color}></div>
        <Icon_arrow />
      </div>
    </div>
  );
};

export default ColorBox;
