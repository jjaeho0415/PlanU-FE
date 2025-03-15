import React from "react";
import styles from "./Boxes.module.scss";

interface Props {
  title: string;
}

const TitleBox: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.BoxContainer}>
      <div className={styles.Color} />
      <p>{title}</p>
    </div>
  );
};

export default TitleBox;
