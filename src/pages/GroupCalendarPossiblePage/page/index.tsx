import React, { useEffect, useState } from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import styles from "./groupCalendarPossible.module.scss";
import TabComponent from "../components/TabComponent";
import PossibleMember from "../components/PossibleMember";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "@store/useAuthStore";
import { useGetGroupCalendarCheckEvents } from "@api/calendar/getGroupCalendarCheckEvents";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const GroupAvailableData: IGetGroupAvailableDatesCalendarResponseBodyType = {
  availableDateRatios: [
    { date: "2025-02-01", ratio: 15.3333 },
    {
      date: "2025-02-12",
      ratio: 27.0,
    },
    {
      date: "2025-02-20",
      ratio: 55.24,
    },
    {
      date: "2025-02-28",
      ratio: 75.9666,
    },
  ],
};

const GroupCalendarPossiblePage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));
  const formattedDate = format(new Date(selectedDate), "M월 d일 (E)", { locale: ko });
  const navigate = useNavigate();

  const { data: groupCheckEvents } = useGetGroupCalendarCheckEvents(
    groupId!,
    format(currentMonth, "yyyy-MM"),
    accessToken,
  );

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className={styles.Container}>
      <CalendarHeader
        title="가능한 날짜 보기"
        handleClick={() => {
          navigate(-1);
        }}
      />
      <div className={styles.ContentContainer}>
        <Calendar
          type="groupPossible"
          scheduleData={groupCheckEvents?.groupScheduleData}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          groupAvailableDates={GroupAvailableData.availableDateRatios}
          setSelectedDate={setSelectedDate}
        />
        <div className={styles.InfoBox}>
          <p className={styles.Date}>{formattedDate}</p>
          <PossibleMember
            possibleMembers={[
              "이수현",
              "이다은",
              "정재호",
              "최준준혁",
              "정재호",
              "최준혁",
              "정재호",
              "최준혁",
            ]}
          />
        </div>
        <div className={styles.TabBox}>
          <TabComponent />
        </div>
      </div>
    </div>
  );
};

export default GroupCalendarPossiblePage;
