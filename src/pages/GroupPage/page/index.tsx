import styles from "./groupPage.module.scss";
import { useState } from "react";
import GroupOptions from "../components/GroupOptions";
import { useNavigate, useParams } from "react-router-dom";
import TodayScheduleList from "../components/TodayScheduleList";
import GroupScheduleCalendar from "../components/GroupScheduleCalendar";
import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";
import { useGetGroupTodaySchedules } from "@api/group/getGroupTodaySchedules";
import useAuthStore from "@store/useAuthStore";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, format } from "date-fns";
import { useGetGroupCalendarSchedules } from "@api/group/getGroupCalendarSchedules";

const iconOptionsTitle = ["정산하기", "그룹 달력", "게시물", "멤버", "채팅"];

const GroupPage = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 달력에 표시될 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 달력에 표시될 현재 달의 마지막 날짜가 포함된 주의 끝 날짜
  const [groupInfo, setGroupInfo] = useState({
    name: "춘천팟",
    isPin: true,
  });
  const { accessToken } = useAuthStore.getState();
  const { groupId } = useParams<{ groupId: string }>();
  const { data: groupTodaySchedules } = useGetGroupTodaySchedules(groupId!, accessToken);
  const { data: groupCalendarSchedules } = useGetGroupCalendarSchedules(
    groupId!,
    accessToken,
    format(startDate, "yyyy-MM-dd"),
    format(endDate,"yyyy-MM-dd")
  );

  const handleBookMarkClick = () => {
    // api 연동 로직 작성해야함
    setGroupInfo((prevGroupInfo) => ({
      ...prevGroupInfo,
      isPin: !prevGroupInfo.isPin,
    }));
  };

  const handleCreateSchedule = () => {
    navigate(`/group/${groupId}/calendar/createSchedule`);
  };

  const handleCalendarClick = () => {
    navigate(`/group/${groupId}/groupCalendar`);
  };

  return (
    <div className={styles.mainContainer}>
      <HasTwoIconHeader
        backgroundColor="purple"
        title={groupTodaySchedules!.groupName}
        rightType="star"
        isPin={groupInfo.isPin}
        groupId={Number(groupId!)}
        handleLeftClick={() => navigate(-1)}
        handleRightClick={handleBookMarkClick}
      />
      <div className={styles.contentContainer}>
        <div className={styles.iconSection}>
          {iconOptionsTitle.map((title) => (
            <GroupOptions title={title} groupId={groupId!} key={title} />
          ))}
        </div>
        <div className={styles.buttonSection} onClick={handleCreateSchedule}>
          일정 생성하기
        </div>
        <div className={styles.todayScheduleList}>
          <TodayScheduleList todayScheduleList={groupTodaySchedules?.todaySchedules} groupId={Number(groupId!)} />
        </div>
        <div className={styles.groupCalendar}>
          <GroupScheduleCalendar groupSchedules={groupCalendarSchedules!.groupSchedules} onClick={handleCalendarClick} currentDate={currentDate} startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
