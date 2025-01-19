import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import BottomNavBar from "@components/nav-bar/BottomNavBar";
import styles from "./groupList.module.scss";
import GroupItem from "../components/GroupItem";
import Icon_add from "../../../assets/Icons/Icon_add_circle.svg?react";
import { useNavigate } from "react-router-dom";
import InviteItem from "../components/InviteItem";
import useAuthStore from "@store/useAuthStore";
import { useGetGroupList } from "@api/group/getGroupList";
import { useGetGroupInviteList } from "@api/group/getGroupInviteList";

const GroupListPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState();
  const { data: groupList } = useGetGroupList(accessToken);
  const { data: groupInviteList } = useGetGroupInviteList(accessToken);

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
              <InviteItem groupInviteItem={groupInviteItem}  />
            ))}
          </div>
        </>
      )}
      

      <div className={styles.Border} />
      <div className={styles.ContentBox}>
        <p className={styles.TitleP}>MyGroup</p>
        {groupList && groupList.data.map((groupItem) => <GroupItem groupItem={groupItem} />)}
      </div>
      <div className={styles.Border} />
      <Icon_add className={styles.AddIcon} onClick={() => navigate("/createGroup")} />
      <BottomNavBar />
    </div>
  );
};

export default GroupListPage;
