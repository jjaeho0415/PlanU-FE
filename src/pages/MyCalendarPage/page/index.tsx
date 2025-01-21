import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import React, { useState } from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/CalendarHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import styles from "./myCalendarPage.module.scss";
import EventCard from "@components/calendarPage/EventCard";
import { useNavigate } from "react-router-dom";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const MyCalendarPage: React.FC = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const navigate = useNavigate();

  const scheduleData: IGetScheduleType[] = [
    { date: "2025-01-04", isSchedule: true, isBirthday: false },
    { date: "2025-01-13", isSchedule: false, isBirthday: true },
    { date: "2025-01-16", isSchedule: true, isBirthday: true },
    { date: "2025-01-26", isSchedule: true, isBirthday: false },
  ];

  const handleMiniCalendarClick = () => {
    navigate("/myCalendarPossible");
  };

  return (
    <div className={styles.page}>
      <CalendarHeader
        title="나의 달력"
        type="my"
        handleMiniCalendarClick={handleMiniCalendarClick}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="view"
            availableDates={availableDates}
            setAvailableDates={setAvailableDates}
            scheduleData={scheduleData}
          />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>1월 16일 (목)</h1>
            <EditIcon className={styles.editIcon} />
          </div>
          <div className={styles.subText}>나의 스케줄</div>
          <EventCard
            time="19:00 ~ 20:00"
            title="수현이의 생일파티"
            location="홍대입구역 2번 출구 앞"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCalendarPage;
