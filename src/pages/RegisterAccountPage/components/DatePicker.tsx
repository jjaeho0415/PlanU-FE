import React, { useEffect, useState } from "react";
import TopArrow_Icon from "@assets/Icons/arrow/TopArrow.svg?react";
import BottomArrow_Icon from "@assets/Icons/arrow/BottomArrow.svg?react";
import styles from "./datePicker.module.scss";

interface Props {
  userBirth: string;
  setUserBirth: React.Dispatch<React.SetStateAction<string>>;
  setIsBirthError: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePicker: React.FC<Props> = ({ userBirth, setUserBirth, setIsBirthError }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1); // 월은 0부터 시작하므로 +1
  const [day, setDay] = useState<number>(new Date().getDate());

  // userBirth 초기화
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

  // userBirth 업데이트 함수
  const updateUserBirth = (year: number, month: number, day: number) => {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setUserBirth(formattedDate);
  };

  // 월에 따른 일 수 계산
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate(); // 0일은 해당 월의 마지막 날
  };

  // 유효성 검사
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
    setIsBirthError(false); // 에러가 없으면 초기화
    return true;
  };

  // 화살표 버튼 핸들러
  const incrementValue = (type: "year" | "month" | "day") => {
    if (type === "year") {
      const newYear = year + 1;
      if (validateDate(newYear, month, day)) setYear(newYear);
    }
    if (type === "month") {
      const newMonth = month === 12 ? 1 : month + 1;
      if (validateDate(year, newMonth, day)) setMonth(newMonth);
    }
    if (type === "day") {
      const newDay = day === getDaysInMonth(year, month) ? 1 : day + 1;
      if (validateDate(year, month, newDay)) setDay(newDay);
    }
  };

  const decrementValue = (type: "year" | "month" | "day") => {
    if (type === "year") {
      const newYear = year - 1;
      if (validateDate(newYear, month, day)) setYear(newYear);
    }
    if (type === "month") {
      const newMonth = month === 1 ? 12 : month - 1;
      if (validateDate(year, newMonth, day)) setMonth(newMonth);
    }
    if (type === "day") {
      const newDay = day === 1 ? getDaysInMonth(year, month) : day - 1;
      if (validateDate(year, month, newDay)) setDay(newDay);
    }
  };

  // 입력 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "year" | "month" | "day",
  ) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;

    if (type === "year" && validateDate(value, month, day)) setYear(value);
    if (type === "month" && validateDate(year, value, day)) setMonth(value);
    if (type === "day" && validateDate(year, month, value)) setDay(value);
  };

  // 값이 변경될 때마다 userBirth 업데이트
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
              value={year}
              onChange={(e) => handleInputChange(e, "year")}
              className={styles.input}
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
              value={month}
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
              value={day}
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
