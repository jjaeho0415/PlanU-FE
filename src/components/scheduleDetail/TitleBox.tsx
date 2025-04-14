import React from "react";
import styles from "./Boxes.module.scss";
import useScheduleStore from "@store/useScheduleStore";

const TitleBox: React.FC = () => {
  const { title } = useScheduleStore();
  return (
    <div className={styles.BoxContainer}>
      <div className={styles.Color} />
      <p>{title}</p>
    </div>
  );
};

export default TitleBox;
