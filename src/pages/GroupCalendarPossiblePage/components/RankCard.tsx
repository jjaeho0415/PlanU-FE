import React from "react";
import styles from "./card.module.scss";
import Icon_crown from "@assets/Icons/calendar/Icon_crown_white.svg?react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

interface props {
  availableDateRank: IGroupAvailableDatesRankItemType;
  groupTotalNumber: number | undefined;
}
const RankCard: React.FC<props> = ({ availableDateRank, groupTotalNumber }) => {
  return (
    <div className={styles.Container}>
      {availableDateRank.ranks === 1 && <Icon_crown className={styles.Crown} />}
      <div className={styles.RankContainer}>{availableDateRank.ranks}위</div>
      <div className={styles.InfoContainer}>
        <div className={styles.Date}>{format(new Date(availableDateRank.date), "M월 d일 (E요일)", { locale: ko })}</div>
        <div className={styles.MembersBox}>
          <div className={styles.Possible}>{availableDateRank.countOfAvailableMembers}</div>
          <div className={styles.MembersNum}>/ {groupTotalNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
