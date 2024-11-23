import React from 'react'
import styles from "./hasTwoIconHeader.module.scss"
import More_Icon from "@assets/Icons/headers/moreIcon.svg?react";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react"
import classNames from 'classnames';

interface Props {
  title: string;
  rightType: "icon" | "button";
  handleLeftClick: () => void;
  handleRightClick: () => void;
  backgroundColor: "purple" | "white";
}

const HasTwoIconHeader: React.FC<Props> = ({ title, rightType, handleLeftClick, handleRightClick, backgroundColor }) => {
  const mainContainerClass = classNames({
    [styles.mainContainer]: true,
    [styles.whiteBackground]: backgroundColor === "white",
    [styles.purpleBackground]: backgroundColor === "purple"
   })

  return (
    <div className={mainContainerClass}>
      <div className={styles.leftSection}>
        <BackArrow2_Icon width={9} height={18} onClick={handleLeftClick} />
      </div>
      <div className={styles.titleSection}>{title}</div>
      <div className={styles.rightSection} onClick={handleRightClick}>
        {rightType === "icon" ? (
          <More_Icon width={20} height={26} />
        ) : (
          <button className={styles.button}>완료</button>
        )}
      </div>
    </div>
  );
}

export default HasTwoIconHeader