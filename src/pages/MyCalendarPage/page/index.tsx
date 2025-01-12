import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import React, { useState } from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/CalendarHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import EventCard from "../components/EventCard";
import styles from "./myCalendarPage.module.scss";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const MyCalendarPage: React.FC = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const scheduleData: IGetScheduleType[] = [
    { date: "2025-01-04", isSchedule: true, isBirthday: false },
    { date: "2025-01-13", isSchedule: false, isBirthday: true },
    { date: "2025-01-16", isSchedule: true, isBirthday: true },
    { date: "2025-01-26", isSchedule: true, isBirthday: false },
  ];

  const handleBackArrowClick = () => console.log();
  const handleMiniCalendarClick = () => console.log();

  return (
    <div className={styles.page}>
      <CalendarHeader
        title="나의 달력"
        type="my"
        handleBackArrowClick={handleBackArrowClick}
        handleMiniCalendarClick={handleMiniCalendarClick}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="myPossible"
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
