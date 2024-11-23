import React from "react";
import styles from "./chattingHeader.module.scss";
import Search_Icon from "@assets/Icons/headers/searchIcon.svg?react";
import Alert_Icon from "@assets/Icons/headers/alertIcon.svg?react";
import RedDot_Icon from "@assets/Icons/headers/redDot.svg?react";

interface Props {
  handleSearchClick: () => void;
  handleAlertClick: () => void;
  isExistNoReadAlarms: boolean;
}

const ChattingHeader: React.FC<Props> = ({
  handleAlertClick,
  handleSearchClick,
  isExistNoReadAlarms,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleSection}>Messages</div>
      <div className={styles.rightSection}>
        <Search_Icon
          width={24}
          height={24}
          onClick={handleSearchClick}
          className={styles.searchIcon}
        />
        <div>
          <Alert_Icon
            width={24}
            height={26}
            onClick={handleAlertClick}
            className={styles.alertIcon}
          />
          {isExistNoReadAlarms && <RedDot_Icon className={styles.redDotIcon} />}
        </div>
      </div>
    </div>
  );
};

export default ChattingHeader;
