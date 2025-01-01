import React from "react";
import styles from "./groupItem.module.scss";
import DefaultProfileImage from "@assets/Icons/Default Profile/default_profile.svg?react";

interface IProps {}

const InvitateItem: React.FC<IProps> = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.ProfileImg}>
        <DefaultProfileImage />
      </div>
      <div className={styles.InfoBox}>
        <p className={styles.GroupName}>planU 수다방</p>
      </div>
    </div>
  );
};

export default InvitateItem;
