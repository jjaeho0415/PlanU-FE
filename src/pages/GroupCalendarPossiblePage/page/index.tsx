import React, { useState } from "react";
import EditButton from "../../../components/buttons/DefaultButton";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import styles from "./groupCalendarPossible.module.scss";
import EventCard from "@components/calendarPage/EventCard";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const GroupCalendarPossiblePage: React.FC = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const scheduleData: IGetScheduleType[] = [
    { date: "2025-01-04", isSchedule: true, isBirthday: false },
    { date: "2025-01-13", isSchedule: false, isBirthday: true },
    { date: "2025-01-16", isSchedule: true, isBirthday: true },
    { date: "2025-01-26", isSchedule: true, isBirthday: false },
  ];

  return (
    <div className={styles.page}>
      <CalendarHeader
        title="가능한 날짜 보기"
        handleClick={() => {
          return;
        }}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="groupPossible"
            availableDates={availableDates}
            setAvailableDates={setAvailableDates}
            scheduleData={scheduleData}
          />
        </div>
        <div className={styles.scheduleSection}></div>
      </div>

      <Footer />
    </div>
  );
};

export default GroupCalendarPossiblePage;
