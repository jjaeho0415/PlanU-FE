import React from "react";
import styles from "./calenderHeader.module.scss";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import MiniCalender_Icon from "@assets/Icons/headers/miniCalender.svg?react";
// import More_Icon from "@assets/Icons/headers/moreIcon.svg?react";

interface Props {
  title: "그룹 달력" | "나의 달력" | string;
  handleBackArrowClick: () => void;
  handleMiniCalenderClick: () => void;
  // handleMoreIconClick?: () => void;
}

const CalenderHeader: React.FC<Props> = ({
  handleMiniCalenderClick,
  // handleMoreIconClick,
  handleBackArrowClick,
  title,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftSection} onClick={handleBackArrowClick}>
        <BackArrow2_Icon width={9} height={18} />
      </div>
      <div className={styles.titleSection}>{title}</div>
      <div className={styles.rightSection}>
        <MiniCalender_Icon
          width={27}
          height={26}
          onClick={handleMiniCalenderClick}
          className={styles.miniCalenderIconSection}
        />
        {/* {title === "그룹 달력" && <More_Icon width={20} height={26} onClick={handleMoreIconClick} className={styles.moreIconSection} />} */}
      </div>
    </div>
  );
};

export default CalenderHeader;
