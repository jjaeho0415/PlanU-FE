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
      id: 1,
      groupId: null,
      title: "회의 일정",
      location: "강원 춘천시 백령로 51",
      startTime: "10:00",
      endTime: "12:59",
      color: "#FFA500",
    },
    {
      id: 2,
      groupId: null,
      title: "프로젝트 회의",
      location: "강원 춘천시 백령로 51",
      startTime: "13:00",
      endTime: "15:59",
      color: "#FFA500",
    },
    {
      id: 2,
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

const GroupCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore.getState();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { data: groupCheckEvents } = useGetGroupCalendarCheckEvents(
    groupId!,
    format(currentMonth, "yyyy-MM"),
    accessToken,
  );

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
        <Calendar type="view" scheduleData={groupCheckEvents?.groupScheduleData} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
      </div>
      <div className={styles.content}>
        <div className={styles.scheduleSection}>
          <div className={styles.scheduleHeaderContainer}>
            <h1 className={styles.scheduleHeader}>1월 16일 (목)</h1>
            <EditIcon className={styles.editIcon} onClick={handleGoCreateGroupSchedule} />
          </div>
          <div className={styles.cardSection}>
            {scheduleList.schedules.map((scheduleItem) => (
              <EventCard scheduleItem={scheduleItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCalendarPage;
