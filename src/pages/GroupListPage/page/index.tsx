import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import BottomNavBar from "@components/nav-bar/BottomNavBar";
import styles from "./groupList.module.scss";
import GroupItem from "../components/GroupItem";
import Icon_add from "../../../assets/Icons/Icon_add_circle.svg?react";
import { useNavigate } from "react-router-dom";
import InviteItem from "../components/InviteItem";
import useAuthStore from "@store/useAuthStore";
import { useGetGroupList } from "@api/group/getGroupList";

const GroupListPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState();
  const { data: groupList } = useGetGroupList(accessToken);

  return (
    <div className={styles.Container}>
      <HasOnlyRightIconHeader
        title="planU"
        rightType="alert"
        handleClick={() => {
          return;
        }}
      />
      <div className={styles.Border} />
      <div className={styles.ContentBox}>
        <p className={styles.TitleP}>Invitation Request</p>
        <InviteItem />
        <InviteItem />
      </div>
      <div className={styles.Border} />
      <div className={styles.ContentBox}>
        <p className={styles.TitleP}>MyGroup</p>
        {groupList &&
          groupList.map((groupItem) => {
            return <GroupItem groupItem={groupItem} />;
          })}
      </div>
      <div className={styles.Border} />
      <Icon_add className={styles.AddIcon} onClick={() => navigate("/createGroup")} />
      <BottomNavBar />
    </div>
  );
};

export default GroupListPage;
