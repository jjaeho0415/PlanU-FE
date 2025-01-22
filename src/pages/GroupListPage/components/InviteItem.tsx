import React from "react";
import styles from "./groupItem.module.scss";


interface IProps {
  groupInviteItem: IGetGroupInviteItemType;
  setIsInviteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteItem: React.FC<IProps> = ({ groupInviteItem,setIsInviteModalOpen }) => {
  


  return (
    <div
      className={styles.Container}
      onClick={() => setIsInviteModalOpen(true)}
    >
      <div className={styles.ProfileImg}>
        <img
          src={groupInviteItem.groupImageUrl}
          alt={`${groupInviteItem.groupName}의 프로필`}
          className={styles.image}
        />
      </div>
      <div className={styles.InfoBox}>
        <p className={styles.GroupName}>{groupInviteItem.groupName}</p>
      </div>
      
    </div>
  );
};

export default InviteItem;
