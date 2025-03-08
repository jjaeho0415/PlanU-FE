import React from "react";
import styles from "./card.module.scss";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface props {
  availableDatesMemberInfo: IGroupAvailableDatesMemberInfoItemType;
}
const MemberCard: React.FC<props> = ({ availableDatesMemberInfo }) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.LeftBox}>
        <img src={availableDatesMemberInfo.profileImage} className={styles.profileImage} />
      </div>
      <div className={styles.line} />
      <div className={styles.RightBox}>
        <div className={styles.RightTopP}>{availableDatesMemberInfo.name}</div>
        <div className={styles.RightContentBox}>
          {availableDatesMemberInfo.availableDates.length > 0 ? (
            availableDatesMemberInfo.availableDates.map((availableDate) => (
              <p key={availableDate}>• {format(new Date(availableDate), "M월 d일 (E요일)", { locale: ko })}</p>
            ))
          ) : (
            <div>가능한 날짜가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
