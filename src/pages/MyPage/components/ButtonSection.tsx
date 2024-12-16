import React from "react";

import EditIcon from "@assets/Icons/myPage/edit.svg?react";
import UserIcon from "@assets/Icons/myPage/user.svg?react";

import styles from "./buttonSection.module.scss";

const ButtonSection: React.FC = () => {
  return (
    <div className={styles.buttonSection}>
      <button className={styles.button}>
        <UserIcon className={styles.icon} />
        친구관리
      </button>
      <div className={styles.divider}></div>
      <button className={styles.button}>
        <EditIcon className={styles.icon} />
        내가 쓴 글
      </button>
    </div>
  );
};

export default ButtonSection;
