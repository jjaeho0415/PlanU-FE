import React, { useState } from "react";
import styles from "./Inputs.module.scss";
import Toggle_disabled from "@assets/Icons/toggleButton/toggle_disabled.svg?react";
import Toggle_abled from "@assets/Icons/toggleButton/toggle_abled.svg?react";
import TimePicker from "./TimePicker";
import DatePicker from "@components/createSchedule/DatePicker";
import useScheduleStore from "@store/useScheduleStore";
import { format } from "date-fns";

const TimeBox: React.FC = () => {
  const [isDateClicked, setIsDateClicked] = useState<number>(-1);
  const [isTimeClicked, setIsTimeClicked] = useState<number>(-1);
  const { isAllDay, setIsAllDay, startDate, setStartDate, setEndDate, endDate } =
    useScheduleStore();

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleDateClick = (isStart: boolean) => {
    if (isStart) {
      setStartDate(startDate);
      setIsDateClicked(isDateClicked === 0 ? -1 : 0);
    } else {
      setEndDate(endDate);
      setIsDateClicked(isDateClicked === 1 ? -1 : 1);
      setIsTimeClicked(-1);
    }
  };

  const handleTimeClick = (isStart: boolean) => {
    setIsDateClicked(-1);
    isStart
      ? setIsTimeClicked(isTimeClicked === 0 ? -1 : 0)
      : setIsTimeClicked(isTimeClicked === 1 ? -1 : 1);
  };

  return (
    <div>
      <div className={`${styles.TimeBox} ${styles.Top}`}>
        <p className={styles.Title}>종일</p>
        {isAllDay ? (
          <Toggle_abled className={styles.Cursor} onClick={() => setIsAllDay(false)} />
        ) : (
          <Toggle_disabled
            className={styles.Cursor}
            onClick={() => {
              setIsAllDay(true);
              setIsTimeClicked(-1);
            }}
          />
        )}
      </div>
      <div className={`${styles.TimeBox} ${styles.Middle}`}>
        <p className={styles.Title}>시작</p>
        <div className={styles.Time}>
          <p onClick={() => handleDateClick(true)}>{format(startDate, "yyyy-MM-dd")}</p>
          {!isAllDay && <p onClick={() => handleTimeClick(true)}>{formatTime(startDate)}</p>}
        </div>
      </div>
      {isDateClicked === 0 && <DatePicker isStartDay={true} />}
      {isTimeClicked === 0 && <TimePicker isStartDay={true} />}
      {!isAllDay && (
        <div
          className={`${styles.TimeBox} ${isTimeClicked === 1 || isDateClicked === 1 ? styles.Middle : styles.Last}`}
        >
          <p className={styles.Title}>종료</p>
          <div className={styles.Time}>
            <p onClick={() => handleDateClick(false)}>{format(endDate, "yyyy-MM-dd")}</p>
            <p onClick={() => handleTimeClick(false)}>{formatTime(endDate)}</p>
          </div>
        </div>
      )}
      {isDateClicked === 1 && <DatePicker isStartDay={false} />}
      {isTimeClicked === 1 && <TimePicker isStartDay={false} />}
    </div>
  );
};

export default TimeBox;
