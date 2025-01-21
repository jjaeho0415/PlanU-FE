import React from "react";
import styles from "./card.module.scss";

const members = ["김도하", "정재호", "이상준"];

const DateCard: React.FC = () => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.LeftBox}>
        <p className={styles.Possible}>4</p>
        <p className={styles.MembersNum}>/8</p>
      </div>
      <div className={styles.RightBox}>
        <p className={styles.RightTopP}>2024.09.l11 (수)</p>
        <div className={styles.RightContentBox}>
          {members.map((member) => (
            <p key={member}>• {member}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateCard;
