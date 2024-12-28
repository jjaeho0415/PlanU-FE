import { getFormattedLocation } from "../../../constants/truncation";
import styles from "./todayScheduleItem.module.scss";
import LocationMarkerIcon from "@assets/Icons/groupPage/locationMarkerIcon.svg?react";

interface Props {
  todayScheduleItem: ITodaySchedulesType;
  onClick: () => void;
}

const TodayScheduleItem: React.FC<Props> = ({ todayScheduleItem, onClick }) => {

const getFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const date = String(today.getDate()).padStart(2, "0");
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayNames[today.getDay()];

  return `${year}.${month}.${date} (${day}) `;
};
    
  return (
    <div className={styles.scheduleItemContainer} onClick={onClick}>
      <div className={styles.title}>{todayScheduleItem.title}</div>
      <div className={styles.infoSection}>
        <div className={styles.date}>
          {getFormattedDate()}
          {todayScheduleItem.startDateTime}
        </div>
        <div className={styles.location}>
          <LocationMarkerIcon width={17} height={20} />
          <div className={styles.locationText}>
            {getFormattedLocation(todayScheduleItem.location)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayScheduleItem;
