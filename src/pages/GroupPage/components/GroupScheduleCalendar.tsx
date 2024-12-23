import { getFormattedLocation } from "../../../constants/truncation";
import styles from "./groupScheduleCalendar.module.scss";
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  isSameMonth,
  format,
  isWithinInterval,
  parseISO,
  isSameDay,
} from "date-fns";

interface Props {
  groupSchedules: IGroupSchedulesType[];
  onClick: () => void;
}

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

const GroupScheduleCalendar: React.FC<Props> = ({ groupSchedules, onClick }) => {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 달력에 표시될 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 달력에 표시될 현재 달의 마지막 날짜가 포함된 주의 끝 날짜

  const currentMonthData = () => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    console.log(monthArray);

    return monthArray;
  };
  const monthArray = currentMonthData();

  const getSchedulesForDate = (date: Date) => {
    return groupSchedules.filter((schedule) =>
      isWithinInterval(date, {
        start: parseISO(schedule.startDateTime),
        end: parseISO(schedule.endDateTime),
      }),
    );
  };

  return (
    <div className={styles.calendarContainer} onClick={onClick}>
      <div className={styles.dayHeaders}>
        {DAY_LIST.map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {monthArray.map((date, index) => {
          const schedules = getSchedulesForDate(date);
          return (
            <div
              key={index}
              className={`${styles.dateCell} ${isSameMonth(date, currentDate) ? "" : styles.grayText}`}
            >
              <span className={styles.dateNumber}>{format(date, "d")}</span>
              <div className={styles.scheduleContainer}>
                {schedules.map((schedule) => {
                  const isStartDate = isSameDay(date, parseISO(schedule.startDateTime));
                  return (
                    <div
                      key={schedule.id}
                      className={styles.schedule}
                      style={{
                        backgroundColor: schedule.color,
                        opacity: isSameMonth(date, currentDate) ? "1" : "0.5",
                      }}
                    >
                      {isStartDate && getFormattedLocation(schedule.title)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupScheduleCalendar;
