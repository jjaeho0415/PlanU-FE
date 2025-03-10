import { useGetGroupInviteList } from "@api/schedule/group/getGroupInviteList";
import { useGetGroupList } from "@api/schedule/group/getGroupList";
import {
  useDeleteGroupInvite,
  usePutGroupInviteAccept,
} from "@api/schedule/group/putGroupInviteAcceptOrReject";
import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import InviteModal from "@components/modals/InviteModal";
import BottomNavBar from "@components/nav-bar/BottomNavBar";
import useAuthStore from "@store/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon_add from "../../../assets/Icons/Icon_add_circle.svg?react";
import GroupItem from "../components/GroupItem";
import InviteItem from "../components/InviteItem";
import styles from "./groupList.module.scss";

const GroupListPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState();
  const { data: groupList } = useGetGroupList(accessToken);
  const { data: groupInviteList } = useGetGroupInviteList(accessToken);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);

  const { mutate: acceptInvite } = usePutGroupInviteAccept(accessToken, setIsInviteModalOpen);
  const { mutate: rejectInvite } = useDeleteGroupInvite(accessToken, setIsInviteModalOpen);

  const handleAcceptClick = (groupId: number) => {
    acceptInvite(groupId);
  };

  const handleRejectClick = (groupId: number) => {
    rejectInvite(groupId);
  };

  return (
    <div className={styles.Container}>
      <HasOnlyRightIconHeader
        title="planU"
        rightType="alert"
        handleClick={() => {
          return;
        }}
      />
      {groupInviteList && groupInviteList.data.length !== 0 && (
        <>
          <div className={styles.Border} />
          <div className={styles.ContentBox}>
            <p className={styles.TitleP}>Invitation Request</p>
            {groupInviteList.data.map((groupInviteItem) => (
              <>
                <InviteItem
                  groupInviteItem={groupInviteItem}
                  key={groupInviteItem.groupId}
                  setIsInviteModalOpen={setIsInviteModalOpen}
                />
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
              </>
            ))}
          </div>
        </>
      )}

      <div className={styles.Border} />
      <div className={styles.ContentBox}>
        <p className={styles.TitleP}>MyGroup</p>
        {groupList &&
          groupList.data.map((groupItem) => (
            <GroupItem groupItem={groupItem} key={groupItem.groupId} />
          ))}
      </div>
      <div className={styles.Border} />
      <Icon_add className={styles.AddIcon} onClick={() => navigate("/createGroup")} />
      <BottomNavBar />
    </div>
  );
};

export default GroupListPage;
