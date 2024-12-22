import { formatDate } from "../../../constants/formatDate";
import { getFormattedLocation } from "../../../constants/truncation";
import styles from "./groupScheduleCalendar.module.scss";

interface Props {
  groupSchedules: IGroupSchedulesType[];
  onClick: () => void;
}

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

const GroupScheduleCalendar: React.FC<Props> = ({ groupSchedules, onClick }) => {
  const renderCalendar = () => {
    const currentYear = new Date().getFullYear();

    const currentMonth = new Date().getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const prevMonthDaysToShow = firstDay;

    const totalCells = 35;
    const nextMonthDaysToShow = totalCells - (prevMonthDaysToShow + daysInMonth);

    const calendarCells = [];

    for (let i = prevMonthDaysToShow; i > 0; i++) {
      const day = daysInPrevMonth - i + 1;
      calendarCells.push(
        <div key={`prev-${day}`} className={`${styles.dataCell} ${styles.grayText}`}>
          <span className={styles.dateNumber}>{day}</span>
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = formatDate(new Date(currentYear, currentMonth, day));
      const daySchedules = groupSchedules.filter((schedule) => {
        return currentDate >= schedule.startDateTime && currentDate <= schedule.endDateTime;
      });

      console.log(daySchedules);

      calendarCells.push(
        <div key={`current-${day}`} className={styles.dateCell}>
          <span className={styles.dateNumber}>{day}</span>
          {daySchedules.map((schedule) => (
            <div
              key={schedule.id}
              className={styles.schedule}
              style={{ backgroundColor: schedule.color }}
            >
              {getFormattedLocation(schedule.title)}
            </div>
          ))}
        </div>,
      );
    }

    for (let day = 1; day <= nextMonthDaysToShow; day++) {
      calendarCells.push(
        <div key={`next-${day}`} className={`${styles.dateCell} ${styles.grayText}`}>
          <span className={styles.dateNumber}>{day}</span>
        </div>,
      );
    }

    return calendarCells;
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
      <div className={styles.calendarGrid}>{renderCalendar()}</div>
    </div>
  );
};

export default GroupScheduleCalendar;
