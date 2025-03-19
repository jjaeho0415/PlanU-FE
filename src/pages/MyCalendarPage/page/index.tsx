import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import React, { useState } from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/CalendarHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import styles from "./myCalendarPage.module.scss";
import EventCard from "@components/calendarPage/EventCard";
import { useNavigate } from "react-router-dom";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import BirthdayCard from "@components/calendarPage/BirthdayCard";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const scheduleData: IGetScheduleType[] = [
  { date: "2025-03-04", isSchedule: true, isBirthday: false },
  { date: "2025-03-13", isSchedule: false, isBirthday: true },
  { date: "2025-03-16", isSchedule: true, isBirthday: true },
  { date: "2025-03-26", isSchedule: true, isBirthday: false },
];

const scheduleList: IGetScheduleListResponseBodyType = {
  schedules: [
    {
      id: 1,
      groupId: 1,
      title: "Weekly Meeting",
      location: "Library Room A",
      startTime: "10:00",
      endTime: "12:00",
      color: "#FF5733",
    },
    {
      id: 2,
      groupId: null,
      title: "회의 일정",
      location: "강원 춘천시 백령로 51",
      startTime: "10:00",
      endTime: "12:59",
      color: "#FFA500",
    },
    {
      id: 3,
      groupId: null,
      title: "프로젝트 회의",
      location: "강원 춘천시 백령로 51",
      startTime: "13:00",
      endTime: "15:59",
      color: "#FFA500",
    },
    {
      id: 4,
      groupId: 1,
      title: "Project Discussion",
      location: "Conference Room B",
      startTime: "14:00",
      endTime: "15:30",
      color: "#33FF57",
    },
  ],
  birthdayPerson: ["최준혁", "김도하"],
};

const MyCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const formattedDate = format(new Date(selectedDate), "M월 d일 (E)", { locale: ko });

  const handleMiniCalendarClick = () => {
    navigate("/myCalendar/possible");
  };

  return (
    <div className={styles.Container}>
      <CalendarHeader
        title="나의 달력"
        type="my"
        handleMiniCalendarClick={handleMiniCalendarClick}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="view"
            scheduleData={scheduleData}
            setSelectedDate={setSelectedDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>{formattedDate}</h1>
            <EditIcon
              className={styles.editIcon}
              onClick={() => {
                navigate("/createSchedule/my");
              }}
            />
          </div>
          <div className={styles.subText}>나의 스케줄</div>
          <div className={styles.cardSection}>
            {scheduleList?.schedules.length === 0 && scheduleList?.birthdayPerson.length === 0 ? (
              <div className={styles.noEventCardSection}>일정이 없습니다.</div>
            ) : (
              scheduleList && (
                <>
                  {scheduleList.birthdayPerson.map((birthdayName,index) => (
                    <BirthdayCard birthdayName={birthdayName} key={birthdayName + index} />
                  ))}
                  {scheduleList.schedules.map((scheduleItem) => (
                    <EventCard scheduleItem={scheduleItem} key={scheduleItem.id}/>
                  ))}
                </>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCalendarPage;
