import React, { useState } from "react";
import styles from "./Inputs.module.scss";
import Toggle_disabled from "../../../assets/Icons/toggleButton/toggle_disabled.svg?react";
import Toggle_abled from "../../../assets/Icons/toggleButton/toggle_abled.svg?react";
import TimePicker from "./TimePicker";
import DatePicker from "@components/createSchedule/DatePicker";

interface props {
  isAllDay: boolean;
  setIsAllDay: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}
const TimeBox: React.FC<props> = ({
  isAllDay,
  setIsAllDay,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [isDateClicked, setIsDateClicked] = useState<number>(-1);
  const [isTimeClicked, setIsTimeClicked] = useState<number>(-1);

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

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
          <p onClick={() => setIsDateClicked(isDateClicked === 0 ? -1 : 0)}>
            {startDate.toISOString().split("T")[0]}
          </p>
          {!isAllDay && (
            <p onClick={() => setIsTimeClicked(isTimeClicked === 0 ? -1 : 0)}>
              {formatTime(startDate)}
            </p>
          )}
        </div>
      </div>
      {isDateClicked === 0 && <DatePicker type="view" />}
      {isTimeClicked === 0 && (
        <TimePicker
          isStartDay={true}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}
      <div
        className={`${styles.TimeBox} ${isTimeClicked === 1 || isDateClicked === 1 ? styles.Middle : styles.Last}`}
      >
        <p className={styles.Title}>종료</p>
        <div className={styles.Time}>
          <p onClick={() => setIsDateClicked(isDateClicked === 1 ? -1 : 1)}>
            {endDate.toISOString().split("T")[0]}
          </p>
          {!isAllDay && (
            <p onClick={() => setIsTimeClicked(isTimeClicked === 1 ? -1 : 1)}>
              {formatTime(endDate)}
            </p>
          )}
        </div>
      </div>
      {isDateClicked === 1 && <DatePicker type="view" />}
      {isTimeClicked === 1 && (
        <TimePicker
          isStartDay={false}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}
    </div>
  );
};

export default TimeBox;
