import React from "react";
import styles from "./groupItem.module.scss";
import { useNavigate } from "react-router-dom";

interface IProps {
  groupItem: IGetGroupListItemType;
}

const GroupItem: React.FC<IProps> = ({ groupItem }) => {
  const navigate = useNavigate();
  const handleGroupItemClick = (groupId: number) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div
      className={styles.Container}
      key={groupItem.groupId}
      onClick={() => handleGroupItemClick(groupItem.groupId)}
    >
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
