import React, { JSX } from "react";
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
  startOfDay,
  isAfter,
} from "date-fns";
import styles from "./Calendar.module.scss";
import ArrowIcon from "@assets/Icons/arrow/RightArrow.svg?react";
import IsScheduleIcon from "@assets/Icons/calendar/isScheduleIcon.svg?react";
import IsBirthdayIcon from "@assets/Icons/calendar/isBirthdayIcon.svg?react";
import { DAY_LIST, HOLIDAYS } from "../../constants/holidays";

interface Props {
  type: "view" | "myPossible" | "groupPossible";
  availableDates?: string[];
  setAvailableDates?: React.Dispatch<React.SetStateAction<string[]>>;
  scheduleData: IGroupScheduleType[] | undefined;
  groupAvailableDates?: IGroupAvailableDatesCalendarItemType[];
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar: React.FC<Props> = ({
  type,
  availableDates,
  setAvailableDates,
  scheduleData,
  groupAvailableDates,
  setSelectedDate,
  currentMonth,
  setCurrentMonth,
}) => {
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
      const today = startOfDay(new Date());
      const selectedDate = startOfDay(new Date(date));
      setSelectedDate(date);

      if (type === "myPossible" && !isAfter(today, selectedDate)) {
        setAvailableDates!((prev) => {
          if (prev.includes(date)) {
            return prev.filter((d) => d !== date);
          } else {
            return [...prev, date];
          }
        });
      }
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isToday = isSameDay(day, new Date());
        const isNotCurrentMonth = !isSameMonth(day, currentMonth);
        const formattedDate = format(day, "yyyy-MM-dd");
        const schedule = scheduleData?.find((item) => item.date === formattedDate);
        const isAvailable = availableDates?.includes(formattedDate);
        const groupAvailableDate = groupAvailableDates?.find((item) => item.date === formattedDate);

        let backgroundColor = "transparent";
        if (type === "myPossible" && isAvailable) {
          backgroundColor = "#C9ACE7";
        } else if (type === "groupPossible" && groupAvailableDate) {
          const possibleRatio = groupAvailableDate.ratio;
          if (possibleRatio > 0 && possibleRatio <= 25) {
            backgroundColor = "var(--people-50)";
          } else if (possibleRatio > 25 && possibleRatio <= 50) {
            backgroundColor = "var(--people-100)";
          } else if (possibleRatio > 50 && possibleRatio <= 75) {
            backgroundColor = "var(--people-200)";
          } else if (possibleRatio > 75 && possibleRatio <= 100) {
            backgroundColor = "var(--people-300)";
          }
        } else if (isToday) {
          backgroundColor = "#F1F3F5";
        }

        const isHoliday = HOLIDAYS.includes(format(day, "MM-dd"));
        const isSunday = format(day, "i") === "7";
        const isClickable =
          type === "myPossible" && !isAfter(startOfDay(new Date()), startOfDay(day));
        const isGroupClickable = type === "groupPossible";

        days.push(
          <div
            key={formattedDate}
            className={styles.dateCell}
            onClick={() => handleDateClick(formattedDate)}
            style={{
              cursor: isClickable || isGroupClickable || type === "view" ? "pointer" : "default",
              color: isNotCurrentMonth ? "#767676" : isSunday || isHoliday ? "#FF0101" : "#111111",
              backgroundColor,
              borderRadius: isToday || isAvailable || groupAvailableDate ? "50%" : "0",
              fontWeight: isToday ? "bold" : "500",
            }}
          >
            {format(day, "d")}
            <div className={styles.icons}>
              {schedule?.isSchedule && <IsScheduleIcon width={6} height={6} />}
              {schedule?.isBirthday && <IsBirthdayIcon width={6} height={6} />}
            </div>
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

export default Calendar;
