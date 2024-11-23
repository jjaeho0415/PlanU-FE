import React from "react";
import styles from "./hasOnlyRightIconHeader.module.scss";
import StarIcon from "@components/iconComponent/StarIcon";
import RedDot_Icon from "@assets/Icons/headers/redDot.svg?react";
import Alert_Icon from "@assets/Icons/headers/alertIcon.svg?react";
import X_Icon from "@assets/Icons/headers/xIcon.svg?react"

interface Props {
  title: "PlanU" | string;
  rightType: "alert" | "star" | "x";
  handleClick: () => void;
  isExistNoReadAlarms?: boolean;
  isBookmark?: boolean;
  groupId?: number;
}

const HasOnlyRightIconHeader: React.FC<Props> = ({
  title,
  rightType,
  handleClick,
  isExistNoReadAlarms,
  isBookmark,
  groupId,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleSection}>{title}</div>
      <div className={styles.rightSection}>
        {rightType === "alert" ? (
          <div>
            <Alert_Icon width={24} height={24} className={styles.alertIcon} onClick={handleClick} />
            {isExistNoReadAlarms && <RedDot_Icon className={styles.redDotIcon} />}
          </div>
        ) : rightType === "star" ? (
          <StarIcon isBookmark={isBookmark} id={groupId} handleClick={handleClick} />
        ) : <X_Icon width={24} height={24}/>}
      </div>
    </div>
  );
};

export default HasOnlyRightIconHeader;
