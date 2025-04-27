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
import { usePostUserLocationUpdate } from "@api/user/postUserLocationUpdate";

const MyCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { username, name } = useParams<{ username?: string; name?: string }>();
  const { accessToken } = useAuthStore.getState();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const formattedDate = format(new Date(selectedDate), "M월 d일 (E)", { locale: ko });

  const userCurrentLatLng = useUserLocation();

  const { mutate: updateUserLocationInfo } = usePostUserLocationUpdate(accessToken);

  useEffect(() => {
    if (userCurrentLatLng) {
      updateUserLocationInfo(userCurrentLatLng);
    }
  }, [userCurrentLatLng]);

  const { data: userInfo } = useGetUserInfo(accessToken);
  const usernameToUse = username || userInfo?.username;
  const { data: myCheckEvents } = useGetMyCalendarCheckEvents(
    usernameToUse!,
    format(currentMonth, "yyyy-MM"),
    accessToken,
  );

  const { data: myScheduleList } = useGetMyScheduleList(usernameToUse!, accessToken, selectedDate);

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    if (!userInfo.birthday) {
      window.location.replace(`${window.location.origin}/registerAccount`);
    }
  }, [userInfo]);

  const handleMiniCalendarClick = () => {
    navigate("/myCalendar/possible");
  };
  const handleGoCreateSchedule = () => {
    navigate("/createSchedule/my");
  };
  return (
    <div className={styles.Container}>
      <CalendarHeader
        title={name ? `${name}님의 달력` : "나의 달력"}
        type={name ? "friend" : "my"}
        handleMiniCalendarClick={handleMiniCalendarClick}
        handleBackArrowClick={() => {
          name && navigate(-1);
        }}
      />

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            type="view"
            scheduleData={myCheckEvents?.myScheduleData}
            setSelectedDate={setSelectedDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
          />
        </div>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>{formattedDate}</h1>
            {!name && <EditIcon className={styles.editIcon} onClick={handleGoCreateSchedule} />}
          </div>
          <div className={styles.subText}>{name ? `${name}님의 스케줄` : "나의 스케줄"}</div>
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
                      isFriendEvent={name ? true : false}
                    />
                  ))}
                </>
              )
            )}
          </div>
        </div>
      </div>
      {!name && <Footer />}
    </div>
  );
};

export default MyCalendarPage;
