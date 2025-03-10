import React from "react";
import styles from "./Boxes.module.scss";

interface Props {
  startDate: string;
  endDate: string;
}

const TimeBox: React.FC<Props> = ({ startDate, endDate }) => {
  return (
    <div className={styles.TimeContainer}>
      <div className={styles.TimeBoxTop}>
        <p>시작</p>
        <p className={styles.Time}>{startDate}</p>
      </div>
      <div className={styles.TimeBoxBottom}>
        <p>종료</p>
        <p className={styles.Time}>{endDate}</p>
      </div>
    </div>
  );
};

export default TimeBox;
