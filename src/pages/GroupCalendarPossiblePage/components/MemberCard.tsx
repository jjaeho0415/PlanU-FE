import React from "react";
import styles from "./card.module.scss";

interface props {
  data: IGetAvailableMemberInfoType;
}
const MemberCard: React.FC<props> = ({ data }) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.LeftBox}>
        <div className={styles.Profile}></div>
      </div>
      <div className={styles.RightBox}>
        <p className={styles.RightTopP}>{data.memberName}</p>
        <div className={styles.RightContentBox}>
          {data.availableDates.map((date) => (
            <p key={date}>• {date}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
