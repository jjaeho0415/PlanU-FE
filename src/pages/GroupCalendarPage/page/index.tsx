import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import React from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/CalendarHeader";
import styles from "./groupCalendarPage.module.scss";
import EventCard from "@components/calendarPage/EventCard";
import { useNavigate } from "react-router-dom";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const scheduleData: IGetScheduleType[] = [
  { date: "2025-01-04", isSchedule: true, isBirthday: false },
  { date: "2025-01-13", isSchedule: false, isBirthday: true },
  { date: "2025-01-16", isSchedule: true, isBirthday: true },
  { date: "2025-01-26", isSchedule: true, isBirthday: false },
];

const GroupCalendarPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackArrowClick = () => {
    navigate("/group/1");
  };
  const handleMiniCalendarClick = () => console.log();

  return (
    <div className={styles.Container}>
      <CalendarHeader
        title="그룹 달력"
        type="group"
        handleBackArrowClick={handleBackArrowClick}
        handleMiniCalendarClick={handleMiniCalendarClick}
      />
      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar type="view" scheduleData={scheduleData} />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>1월 16일 (목)</h1>
            <EditIcon className={styles.editIcon} />
          </div>
          <EventCard
            time="19:00 ~ 20:00"
            title="수현이의 생일파티"
            location="홍대입구역 2번 출구 앞"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCalendarPage;
