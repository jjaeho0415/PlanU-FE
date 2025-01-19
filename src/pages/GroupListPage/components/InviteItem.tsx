import React, { useState } from "react";
import styles from "./groupItem.module.scss";
import InviteModal from "@components/modals/InviteModal";
import useAuthStore from "@store/useAuthStore";
import {
  useDeleteGroupInvite,
  usePutGroupInviteAccept,
} from "@api/group/putGroupInviteAcceptOrReject";

interface IProps {
  groupInviteItem: IGetGroupInviteListItemType;
}

const InviteItem: React.FC<IProps> = ({ groupInviteItem }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const { accessToken } = useAuthStore.getState();
  const { mutate: acceptInvite } = usePutGroupInviteAccept(accessToken, setIsInviteModalOpen);
  const { mutate: rejectInvite } = useDeleteGroupInvite(accessToken, setIsInviteModalOpen);

  const handleAcceptClick = (groupId: number) => {
    acceptInvite(groupId);
  };

  const handleRejectClick = (groupId: number) => {
    rejectInvite(groupId);
  };

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
          handleAcceptClick={() => handleAcceptClick(groupInviteItem.groupId)}
          handleRejectClick={() => handleRejectClick(groupInviteItem.groupId)}
        />
      )}
    </div>
  );
};

export default InviteItem;
