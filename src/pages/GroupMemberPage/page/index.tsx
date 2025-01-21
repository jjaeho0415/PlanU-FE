import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./groupMember.module.scss";
import SearchBox from "@pages/InviteGroupMemberPage/components/SearchBox";
import MemberList from "../components/MemberList";
import { useGetGroupMemberList } from "@api/group/getGroupMemberList";
import useAuthStore from "@store/useAuthStore";

const GroupMemberPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore.getState();
  const { data: groupMemberList } = useGetGroupMemberList(accessToken, groupId!);

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="멤버" handleClick={() => navigate(-1)} />
      <div className={styles.contentContainer}>
        <div className={styles.searchContainer}>
          <SearchBox type="onlyClick" />
        </div>
        <div className={styles.memberListContainer}>
          <div className={styles.textBox}>멤버목록</div>
          <div className={styles.emptyBox} />
          <div className={styles.scrollContainer}>
            {groupMemberList && <MemberList memberList={groupMemberList.members} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberPage;
