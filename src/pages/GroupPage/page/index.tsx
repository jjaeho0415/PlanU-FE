import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import styles from "./groupPage.module.scss";
import { useState } from "react";
import GroupOptions from "../components/GroupOptions";
import { useNavigate } from "react-router-dom";
import TodayScheduleList from "../components/TodayScheduleList";
import BottomNavBar from "@components/nav-bar/BottomNavBar";

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

const GroupPage = () => {
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState({
    name: "춘천팟",
    id: 1,
    isBookMark: true,
  });

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

  return (
    <div className={styles.mainContainer}>
      <HasOnlyRightIconHeader
        title={groupInfo.name}
        rightType="star"
        isBookmark={groupInfo.isBookMark}
        groupId={groupInfo.id}
        handleClick={handleBookMarkClick}
      />
      <div className={styles.contentContainer}>
        <div className={styles.iconSection}>
          {iconOptionsTitle.map((title) => (
            <GroupOptions title={title} groupId={groupInfo.id} />
          ))}
        </div>
        <div className={styles.buttonSection} onClick={handleCreateSchedule}>
          일정 생성하기
        </div>
        <div className={styles.todayScheduleList}>
          <TodayScheduleList todayScheduleList={todayScheduleList} groupId={groupInfo.id} />
        </div>
          </div>
          <BottomNavBar />
    </div>
  );
};

export default GroupPage;
