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
      <div className={styles.TimeTopBox}>
        <p className={styles.Title}>종일</p>
        {isAllDay ? (
          <Toggle_abled onClick={() => setIsAllDay(false)} />
        ) : (
          <Toggle_disabled onClick={() => setIsAllDay(true)} />
        )}
      </div>
      <div className={styles.TimeMiddleBox}>
        <p className={styles.Title}>시작</p>
      </div>
      <div className={styles.TimeLastBox}>
        <p className={styles.Title}>종료</p>
      </div>
    </div>
  );
};

export default TimeBox;
