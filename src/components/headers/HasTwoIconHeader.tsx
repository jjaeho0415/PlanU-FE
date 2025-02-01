import React from "react";
import styles from "./hasTwoIconHeader.module.scss";
import More_Icon from "@assets/Icons/headers/moreIcon.svg?react";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";
import Check_Icon from "@assets/Icons/headers/checkIcon.svg?react";
import MiniButton from "@components/buttons/MiniButton";
import StarIcon from "@components/iconComponent/StarIcon";

interface Props {
  title: string;
  rightType: "moreIcon" | "checkIcon" | "button" | "star";
  handleLeftClick: () => void;
  handleRightClick: () => void;
  backgroundColor: "purple" | "white";
  isPin?: boolean;
  groupId?: number;
}

const HasTwoIconHeader: React.FC<Props> = ({
  title,
  rightType,
  handleLeftClick,
  handleRightClick,
  backgroundColor,
  isPin,
  groupId
}) => {
  return (
    <div className={`${styles.mainContainer} ${styles[backgroundColor]}`}>
      <div className={styles.leftSection}>
        <BackArrow2_Icon width={9} height={18} onClick={handleLeftClick} />
      </div>
      <div className={styles.titleSection}>{title}</div>
      <div className={styles.rightSection} onClick={handleRightClick}>
        {rightType === "moreIcon" ? (
          <More_Icon width={20} height={26} />
        ) : rightType === "checkIcon" ? (
          <Check_Icon width={24} height={24} />
        ) : rightType === "star" ? (
          <StarIcon isPin={isPin} id={groupId} handleClick={handleRightClick} />
        ): (
          <MiniButton
            buttonText="완료"
            color="purple"
            onClick={() => {
              return;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HasTwoIconHeader;
