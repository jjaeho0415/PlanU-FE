import { useGetGroupMemberList } from "@api/schedule/group/getGroupMemberList";
import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import SearchBox from "@pages/InviteGroupMemberPage/components/SearchBox";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import MemberList from "../components/MemberList";
import styles from "./groupMember.module.scss";

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
          <SearchBox type="onlyClick" groupId={groupId} />
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
