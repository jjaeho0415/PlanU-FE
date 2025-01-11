import LocationIcon from "@assets/icons/Location/location.svg?react";
import ArrowIcon from "@assets/icons/arrow/RightArrow.svg?react";
import React from "react";
import styles from "./eventCard.module.scss";

interface Props {
  time: string;
  title: string;
  location: string;
  timeColor?: string;
}

const EventCard: React.FC<Props> = ({ time, title, location, timeColor }) => {
  return (
    <div className={styles.eventCard}>
      <button className={styles.detailButton}>
        상세보기 <ArrowIcon className={styles.icon} />
      </button>
      <div className={styles.time} style={{ backgroundColor: timeColor || "#333" }}>
        {time}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.location}>
          <LocationIcon className={styles.icon} />
          {location}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
