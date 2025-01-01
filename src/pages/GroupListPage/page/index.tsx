import HasOnlyRightIconHeader from "@components/headers/HasOnlyRightIconHeader";
import BottomNavBar from "@components/nav-bar/BottomNavBar";
import styles from "./groupList.module.scss";
import GroupItem from "../components/GroupItem";
import InvitateItem from "../components/InvitateItem";
import Icon_add from "../../../assets/Icons/Icon_add_circle.svg?react";

const GroupListPage: React.FC = () => {
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
        <InvitateItem />
        <InvitateItem />
      </div>
      <div className={styles.Border} />
      <div className={styles.ContentBox}>
        <p className={styles.TitleP}>MyGroup</p>
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
      </div>
      <div className={styles.Border} />
      <Icon_add className={styles.AddIcon} />
      <BottomNavBar />
    </div>
  );
};

export default GroupListPage;
