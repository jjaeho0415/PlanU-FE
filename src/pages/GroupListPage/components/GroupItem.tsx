import React from "react";
import styles from "./groupItem.module.scss";
import { useNavigate } from "react-router-dom";
import PinIcon from "@assets/Icons/groupPage/pinIcon.svg?react";

interface IProps {
  groupItem: IGetGroupItemType;
}

const GroupItem: React.FC<IProps> = ({ groupItem }) => {
  const navigate = useNavigate();
  const handleGroupItemClick = (groupId: number) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className={styles.Container} onClick={() => handleGroupItemClick(groupItem.groupId)}>
      <div className={styles.ProfileImg}>
        <img
          src={groupItem.groupImageUrl}
          alt={`${groupItem.groupName}의 프로필`}
          className={styles.image}
        />
      </div>
      <div className={styles.InfoBox}>
        <div className={styles.groupNameSection}>
          <p className={styles.GroupName}>{groupItem.groupName}</p>
          {groupItem.isPin && <PinIcon width={9} height={14} />}
        </div>
        <p className={styles.MembersNum}>• {groupItem.participant}명 참여 중</p>
      </div>
    </div>
  );
};

export default GroupItem;
