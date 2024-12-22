import styles from "./groupScheduleCalendar.module.scss";

interface Props {
  groupSchedules: IGroupSchedulesType[];
}

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

const GroupScheduleCalendar: React.FC<Props> = ({ groupSchedules }) => {
  const renderCalendar = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth;
  };

  return <div>GroupScheduleCalendar</div>;
};

export default GroupScheduleCalendar;
