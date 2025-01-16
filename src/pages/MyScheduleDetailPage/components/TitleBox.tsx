import React from "react";
import styles from "./Boxes.module.scss";

const TitleBox: React.FC = () => {
  return (
    <div className={styles.BoxContainer}>
      <div className={styles.Color} />
      <p>수현이 생일파티</p>
    </div>
  );
};

export default TitleBox;
