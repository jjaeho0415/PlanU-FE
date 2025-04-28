import React, { useEffect, useState } from "react";
import styles from "./timePicker.module.scss";
import Icon_topArrow from "@assets/Icons/arrow/TopArrow_sm.svg?react";
import Icon_bottomArrow from "@assets/Icons/arrow/BottomArrow_sm.svg?react";
import useScheduleStore from "@store/useScheduleStore";
import toast from "react-hot-toast";

interface props {
  isStartDay: boolean;
}

const TimePicker: React.FC<props> = ({ isStartDay }) => {
  const [amPm, setAmPm] = useState<"오전" | "오후">("오전");
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());
  const { startDate, setStartDate, endDate, setEndDate } = useScheduleStore();

  useEffect(() => {
    if (hour >= 12 && hour !== 24) {
      setAmPm("오후");
    } else {
      setAmPm("오전");
    }
  }, [hour]);

  useEffect(() => {
    const targetDate = isStartDay ? startDate : endDate;

    setHour(targetDate.getHours());
    setMinute(targetDate.getMinutes());
  }, [isStartDay]);

  useEffect(() => {
    if (startDate.getTime() > endDate.getTime()) {
      toast.error("시작 시간이 종료 시간보다 늦을 수 없습니다.");
      const controlledEndDate = endDate;
      controlledEndDate.setHours(startDate.getHours(), startDate.getMinutes());
      setStartDate(controlledEndDate);
    }
  }, [startDate, endDate]);

  const updateDate = (newHour: number, newMinute: number, isStart: boolean) => {
    if (isStart) {
      const updatedStartDate = new Date(startDate);
      updatedStartDate.setHours(newHour, newMinute, 0, 0);
      setStartDate(updatedStartDate);
    } else {
      const updatedEndDate = new Date(endDate);
      updatedEndDate.setHours(newHour, newMinute, 0, 0);
      setEndDate(updatedEndDate);
    }
  };

  const incrementValue = (type: "시간" | "분") => {
    if (type === "시간") {
      const newHour = hour + 1 > 24 ? 1 : hour + 1;
      setHour(newHour);
      updateDate(newHour, minute, isStartDay);
    } else if (type === "분") {
      if (minute + 1 >= 60) {
        setMinute(0);
        incrementValue("시간");
        updateDate(hour, 0, isStartDay);
      } else {
        setMinute(minute + 1);
        updateDate(hour, minute + 1, isStartDay);
      }
    }
  };

  const decrementValue = (type: "시간" | "분") => {
    if (type === "시간") {
      const newHour = hour - 1 <= 0 ? 24 : hour - 1;
      setHour(newHour);
      updateDate(newHour, minute, isStartDay);
    } else if (type === "분") {
      if (minute - 1 < 0) {
        setMinute(59);
        decrementValue("시간");
        updateDate(hour, 59, isStartDay);
      } else {
        const newMinute = minute - 1;
        setMinute(newMinute);
        updateDate(hour, newMinute, isStartDay);
      }
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>, type: "시간" | "분") => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (type === "시간") {
      const newHour = Math.min(Math.max(Number(value), 1), 24);
      setHour(newHour);
      updateDate(newHour, minute, isStartDay);
    } else if (type === "분") {
      const newMinute = Math.min(Math.max(Number(value), 0), 59);
      setMinute(newMinute);
      updateDate(hour, newMinute, isStartDay);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.WithTextBox}>
        <div className={styles.AMPMBox}>
          <p className={styles.Input}>{amPm}</p>
        </div>
      </div>
      <div className={styles.WithTextBox}>
        <div className={styles.Box}>
          <Icon_topArrow className={styles.Cursor} onClick={() => incrementValue("시간")} />
          <input
            className={styles.Input}
            value={
              isStartDay
                ? startDate.getHours().toString().padStart(2, "0")
                : endDate.getHours().toString().padStart(2, "0")
            }
            onChange={(e) => handleChangeValue(e, "시간")}
          />
          <Icon_bottomArrow className={styles.Cursor} onClick={() => decrementValue("시간")} />
        </div>
        <p className={styles.Text}>시</p>
      </div>
      <div className={styles.WithTextBox}>
        <div className={styles.Box}>
          <Icon_topArrow className={styles.Cursor} onClick={() => incrementValue("분")} />
          <input
            className={styles.Input}
            value={
              isStartDay
                ? startDate.getMinutes().toString().padStart(2, "0")
                : endDate.getMinutes().toString().padStart(2, "0")
            }
            onChange={(e) => handleChangeValue(e, "분")}
          />
          <Icon_bottomArrow className={styles.Cursor} onClick={() => decrementValue("분")} />
        </div>
        <p className={styles.Text}>분</p>
      </div>
    </div>
  );
};

export default TimePicker;
