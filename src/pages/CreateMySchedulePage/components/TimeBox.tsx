import React, { useState } from "react";
import styles from "./Inputs.module.scss";
import Toggle_disabled from "../../../assets/Icons/toggleButton/toggle_disabled.svg?react";
import Toggle_abled from "../../../assets/Icons/toggleButton/toggle_abled.svg?react";
import TimePicker from "./TimePicker";

interface props {
  isAllDay: boolean;
  setIsAllDay: React.Dispatch<React.SetStateAction<boolean>>;
}
const TimeBox: React.FC<props> = ({ isAllDay, setIsAllDay }) => {
  const [isDateClicked, setIsDateClicked] = useState<number>(-1);
  const [isTimeClicked, setIsTimeClicked] = useState<number>(-1);
  const [amPm, setAmPm] = useState<"오전" | "오후">("오전");
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());

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
        <div className={styles.Time}>
          <p onClick={() => setIsDateClicked(isDateClicked === 0 ? -1 : 0)}>2024년 11월 5일 (수)</p>
          <p onClick={() => setIsTimeClicked(isTimeClicked === 0 ? -1 : 0)}>19:00</p>
        </div>
      </div>
      {isTimeClicked === 0 && (
        <TimePicker
          amPm={amPm}
          setAmPm={setAmPm}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
        />
      )}
      <div
        className={`${styles.TimeBox} ${isTimeClicked === 1 || isDateClicked === 1 ? styles.Middle : styles.Last}`}
      >
        <p className={styles.Title}>종료</p>
        <div className={styles.Time}>
          <p onClick={() => setIsDateClicked(isDateClicked === 1 ? -1 : 1)}>2024년 11월 5일 (수)</p>
          <p onClick={() => setIsTimeClicked(isTimeClicked === 1 ? -1 : 1)}> 21:00</p>
        </div>
      </div>
      {isTimeClicked === 1 && (
        <TimePicker
          amPm={amPm}
          setAmPm={setAmPm}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
        />
      )}
    </div>
  );
};

export default TimeBox;
