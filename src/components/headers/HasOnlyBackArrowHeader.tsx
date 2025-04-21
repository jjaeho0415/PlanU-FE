import React from "react";
import styles from "./hasOnlyBackArrowHeader.module.scss";
import BackArrow1_Icon from "@assets/Icons/headers/backArrow1.svg?react";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";

interface Props {
  title: string;
  pageType?: "login" | string;
  handleClick: () => void;
  handleReadAllClick?: () => void;
}

const HasOnlyBackArrowHeader: React.FC<Props> = ({
  title,
  handleClick,
  pageType,
  handleReadAllClick,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconSection} onClick={handleClick}>
        {pageType === "login" ? (
          <BackArrow1_Icon width={18} height={14} />
        ) : (
          <BackArrow2_Icon width={9} height={18} />
        )}
      </div>
      <div className={title !== "알림" ? styles.titleSection : styles.notificationTitleSection}>{title}</div>
      {title === "알림" && (
        <div className={styles.readAllButton} onClick={handleReadAllClick}>
          모두 읽음
        </div>
      )}
    </div>
  );
};

export default HasOnlyBackArrowHeader;
