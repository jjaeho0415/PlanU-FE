import { useGetMyAvailableDates } from "@api/calendar/getMyAvailableDates";
import { useGetMyCalendarCheckEvents } from "@api/calendar/getMyCalendarCheckEvents";
import { useGetMyScheduleList } from "@api/calendar/getMyScheduleList";
import { postMyAvailableDates } from "@api/calendar/postMyAvailableDates";
import { useGetUserInfo } from "@api/user/getUserInfo";
import EditButton from "@components/buttons/DefaultButton";
import Calendar from "@components/calendar/Calendar";
import EventCard from "@components/calendarPage/EventCard";
import type { IScheduleItemType } from "@components/calendarPage/EventCard";
import BirthdayCard from "@components/calendarPage/BirthdayCard";
import CalendarHeader from "@components/headers/HasOnlyBackArrowHeader";
import Footer from "@components/nav-bar/BottomNavBar";
import { useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./myCalendarPossible.module.scss";

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

  const { data: userInfo } = useGetUserInfo(token);
  const usernameToUse = username || userInfo?.username;

  const { data: myCheckEvents } = useGetMyCalendarCheckEvents(usernameToUse!, yearMonth, token);

  const { data: myScheduleList } = useGetMyScheduleList(usernameToUse!, token, selectedDate);

  const { data: fetchedAvailableDates = [] } = useGetMyAvailableDates(token, {
    startDate,
    endDate,
  });

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

  const scheduleData = myCheckEvents?.myScheduleData ?? [];

  const mySchedule = myScheduleList as {
    schedules: IScheduleItemType[];
    birthdayPerson: string[];
  };

  return (
    <div className={styles.page}>
      <CalendarHeader title="가능한 날짜 선택" handleClick={() => navigate(-1)} />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="myPossible"
            availableDates={availableDates}
            setAvailableDates={setAvailableDates}
            scheduleData={scheduleData.length > 0 ? scheduleData : undefined}
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

          <div className={styles.cardSection}>
            {mySchedule?.schedules.length === 0 && mySchedule?.birthdayPerson.length === 0 ? (
              <div className={styles.noSchedule}>일정이 없습니다.</div>
            ) : (
              <>
                {mySchedule?.birthdayPerson.map((name, index) => (
                  <BirthdayCard birthdayName={name} key={name + index} />
                ))}
                {mySchedule?.schedules.map((item) => (
                  <EventCard key={item.id} scheduleItem={item} />
                ))}
              </>
            )}
          </div>
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
