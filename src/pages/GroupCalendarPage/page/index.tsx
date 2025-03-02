import EditIcon from "@assets/Icons/myCalendar/EditIcon.svg?react";
import React, { useState } from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/CalendarHeader";
import styles from "./groupCalendarPage.module.scss";
import EventCard from "@components/calendarPage/EventCard";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "@store/useAuthStore";
import { useGetGroupCalendarCheckEvents } from "@api/calendar/getGroupCalendarCheckEvents";
import { format } from "date-fns";
import { useGetGroupScheduleList } from "@api/calendar/getGroupScheduleList";
import { ko } from "date-fns/locale";

const GroupCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore.getState();
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));

  const { data: groupCheckEvents } = useGetGroupCalendarCheckEvents(
    groupId!,
    format(currentMonth, "yyyy-MM"),
    accessToken,
  );

  const { data: groupScheduleList } = useGetGroupScheduleList(groupId!, accessToken, selectedDate)
  const formattedDate = format(new Date(selectedDate), "M월 d일 (E)", { locale: ko });

  const handleBackArrowClick = () => {
    navigate(-1);
  };
  const handleMiniCalendarClick = () => {
    navigate(`/group/${groupId}/groupCalendar/possible`);
  };

  const handleGoCreateGroupSchedule = () => {
    navigate(`/createSchedule/${groupId}`);
  };

  return (
    <div className={styles.Container}>
      <CalendarHeader
        title="그룹 달력"
        type="group"
        handleBackArrowClick={handleBackArrowClick}
        handleMiniCalendarClick={handleMiniCalendarClick}
      />
      <div className={styles.calendarSection}>
        <Calendar type="view" scheduleData={groupCheckEvents?.groupScheduleData} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} setSelectedDate={setSelectedDate} />
      </div>
      <div className={styles.content}>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>{formattedDate}</h1>
            <EditIcon className={styles.editIcon} onClick={handleGoCreateGroupSchedule} />
          </div>
          <div className={styles.cardSection}>
            {groupScheduleList?.schedules.map((scheduleItem) => (
              <EventCard scheduleItem={scheduleItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCalendarPage;
