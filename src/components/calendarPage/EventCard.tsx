import ArrowIcon from "@assets/Icons/arrow/RightArrow.svg?react";
import LocationIcon from "@assets/Icons/myCalendar/location.svg?react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./eventCard.module.scss";

interface Props {
  scheduleItem: IScheduleItemType;
  groupId?: string;
  isFriendEvent?: boolean;
}

const EventCard: React.FC<Props> = ({ scheduleItem, groupId, isFriendEvent = false }) => {
  const navigate = useNavigate();

  const handleShowScheduleDetail = () => {
    groupId
      ? navigate(`/group/${groupId}/calendar/schedule/${scheduleItem.id}`)
      : navigate(`/mySchedule/${scheduleItem.id}`);
  };

  return (
    <div className={styles.eventCard}>
      {!isFriendEvent && (
        <button className={styles.detailButton} onClick={handleShowScheduleDetail}>
          상세보기 <ArrowIcon className={styles.icon} />
        </button>
      )}
      <div className={styles.time} style={{ backgroundColor: scheduleItem.color || "#21212F" }}>
        {`${scheduleItem.startTime} ~ ${scheduleItem.endTime}`}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{scheduleItem.title}</div>
        {scheduleItem.location && (
          <div className={styles.location}>
            <LocationIcon className={styles.icon} />
            {scheduleItem.location}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
