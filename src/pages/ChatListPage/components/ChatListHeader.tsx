import React from "react";
import styles from "./chatListHeader.module.scss";
import Search_Icon from "@assets/Icons/headers/searchIcon.svg?react";
import Alert_Icon from "@assets/Icons/headers/alertIcon.svg?react";
import RedDot_Icon from "@assets/Icons/headers/redDot.svg?react";

interface Props {
  handleSearchClick: () => void;
  handleAlertClick: () => void;
  isExistUnReadAlarms: boolean;
}

const ChatListHeader: React.FC<Props> = ({
  handleAlertClick,
  handleSearchClick,
  isExistUnReadAlarms,
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
            height={24}
            onClick={handleAlertClick}
            className={styles.alertIcon}
          />
          {isExistUnReadAlarms && <RedDot_Icon className={styles.redDotIcon} />}
        </div>
      </div>
    </div>
  );
};

export default ChatListHeader;
