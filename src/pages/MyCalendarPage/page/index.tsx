import { useGetMyCalendarCheckEvents } from "@api/calendar/getMyCalendarCheckEvents";
import { useGetMyScheduleList } from "@api/calendar/getMyScheduleList";
import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import BirthdayCard from "@components/calendarPage/BirthdayCard";
import EventCard from "@components/calendarPage/EventCard";
import useAuthStore from "@store/useAuthStore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/CalendarHeader";
import Footer from "../../../components/nav-bar/BottomNavBar";
import styles from "./myCalendarPage.module.scss";
import { useGetUserInfo } from "@api/user/getUserInfo";
import useUserLocation from "@store/useUserLocation";

const MyCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username?: string }>();
  const { accessToken } = useAuthStore.getState();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const formattedDate = format(new Date(selectedDate), "M월 d일 (E)", { locale: ko });

  const userCurrentLatLng = useUserLocation();

  const { data: userInfo } = useGetUserInfo(accessToken);
  const usernameToUse = username || userInfo?.username
  const { data: myCheckEvents } = useGetMyCalendarCheckEvents(
    usernameToUse!,
    format(currentMonth, "yyyy-MM"),
    accessToken,
  );

  const { data: myScheduleList } = useGetMyScheduleList(usernameToUse!, accessToken, selectedDate);

  useEffect(() => {
    if (!userCurrentLatLng) {
      return;
    }
    // rest api로 사용자 현재 위치 정보 보내는 api 호출 로직 추가해야함

  }, [userCurrentLatLng])

  const handleMiniCalendarClick = () => {
    navigate("/myCalendar/possible");
  };
  const handleGoCreateSchedule = () => {
    navigate("/createSchedule/my");
  };
  return (
    <div className={styles.Container}>
      <CalendarHeader
        title={username ? `${username}님의 달력` : "나의 달력" }
        type="my"
        handleMiniCalendarClick={handleMiniCalendarClick}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="view"
            scheduleData={myCheckEvents?.myScheduleData}
            setSelectedDate={setSelectedDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>{formattedDate}</h1>
            <EditIcon className={styles.editIcon} onClick={handleGoCreateSchedule} />
          </div>
          <div className={styles.subText}>나의 스케줄</div>
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
                    <EventCard scheduleItem={scheduleItem} key={scheduleItem.id} />
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
