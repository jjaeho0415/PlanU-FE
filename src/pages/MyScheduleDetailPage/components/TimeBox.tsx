import React from "react";
import styles from "./Boxes.module.scss";

const TimeBox: React.FC = () => {
  return (
    <div className={styles.TimeContainer}>
      <div className={styles.TimeBoxTop}>
        <p>시작</p>
        <p className={styles.Time}>2024년 02월 19일 (화) 19:30</p>
      </div>
      <div className={styles.TimeBoxBottom}>
        <p>종료</p>
        <p className={styles.Time}>2024년 02월 19일 (화) 21:30</p>
      </div>
    </div>
  );
};

export default TimeBox;
