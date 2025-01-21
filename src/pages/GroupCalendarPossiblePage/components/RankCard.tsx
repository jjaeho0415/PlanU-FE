import React from "react";
import styles from "./card.module.scss";

const RankCard: React.FC = () => {
  return (
    <div>
      <div className={styles.RankContainer}></div>
      <div className={styles.InfoContainer}>
        <p className={styles.Date}> 2025.01.21 (화)</p>
        <div className={styles.MembersBox}>
          <p className={styles.Possible}>4</p>
          <p className={styles.MembersNum}>/8</p>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
