import React, { useEffect, useState } from "react";
import EditButton from "../../../components/buttons/DefaultButton";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import styles from "./myCalendarPossible.module.scss";
import EventCard from "@components/calendarPage/EventCard";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const MyCalendarPossiblePage: React.FC = () => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));

  const scheduleData: IGetScheduleType[] = [
    { date: "2025-01-04", isSchedule: true, isBirthday: false },
    { date: "2025-01-13", isSchedule: false, isBirthday: true },
    { date: "2025-01-16", isSchedule: true, isBirthday: true },
    { date: "2025-01-26", isSchedule: true, isBirthday: false },
  ];
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <div className={styles.page}>
      <CalendarHeader
        title="가능한 날짜 선택"
        handleClick={() => {
          navigate(-1);
        }}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="myPossible"
            availableDates={availableDates}
            setAvailableDates={setAvailableDates}
            scheduleData={scheduleData}
            setSelectedDate={setSelectedDate}
            currentMonth={currentDate}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeader}>1월 12일 (일)</div>
          <div className={styles.subText}>오늘 나의 스케줄</div>
          <EventCard
            scheduleItem={{
              startTime: "08:00",
              endTime: "12:00",
              title: "새벽 등산 3km 왕복 달리기/ 걷기",
              location: "제주 서귀포시 토평동 산 15-1",
              color: "var(--violet-350)",
              groupId: "",
              id: 1,
            }}
          />
          <EventCard
            scheduleItem={{
              startTime: "15:00",
              endTime: "21:00",
              title: "컴퓨터 수업 듣고 친구 만나기",
              location: "강원 춘천시 효자동 768-4",
              color: "var(--violet-400)",
              groupId: "",
              id: 2,
            }}
          />
        </div>
        <div className={styles.editButton}>
          <EditButton buttonText={isEditing ? "완료" : "수정하기"} onClick={handleEditClick} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyCalendarPossiblePage;
