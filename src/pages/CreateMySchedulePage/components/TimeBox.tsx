import React from "react";
import styles from "./Inputs.module.scss";
import Toggle_disabled from "../../../assets/Icons/toggleButton/toggle_disabled.svg?react";
import Toggle_abled from "../../../assets/Icons/toggleButton/toggle_abled.svg?react";

interface props {
  isAllDay: boolean;
  setIsAllDay: React.Dispatch<React.SetStateAction<boolean>>;
}
const TimeBox: React.FC<props> = ({ isAllDay, setIsAllDay }) => {
  return (
    <div>
      <div className={`${styles.TimeBox} ${styles.Top}`}>
        <p className={styles.Title}>종일</p>
        {isAllDay ? (
          <Toggle_abled className={styles.Cursor} onClick={() => setIsAllDay(false)} />
        ) : (
          <Toggle_disabled className={styles.Cursor} onClick={() => setIsAllDay(true)} />
        )}
      </div>
      <div className={`${styles.TimeBox} ${styles.Middle}`}>
        <p className={styles.Title}>시작</p>
        <p className={styles.Time}>2024년 11월 5일 (수) 19:00 </p>
      </div>
      <div className={`${styles.TimeBox} ${styles.Last}`}>
        <p className={styles.Title}>종료</p>
        <p className={styles.Time}>2024년 11월 5일 (수) 21:00 </p>
      </div>
    </div>
  );
};

export default TimeBox;
