import React from "react";
import styles from "./card.module.scss";
import Icon_crown from "@assets/Icons/calendar/Icon_crown_white.svg?react";

interface rankProps {
  rank: number;
  date: string;
  possibleMembers: number;
}
interface props {
  item: rankProps;
}
const RankCard: React.FC<props> = ({ item }) => {
  return (
    <div className={styles.Container}>
      {item.rank === 1 && <Icon_crown className={styles.Crown} />}
      <div className={styles.RankContainer}>{item.rank}위</div>
      <div className={styles.InfoContainer}>
        <p className={styles.Date}>{item.date}</p>
        <div className={styles.MembersBox}>
          <p className={styles.Possible}>{item.possibleMembers}</p>
          <p className={styles.MembersNum}>/8</p>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
