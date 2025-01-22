import React from "react";
import Calendar from "../../../components/calendar/Calendar";
import CalendarHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import styles from "./groupCalendarPossible.module.scss";
import TabComponent from "../components/TabComponent";
import PossibleMember from "../components/PossibleMember";

interface IGetScheduleType {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
}

const GroupCalendarPossiblePage: React.FC = () => {
  const scheduleData: IGetScheduleType[] = [
    { date: "2025-01-04", isSchedule: true, isBirthday: false },
    { date: "2025-01-13", isSchedule: false, isBirthday: true },
    { date: "2025-01-16", isSchedule: true, isBirthday: true },
    { date: "2025-01-26", isSchedule: true, isBirthday: false },
  ];

  return (
    <div className={styles.Container}>
      <CalendarHeader
        title="가능한 날짜 보기"
        handleClick={() => {
          return;
        }}
      />
      <div className={styles.ContentContainer}>
        <Calendar type="groupPossible" scheduleData={scheduleData} />
        <div className={styles.InfoBox}>
          <p className={styles.Date}>9월 19일 (목)</p>
          <PossibleMember
            possibleMembers={["이수현", "이다은", "정재호", "최준혁", "이상준", "김도하"]}
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
