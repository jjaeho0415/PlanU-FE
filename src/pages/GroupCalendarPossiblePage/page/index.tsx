import React, { useState } from "react";
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
import { useGetGroupAvailableDatesCalendar } from "@api/calendar/getGroupAvailableDatesCalendar";
import { useGetGroupAvailableDatesMemberList } from "@api/calendar/getGroupAvailableDatesMemberList";
import { useGetGroupAvailableDatesMemberInfos } from "@api/calendar/getGroupAvailableDatesMemberInfos";
import { useGetGroupAvailableDatesDateInfo } from "@api/calendar/getGroupAvailableDatesDateInfo";
import { useGetGroupAvailableDatesRanks } from "@api/calendar/getGroupAvailableDatesRanks";

const GroupCalendarPossiblePage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(format(currentDate, "yyyy-MM-dd"));
  const formattedDate = format(new Date(selectedDate), "M월 d일 (E요일)", { locale: ko });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"멤버별" | "날짜별" | "순위">("멤버별");

  const tabs = [
    { tabName: "멤버별", onClick: () => setActiveTab("멤버별") },
    { tabName: "날짜별", onClick: () => setActiveTab("날짜별") },
    { tabName: "순위", onClick: () => setActiveTab("순위") },
  ];

  // 그룹 달력 일정 유무 조회
  const { data: groupCheckEvents } = useGetGroupCalendarCheckEvents(
    groupId!,
    format(currentMonth, "yyyy-MM"),
    accessToken,
  );

  // 가능한 날짜(달력)
  const { data: groupAvailableDatesCalendar } = useGetGroupAvailableDatesCalendar(
    groupId!,
    accessToken,
    format(currentMonth, "yyyy-MM"),
  );

  // 가능한 날짜(해당 날짜 가능한 멤버 리스트)
  const { data: groupAvailableDatesMemberList } = useGetGroupAvailableDatesMemberList(
    groupId!,
    accessToken,
    selectedDate,
  );

  // 가능한 날짜(멤버별)
  const { data: groupAvailableDatesMemberInfos } = useGetGroupAvailableDatesMemberInfos(
    groupId!,
    accessToken,
    format(currentMonth, "yyyy-MM"),
    activeTab,
  );

  // 가능한 날짜(날짜별)
  const { data: groupAvailableDatesDateInfo } = useGetGroupAvailableDatesDateInfo(
    groupId!,
    accessToken,
    format(currentMonth, "yyyy-MM"),
    activeTab,
  );

  // 가능한 날짜(순위)
  const { data: groupAvailableDatesRanks } = useGetGroupAvailableDatesRanks(
    groupId!,
    accessToken,
    format(currentMonth, "yyyy-MM"),
    activeTab,
  );

  // 그룹 총 인원 수
  const groupTotalNumber = 8;

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
          groupAvailableDates={groupAvailableDatesCalendar?.availableDateRatios}
          setSelectedDate={setSelectedDate}
        />
        <div className={styles.InfoBox}>
          <p className={styles.Date}>{formattedDate}</p>
          <PossibleMember possibleMemberList={groupAvailableDatesMemberList} />
        </div>
        <div className={styles.TabBox}>
          <TabComponent
            activeTab={activeTab}
            tabs={tabs}
            availableDateInfos={groupAvailableDatesDateInfo?.availableDateInfos}
            availableDateRanks={groupAvailableDatesRanks?.availableDateRanks}
            availableMemberInfos={groupAvailableDatesMemberInfos?.availableMemberInfos}
            groupTotalNumber={groupTotalNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCalendarPossiblePage;
