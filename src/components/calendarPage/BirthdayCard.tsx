import React from "react";
import styles from "./birthdayCard.module.scss";
import BirthdayIcon from "@assets/Icons/calendar/birthdayIcon.svg?react";

interface Props {
  birthdayName: string;
}

const BirthdayCard: React.FC<Props> = ({ birthdayName }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.birthdayIconSection}>
        <BirthdayIcon width={35} height={35} />
      </div>
      <div className={styles.birthdayText}>{birthdayName}님의 생일입니다!</div>
    </div>
  );
};

export default BirthdayCard;
