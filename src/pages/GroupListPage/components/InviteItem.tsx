import React, { useState } from "react";
import styles from "./groupItem.module.scss";
import InviteModal from "@components/modals/InviteModal";

interface IProps {
  groupInviteItem: IGetGroupInviteListItemType;
}

const InviteItem: React.FC<IProps> = ({ groupInviteItem }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const handleAcceptClick = () => {};

  const handleRejectClick = () => {};
  return (
    <div
      className={styles.Container}
      key={groupInviteItem.groupId}
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
      {isInviteModalOpen && (
        <InviteModal
          groupId={groupInviteItem.groupId}
          groupImage={groupInviteItem.groupImageUrl}
          groupName={groupInviteItem.groupName}
          setIsInviteModalOpen={setIsInviteModalOpen}
          handleAcceptClick={handleAcceptClick}
          handleRejectClick={handleRejectClick}
        />
      )}
    </div>
  );
};

export default InviteItem;
