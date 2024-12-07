import React from "react";
import styles from "./calenderHeader.module.scss";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import MiniCalender_Icon from "@assets/Icons/headers/miniCalender.svg?react";

interface Props {
  title: "그룹 달력" | "나의 달력" | string;
  type: "my" | "group";
  handleBackArrowClick: () => void;
  handleMiniCalenderClick: () => void;
}

const CalenderHeader: React.FC<Props> = ({
  handleMiniCalenderClick,
  handleBackArrowClick,
  title,
  type,
}) => {
  return (
    <div className={styles.mainContainer}>
      {type === "group" && (
        <div className={styles.leftSection} onClick={handleBackArrowClick}>
          <BackArrow2_Icon width={9} height={18} />
        </div>
      )}

      <div className={styles.titleSection}>{title}</div>
      <div className={styles.rightSection}>
        <MiniCalender_Icon
          width={27}
          height={26}
          onClick={handleMiniCalenderClick}
          className={styles.miniCalenderIconSection}
        />
      </div>
    </div>
  );
};

export default CalenderHeader;
