import React from "react";
import styles from "./hasOnlyRightIconHeader.module.scss";
import RedDot_Icon from "@assets/Icons/headers/redDot.svg?react";
import Alert_Icon from "@assets/Icons/headers/alertIcon.svg?react";
import X_Icon from "@assets/Icons/headers/xIcon.svg?react";
import MiniCalendar_Icon from "@assets/Icons/headers/miniCalendar.svg?react";
import MiniButton from "@components/buttons/MiniButton";

interface Props {
  title: "PlanU" | string;
  rightType: "alert" | "star" | "x" | "calendar" | "button";
  handleClick: () => void;
  isExistUnReadAlarms?: boolean;
}

const HasOnlyRightIconHeader: React.FC<Props> = ({
  title,
  rightType,
  handleClick,
  isExistUnReadAlarms,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleSection}>{title}</div>
      <div className={styles.rightSection}>
        {rightType === "alert" ? (
          <div>
            <Alert_Icon width={24} height={24} className={styles.alertIcon} onClick={handleClick} />
            {isExistUnReadAlarms && <RedDot_Icon className={styles.redDotIcon} />}
          </div>
        ) : rightType === "x" ? (
          <X_Icon width={24} height={24} onClick={handleClick} />
        ) : rightType === "button" ? (
          <MiniButton buttonText="완료" onClick={handleClick} color="purple" />
        ) : (
          <MiniCalendar_Icon />
        )}
      </div>
    </div>
  );
};

export default HasOnlyRightIconHeader;
