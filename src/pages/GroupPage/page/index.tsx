import styles from "./groupPage.module.scss";
import { useState } from "react";
import GroupOptions from "../components/GroupOptions";
import { useNavigate, useParams } from "react-router-dom";
import TodayScheduleList from "../components/TodayScheduleList";
import GroupScheduleCalendar from "../components/GroupScheduleCalendar";
import HasTwoIconHeader from "@components/headers/HasTwoIconHeader";

const iconOptionsTitle = ["정산하기", "그룹 달력", "게시물", "멤버", "채팅"];

const todayScheduleList: ITodaySchedulesType[] = [
  {
    id: 1,
    title: "수현이 생일파티",
    startDateTime: "오후 7시",
    location: "홍대입구역 2번 출구",
  },
  {
    id: 2,
    title: "수현이 생일파티",
    startDateTime: "오후 8시",
    location: "강원대 후문",
  },
];

const groupSchedules: IGroupSchedulesType[] = [
  {
    id: 5,
    title: "술약",
    startDateTime: "2025-01-20",
    endDateTime: "2025-01-23",
    color: "#ec8ae3",
  },
  {
    id: 8,
    title: "01박 2일 제주도 여행",
    startDateTime: "2025-01-201",
    endDateTime: "2025-01-22",
    color: "#55FFFF",
  },
  {
    id: 3,
    title: "수현이 생일파티 겸 노는 날",
    startDateTime: "2025-01-22",
    endDateTime: "2025-01-25",
    color: "#56e246",
  },
  {
    id: 4,
    title: "보드",
    startDateTime: "2025-01-26",
    endDateTime: "2025-01-29",
    color: "#f8a283dd",
  },
  {
    id: 5,
    title: "동해갑니다",
    startDateTime: "2025-01-03",
    endDateTime: "2025-01-06",
    color: "#6d9ceeee",
  },
];

const GroupPage = () => {
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState({
    name: "춘천팟",
    id: 1,
    isBookMark: true,
  });
  const { groupId } = useParams<{ groupId: string }>();

  const handleBookMarkClick = () => {
    // api 연동 로직 작성해야함
    setGroupInfo((prevGroupInfo) => ({
      ...prevGroupInfo,
      isBookMark: !prevGroupInfo.isBookMark,
    }));
  };

  const handleCreateSchedule = () => {
    navigate(`/group/${groupInfo.id}/calendar/createSchedule`);
  };

  const handleCalendarClick = () => {
    navigate(`/group/${groupInfo.id}/groupCalendar`);
  };

  return (
    <div className={styles.mainContainer}>
      <HasTwoIconHeader
        backgroundColor="purple"
        title={groupInfo.name}
        rightType="star"
        isBookmark={groupInfo.isBookMark}
        groupId={groupInfo.id}
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
          <TodayScheduleList todayScheduleList={todayScheduleList} groupId={groupInfo.id} />
        </div>
        <div className={styles.groupCalendar}>
          <GroupScheduleCalendar groupSchedules={groupSchedules} onClick={handleCalendarClick} />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
