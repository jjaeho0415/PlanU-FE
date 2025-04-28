import React, { JSX, useEffect, useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import styles from "./datePicker.module.scss";
import ArrowIcon from "@assets/Icons/arrow/RightArrow.svg?react";
import { DAY_LIST, HOLIDAYS } from "../../constants/holidays";
import useScheduleStore from "@store/useScheduleStore";
import toast from "react-hot-toast";

interface Props {
  isStartDay: boolean;
}

const DatePicker: React.FC<Props> = ({ isStartDay }) => {
  const { startDate, setStartDate, endDate, setEndDate, isAllDay } = useScheduleStore();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (isStartDay) {
      setSelectedDate(startDate);
    } else {
      setSelectedDate(endDate);
    }
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    if (isStartDay) {
      const updatedStartDate = new Date(selectedDate);
      updatedStartDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);
      setStartDate(updatedStartDate);
    } else {
      const updatedEndDate = new Date(selectedDate);
      updatedEndDate.setHours(endDate.getHours(), endDate.getMinutes(), 0, 0);
      setEndDate(updatedEndDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isAllDay) {
      setEndDate(startDate);
    } else if (!isAllDay && startDate.getDate() > endDate.getDate()) {
      toast.error("시작 시간이 종료 시간보다 늦을 수 없습니다.");
      setSelectedDate(startDate);
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const renderDays = () => {
    return (
      <div className={styles.dayRow}>
        {DAY_LIST.map((day, index) => (
          <div
            key={index}
            className={styles.day}
            style={{ color: index === 0 ? "#FF0101" : "#767676" }}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    const handleDateClick = (date: string) => {
      setSelectedDate(new Date(date));
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isSelectedDay = isSameDay(day, selectedDate);
        const isNotCurrentMonth = !isSameMonth(day, currentMonth);
        const formattedDate = format(day, "yyyy-MM-dd");

        let backgroundColor = "transparent";

        if (isSelectedDay) {
          backgroundColor = "#F1F3F5";
        }

        const isHoliday = HOLIDAYS.includes(format(day, "MM-dd"));
        const isSunday = format(day, "i") === "7";

        days.push(
          <div
            key={formattedDate}
            className={styles.dateCell}
            onClick={() => handleDateClick(formattedDate)}
            style={{
              cursor: "pointer",
              color: isNotCurrentMonth ? "#767676" : isSunday || isHoliday ? "#FF0101" : "#111111",
              backgroundColor,
              borderRadius: isSelectedDay ? "50%" : "0",
              fontWeight: isSelectedDay ? "bold" : "500",
            }}
          >
            {format(day, "d")}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className={styles.weekRow}>
          {days}
        </div>,
      );
      days = [];
    }

    return rows;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <ArrowIcon className={styles.leftArrow} width={6} height={11} onClick={handlePrevMonth} />
        <div className={styles.monthLabel}>{format(currentMonth, "yyyy년 M월")}</div>
        <ArrowIcon width={6} height={11} onClick={handleNextMonth} className={styles.rightArrow} />
      </div>
      {renderDays()}
      <div className={styles.calendarGrid}>{renderCells()}</div>
    </div>
  );
};

export default DatePicker;
