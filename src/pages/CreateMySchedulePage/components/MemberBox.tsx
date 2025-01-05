import React from "react";
import styles from "./Inputs.module.scss";

const MemberBox: React.FC = () => {
  return (
    <div className={styles.Box}>
      <p className={styles.Title}>참석자</p>
    </div>
  );
};

export default MemberBox;
