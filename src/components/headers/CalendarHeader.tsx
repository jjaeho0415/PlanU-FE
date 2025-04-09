import React from "react";
import styles from "./calendarHeader.module.scss";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import MiniCalender_Icon from "@assets/Icons/headers/miniCalendar.svg?react";

interface Props {
  title: "그룹 달력" | "나의 달력" | string;
  type: "my" | "group" | "friend";
  handleBackArrowClick?: () => void;
  handleMiniCalendarClick: () => void;
}

const CalenderHeader: React.FC<Props> = ({
  handleMiniCalendarClick,
  handleBackArrowClick,
  title,
  type,
}) => {
  return (
    <div className={styles.mainContainer}>
      {type === "group" && (
        <div className={styles.leftSection}>
          <BackArrow2_Icon width={9} height={18} onClick={handleBackArrowClick} className={styles.backArrow} />
        </div>
      )}

      <div className={styles.titleSection}>{title}</div>
      {type !== "friend" && <div className={styles.rightSection}>
        <MiniCalender_Icon
          width={27}
          height={26}
          onClick={handleMiniCalendarClick}
          className={styles.miniCalendarIconSection}
        />
      </div>}
    </div>
  );
};

export default CalenderHeader;
