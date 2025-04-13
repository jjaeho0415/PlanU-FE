import { useGetMyAvailableDates } from "@api/calendar/getMyAvailableDates";
import { useGetMyCalendarCheckEvents } from "@api/calendar/getMyCalendarCheckEvents";
import { postMyAvailableDates } from "@api/calendar/postMyAvailableDates";
import EditButton from "@components/buttons/DefaultButton";
import Calendar from "@components/calendar/Calendar";
import EventCard from "@components/calendarPage/EventCard";
import CalendarHeader from "@components/headers/HasOnlyBackArrowHeader";
import Footer from "@components/nav-bar/BottomNavBar";
import { useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./myCalendarPossible.module.scss";

interface IScheduleItem {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  color: string;
  groupId: string;
}

const MyCalendarPossiblePage: React.FC = () => {
  const navigate = useNavigate();
  const { username = "" } = useParams<{ username: string }>();

  const [isEditing, setIsEditing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const startDate = format(startOfMonth(currentMonth), "yyyy-MM-dd");
  const endDate = format(endOfMonth(currentMonth), "yyyy-MM-dd");
  const yearMonth = format(currentMonth, "yyyy-MM");

  const raw = localStorage.getItem("auth-storage");
  const token = raw ? JSON.parse(raw).state.accessToken : "";

  const { data: fetchedAvailableDates = [] } = useGetMyAvailableDates(token, {
    startDate,
    endDate,
  });

  const { data: rawCheckEvents = [] } = useGetMyCalendarCheckEvents(username, yearMonth, token);
  const checkEvents = rawCheckEvents as {
    date: string;
    hasSchedule: boolean;
    hasBirthday: boolean;
    schedules?: IScheduleItem[];
  }[];

  useEffect(() => {
    if (!isEditing && fetchedAvailableDates.length > 0) {
      setAvailableDates(fetchedAvailableDates);
    }
  }, [fetchedAvailableDates, isEditing]);

  const queryClient = useQueryClient();

  const handleSaveAvailableDates = async () => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const filtered = availableDates.filter((date) => date >= today);
      await postMyAvailableDates(token, filtered);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["MY_AVAILABLE_DATES"] });
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleData: IScheduleType[] = checkEvents.map((event) => ({
    date: event.date,
    isSchedule: event.hasSchedule,
    isBirthday: event.hasBirthday,
    schedules: [],
    isGroupSchedule: false,
  }));
  const selectedEvents = checkEvents.find((e) => e.date === selectedDate);

  return (
    <div className={styles.page}>
      <CalendarHeader title="가능한 날짜 선택" handleClick={() => navigate(-1)} />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="myPossible"
            availableDates={availableDates}
            setAvailableDates={setAvailableDates}
            scheduleData={scheduleData}
            setSelectedDate={setSelectedDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            isEditing={isEditing}
          />
        </div>

        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeader}>
            {format(new Date(selectedDate), "M월 d일 (E)", { locale: ko })}
          </div>
          <div className={styles.subText}>오늘 나의 스케줄</div>

          {selectedEvents && selectedEvents.schedules && selectedEvents.schedules.length > 0 ? (
            selectedEvents.schedules.map((item) => <EventCard key={item.id} scheduleItem={item} />)
          ) : (
            <div className={styles.noSchedule}>일정이 없습니다.</div>
          )}
        </div>

        <div className={styles.editButton}>
          <EditButton
            buttonText={isEditing ? "완료" : "수정하기"}
            onClick={isEditing ? handleSaveAvailableDates : () => setIsEditing((prev) => !prev)}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyCalendarPossiblePage;
