import BottomArrow_Icon from "@assets/Icons/arrow/BottomArrow.svg?react";
import TopArrow_Icon from "@assets/Icons/arrow/TopArrow.svg?react";
import React, { useEffect, useState } from "react";
import styles from "./datePicker.module.scss";

interface Props {
  userBirth: string;
  setUserBirth: React.Dispatch<React.SetStateAction<string>>;
  setIsBirthError: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePicker: React.FC<Props> = ({ userBirth, setUserBirth, setIsBirthError }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());

  useEffect(() => {
    if (userBirth) {
      const [y, m, d] = userBirth.split("-").map(Number);
      setYear(y);
      setMonth(m);
      setDay(d);
    } else {
      updateUserBirth(year, month, day);
    }
  }, []);

  const updateUserBirth = (year: number, month: number, day: number) => {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setUserBirth(formattedDate);
  };

  const getDaysInMonth = (year: number, month: number): number => {
    // 0일은 해당 월의 마지막 날
    return new Date(year, month, 0).getDate();
  };

  const validateDate = (y: number, m: number, d: number): boolean => {
    if (y < 1900 || y > new Date().getFullYear()) {
      setIsBirthError(true);
      return false;
    }
    if (m < 1 || m > 12) {
      setIsBirthError(true);
      return false;
    }
    if (d < 1 || d > getDaysInMonth(y, m)) {
      setIsBirthError(true);
      return false;
    }
    setIsBirthError(false);
    return true;
  };

  const incrementValue = (type: "year" | "month" | "day") => {
    if (type === "year") {
      const newYear = year + 1;
      const maxDaysInMonth = getDaysInMonth(newYear, month);
      const newDay = Math.min(day, maxDaysInMonth);
      if (validateDate(newYear, month, newDay)) {
        setYear(newYear);
        setDay(newDay);
      }
    } else if (type === "month") {
      const newMonth = month === 12 ? 1 : month + 1;
      const maxDaysInNewMonth = getDaysInMonth(year, newMonth);
      const newDay = Math.min(day, maxDaysInNewMonth);
      if (validateDate(year, newMonth, newDay)) {
        setMonth(newMonth);
        setDay(newDay);
      }
    } else if (type === "day") {
      const newDay = day === getDaysInMonth(year, month) ? 1 : day + 1;
      if (validateDate(year, month, newDay)) setDay(newDay);
    }
  };

  const decrementValue = (type: "year" | "month" | "day") => {
    if (type === "year") {
      const newYear = year - 1;
      const maxDaysInMonth = getDaysInMonth(newYear, month);
      const newDay = Math.min(day, maxDaysInMonth);
      if (validateDate(newYear, month, newDay)) {
        setYear(newYear);
        setDay(newDay);
      }
    } else if (type === "month") {
      const newMonth = month === 1 ? 12 : month - 1;
      const maxDaysInNewMonth = getDaysInMonth(year, newMonth);
      const newDay = Math.min(day, maxDaysInNewMonth);
      if (validateDate(year, newMonth, newDay)) {
        setMonth(newMonth);
        setDay(newDay);
      }
    } else if (type === "day") {
      const newDay = day === 1 ? getDaysInMonth(year, month) : day - 1;
      if (validateDate(year, month, newDay)) setDay(newDay);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "year" | "month" | "day",
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value === "") {
      if (type === "year") setYear(0);
      if (type === "month") setMonth(0);
      if (type === "day") setDay(0);
      return;
    }

    const numericValue = parseInt(value, 10);

    if (type === "year") {
      const maxDaysInMonth = getDaysInMonth(numericValue, month);
      const newDay = Math.min(day, maxDaysInMonth);
      setYear(numericValue);
      setDay(newDay);
    } else if (type === "month") {
      if (numericValue >= 1 && numericValue <= 12) {
        const maxDaysInMonth = getDaysInMonth(year, numericValue);
        const newDay = Math.min(day, maxDaysInMonth);
        setMonth(numericValue);
        setDay(newDay);
      }
    } else if (type === "day") {
      const daysInMonth = getDaysInMonth(year, month);
      if (numericValue >= 1 && numericValue <= daysInMonth) setDay(numericValue);
    }
  };

  const handleBlur = () => {
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      setYear(2000);
    }
  };

  useEffect(() => {
    if (validateDate(year, month, day)) {
      updateUserBirth(year, month, day);
    }
  }, [year, month, day]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.inputSection}>
          <div className={styles.birthInputSection}>
            <TopArrow_Icon onClick={() => incrementValue("year")} />
            <input
              type="text"
              value={year === 0 ? "" : year}
              onChange={(e) => handleInputChange(e, "year")}
              className={styles.input}
              onBlur={handleBlur}
            />
            <BottomArrow_Icon onClick={() => decrementValue("year")} />
          </div>
          <span>년</span>
        </div>
        <div className={styles.inputSection}>
          <div className={styles.birthInputSection}>
            <TopArrow_Icon onClick={() => incrementValue("month")} />
            <input
              type="text"
              value={month === 0 ? "" : month}
              onChange={(e) => handleInputChange(e, "month")}
              className={styles.input}
            />
            <BottomArrow_Icon onClick={() => decrementValue("month")} />
          </div>
          <span>월</span>
        </div>
        <div className={styles.inputSection}>
          <div className={styles.birthInputSection}>
            <TopArrow_Icon onClick={() => incrementValue("day")} />
            <input
              type="text"
              value={day === 0 ? "" : day}
              onChange={(e) => handleInputChange(e, "day")}
              className={styles.input}
            />
            <BottomArrow_Icon onClick={() => decrementValue("day")} />
          </div>
          <span>일</span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
