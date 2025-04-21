import React from "react";
import styles from "./Boxes.module.scss";
import useScheduleStore from "@store/useScheduleStore";
import { format } from "date-fns";

const TimeBox: React.FC = () => {
  const { startDate, endDate } = useScheduleStore();

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${hours}:${minutes}`;
  }
  const formattedStartDate = formatDate(format(startDate, "yyyy-MM-dd HH:mm"));
  const formattedEndDate = formatDate(format(endDate, "yyyy-MM-dd HH:mm"));

  return (
    <div className={styles.TimeContainer}>
      <div className={styles.TimeBoxTop}>
        <p>시작</p>
        <p className={styles.Time}>{formattedStartDate}</p>
      </div>
      <div className={styles.TimeBoxBottom}>
        <p>종료</p>
        <p className={styles.Time}>{formattedEndDate}</p>
      </div>
    </div>
  );
};

export default TimeBox;
