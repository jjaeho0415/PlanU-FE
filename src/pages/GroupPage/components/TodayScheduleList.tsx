import { useNavigate } from "react-router-dom";
import TodayScheduleItem from "./TodayScheduleItem";
import styles from "./todayScheduleList.module.scss";

interface Props {
  todayScheduleList: ITodaySchedulesType[] | undefined;
  groupId: number;
}

const TodayScheduleList: React.FC<Props> = ({ todayScheduleList, groupId }) => {
  const navigate = useNavigate();
  const handleScheduleItemClick = (id: number) => {
    navigate(`/group/${groupId}/calendar/schedule/${id}`);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topSection}>오늘의 일정</div>
      <div className={styles.contentSection}>
        {todayScheduleList && todayScheduleList.length !== 0 ? (
          todayScheduleList.map((todayScheduleItem) => (
            <TodayScheduleItem
              key={todayScheduleItem.id}
              onClick={() => handleScheduleItemClick(todayScheduleItem.id)}
              todayScheduleItem={todayScheduleItem}
            />
          ))
        ) : (
          <div className={styles.error}>오늘의 일정이 없습니다!</div>
        )}
      </div>
    </div>
  );
};

export default TodayScheduleList;
