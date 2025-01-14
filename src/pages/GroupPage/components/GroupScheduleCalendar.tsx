import { getFormattedLocation } from "../../../utils/truncation";
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
  getDay,
} from "date-fns";
import {DAY_LIST, HOLIDAYS} from "../../../constants/holidays";

interface Props {
  groupSchedules: IGroupSchedulesType[];
  onClick: () => void;
}

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

  const isHoliday = (date: Date): boolean => {
    const formattedDate = format(date, "MM-dd"); // MM-DD 형식으로 변환
    return HOLIDAYS.includes(formattedDate);
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
          const dayOfWeek = getDay(date);
          const dateNumberStyle = isHoliday(date)
            ? { color: "#ff0000" }
            : dayOfWeek === 0 // 일요일
              ? { color: "#ff0000" }
              : dayOfWeek === 6 // 토요일
                ? { color: "#2079ff" }
                : {};

          return (
            <div
              key={index}
              className={`${styles.dateCell} ${isSameMonth(date, currentDate) ? "" : styles.grayText}`}
              style={{
                opacity: isSameMonth(date, currentDate) ? "1" : "0.5", 
              }}
            >
              <span className={styles.dateNumber} style={dateNumberStyle}>
                {format(date, "d")}
              </span>
              <div className={styles.scheduleContainer}>
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className={styles.schedule}
                    style={{
                      backgroundColor: schedule.color,
                      opacity: isSameMonth(date, currentDate) ? "1" : "0.5",
                    }}
                  >
                    {getFormattedLocation(schedule.title)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupScheduleCalendar;
