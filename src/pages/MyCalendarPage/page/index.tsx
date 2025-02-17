import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const scheduleData: IGetScheduleType[] = [
    { date: "2025-01-04", isSchedule: true, isBirthday: false },
    { date: "2025-01-13", isSchedule: false, isBirthday: true },
    { date: "2025-01-16", isSchedule: true, isBirthday: true },
    { date: "2025-01-26", isSchedule: true, isBirthday: false },
  ];

  const handleMiniCalendarClick = () => {
    navigate("/myCalendarPossible");
  };

  useEffect(() => {
    // selectedDate의 값이 변할때마다 해당 날짜 일정 조회하는 api 호출
  }, [selectedDate]);

  return (
    <div className={styles.page}>
      <CalendarHeader
        title="나의 달력"
        type="my"
        handleMiniCalendarClick={handleMiniCalendarClick}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar type="view" scheduleData={scheduleData} setSelectedDate={setSelectedDate} />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>1월 16일 (목)</h1>
            <EditIcon
              className={styles.editIcon}
              onClick={() => {
                navigate("/createSchedule/my");
              }}
            />
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
