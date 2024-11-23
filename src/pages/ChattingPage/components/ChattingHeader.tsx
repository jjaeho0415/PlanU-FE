import React from "react";
import styles from "./chattingHeader.module.scss";
import Hamburger_Icon from "@assets/Icons/headers/hamburgerIcon.svg?react";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";

interface Props {
  groupImage: string;
  groupName: string;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}

const ChattingHeader: React.FC<Props> = ({
  groupImage,
  groupName,
  handleLeftClick,
  handleRightClick,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftSection}>
        <BackArrow2_Icon width={9} height={18} onClick={handleLeftClick} />
      </div>
      <div className={styles.centerSection}>
        <div className={styles.imageSection}>
          <img src={groupImage} width={52} height={48} className={styles.image} />
        </div>
        <div className={styles.textSection}>{groupName}</div>
      </div>
      <div className={styles.rightSection}>
        <Hamburger_Icon width={30} height={30} onClick={handleRightClick} />
      </div>
    </div>
  );
};

export default ChattingHeader;
