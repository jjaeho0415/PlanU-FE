import { useGetMyAvailableDates } from "@api/calendar/getMyAvailableDates";
import { useGetMyCalendarCheckEvents } from "@api/calendar/getMyCalendarCheckEvents";
import { useGetMyScheduleList } from "@api/calendar/getMyScheduleList";
import { usePostMyAvailableDates } from "@api/calendar/postMyAvailableDates";
import { useGetUserInfo } from "@api/user/getUserInfo";
import EditButton from "@components/buttons/DefaultButton";
import Calendar from "@components/calendar/Calendar";
import EventCard from "@components/calendarPage/EventCard";
import BirthdayCard from "@components/calendarPage/BirthdayCard";
import CalendarHeader from "@components/headers/HasOnlyBackArrowHeader";
import Footer from "@components/nav-bar/BottomNavBar";
import { useQueryClient } from "@tanstack/react-query";
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./myCalendarPossible.module.scss";
import useAuthStore from "@store/useAuthStore";
import toast from "react-hot-toast";

const MyCalendarPossiblePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const startDate = format(startOfWeek(startOfMonth(currentMonth)), "yyyy-MM-dd");
  const endDate = format(endOfWeek(endOfMonth(currentMonth)), "yyyy-MM-dd");
  const yearMonth = format(currentMonth, "yyyy-MM");

  const { accessToken } = useAuthStore.getState();

  const { data: userInfo } = useGetUserInfo(accessToken);

  const { data: myCheckEvents } = useGetMyCalendarCheckEvents(
    userInfo?.username!,
    yearMonth,
    accessToken,
  );

  const { data: myScheduleList } = useGetMyScheduleList(
    userInfo?.username!,
    accessToken,
    selectedDate,
  );

  const { data: availableDatesList } = useGetMyAvailableDates(accessToken, startDate, endDate);

  useEffect(() => {
    if (availableDatesList) {
      setAvailableDates((prev) => {
        const merged = Array.from(new Set([...prev, ...availableDatesList]));
        return merged;
      });
    }
  }, [availableDatesList]);

  const postAvailableDatesList = usePostMyAvailableDates(accessToken);

  const queryClient = useQueryClient();

  const handleSaveAvailableDates = async () => {
    postAvailableDatesList.mutate(availableDates, {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["MY_AVAILABLE_DATES", startDate, endDate] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className={styles.container}>
      <CalendarHeader title="가능한 날짜 선택" handleClick={() => navigate(-1)} />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="myPossible"
            availableDates={availableDates}
            setAvailableDates={setAvailableDates}
            scheduleData={myCheckEvents?.myScheduleData}
            setSelectedDate={setSelectedDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            isEditing={isEditing}
          />
        </div>
        <div className={styles.editButton}>
          <EditButton
            buttonText={isEditing ? "완료" : "수정하기"}
            onClick={isEditing ? handleSaveAvailableDates : () => setIsEditing((prev) => !prev)}
          />
        </div>

        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeader}>
            {format(new Date(selectedDate), "M월 d일 (E)", { locale: ko })}
          </div>
          <div className={styles.subText}>오늘 나의 스케줄</div>

          <div className={styles.cardSection}>
            {myScheduleList?.schedules.length === 0 &&
            myScheduleList?.birthdayPerson.length === 0 ? (
              <div className={styles.noEventCardSection}>일정이 없습니다.</div>
            ) : (
              myScheduleList && (
                <>
                  {myScheduleList.birthdayPerson.map((birthdayName, index) => (
                    <BirthdayCard birthdayName={birthdayName} key={birthdayName + index} />
                  ))}
                  {myScheduleList.schedules.map((scheduleItem) => (
                    <EventCard
                      scheduleItem={scheduleItem}
                      key={scheduleItem.id}
                      groupId={scheduleItem.groupId}
                      isFriendEvent={false}
                    />
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

export default MyCalendarPossiblePage;
