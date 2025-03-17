import React from "react";
import styles from "./hasOnlyBackArrowHeader.module.scss";
import BackArrow1_Icon from "@assets/Icons/headers/backArrow1.svg?react";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import MiniButton from "@components/buttons/MiniButton";

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
      <div className={styles.titleSection}>{title}</div>
      {title === "알림" && (
        <MiniButton buttonText="모두 읽음" color="purple_light" onClick={handleReadAllClick} />
      )}
    </div>
  );
};

export default HasOnlyBackArrowHeader;
