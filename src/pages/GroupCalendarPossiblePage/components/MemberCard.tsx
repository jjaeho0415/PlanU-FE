import React from "react";
import styles from "./card.module.scss";

const dates = ["2024.09.11 (수)", "2024.11.11 (목)", "2024.09.11 (수)"];

const MemberCard: React.FC = () => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.LeftBox}>
        <div className={styles.Profile}></div>
      </div>
      <div className={styles.RightBox}>
        <p className={styles.RightTopP}>이수현</p>
        <div className={styles.RightContentBox}>
          {dates.map((date) => (
            <p key={date}>• {date}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
