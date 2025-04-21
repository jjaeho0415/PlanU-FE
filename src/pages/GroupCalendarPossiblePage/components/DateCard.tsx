import React from "react";
import styles from "./card.module.scss";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

interface props {
  availableDateInfo: IGroupAvailableDatesDateInfoItemType;
  groupTotalNumber: number |undefined;
}

const DateCard: React.FC<props> = ({ availableDateInfo, groupTotalNumber }) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.LeftBox}>
        <p className={styles.Possible}>{availableDateInfo.memberNames.length} </p>
        <p className={styles.MembersNum}>/{groupTotalNumber}</p>
      </div>
      <div className={styles.line} />
      <div className={styles.RightBox}>
        <p className={styles.RightTopP}>{format(new Date(availableDateInfo.availableDate), "M월 d일 (E요일)", { locale: ko })}</p>
        <div className={styles.RightContentBox}>
          {availableDateInfo.memberNames.map((name) => (
            <p key={name}>• {name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateCard;
