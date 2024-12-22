import { useNavigate } from "react-router-dom";
import TodayScheduleItem from "./TodayScheduleItem";
import styles from "./todayScheduleList.module.scss";

interface Props {
  todayScheduleList: ITodaySchedulesType[];
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
        {todayScheduleList.map((todayScheduleItem) => (
          <TodayScheduleItem onClick={() => handleScheduleItemClick(todayScheduleItem.id)} todayScheduleItem={todayScheduleItem}/>
        ))}
      </div>
    </div>
  );
};

export default TodayScheduleList;
