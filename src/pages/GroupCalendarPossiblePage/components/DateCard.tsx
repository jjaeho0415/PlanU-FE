import React from "react";
import styles from "./card.module.scss";

interface props {
  data: IGetAvailableDateInfo;
}

const DateCard: React.FC<props> = ({ data }) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.LeftBox}>
        <p className={styles.Possible}>{data.memberNames.length}</p>
        <p className={styles.MembersNum}>/8</p>
      </div>
      <div className={styles.RightBox}>
        <p className={styles.RightTopP}>{data.availableDate}</p>
        <div className={styles.RightContentBox}>
          {data.memberNames.map((member) => (
            <p key={member}>• {member}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateCard;
