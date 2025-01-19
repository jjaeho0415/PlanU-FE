import React from "react";
import styles from "./groupItem.module.scss";

interface IProps {
  groupItem: IGetGroupListItemType;
}

const GroupItem: React.FC<IProps> = ({ groupItem }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.ProfileImg}>
        <img
          src={groupItem.groupImageUrl}
          alt={`${groupItem.groupName}의 프로필`}
          className={styles.image}
        />
      </div>
      <div className={styles.InfoBox}>
        <p className={styles.GroupName}>{groupItem.groupName}</p>
        <p className={styles.MembersNum}>• {groupItem.participant}명 참여 중</p>
      </div>
    </div>
  );
};

export default GroupItem;
