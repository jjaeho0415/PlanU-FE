import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import styles from "./inviteGroupMember.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { useState } from "react";
import FriendList from "../components/FriendList";
import useAuthStore from "@store/useAuthStore";
import { useGetGroupMemberInviteList } from "@api/group/getGroupMemberInviteList";
import { usePostInviteGroupMember } from "@api/group/postInviteGroupMember";

const InviteGroupMemberPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore.getState();
  const {
    data: groupMemberInviteList,
    isError,
    error,
    isLoading,
  } = useGetGroupMemberInviteList(groupId!, accessToken);
  const { mutate: inviteGroupMember } = usePostInviteGroupMember(groupId!, accessToken);

  const handleInviteGroupMemberClick = (username: string) => {
    inviteGroupMember(username);
    return;
  };
  const handleCancelInviteClick = () => {
    // 그룹 초대 취소 api 연동
    return;
  };
  const handleSearchIconClick = () => {
    // 검색 api 호출 로직 작성
    return;
  };

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="멤버 초대" handleClick={() => navigate(-1)} />
      <div className={styles.contentContainer}>
        <div className={styles.searchContainer}>
          <SearchBox
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="invite"
            handleSearchIconClick={handleSearchIconClick}
          />
        </div>
        <div className={styles.line}></div>
        <div className={styles.friendContainer}>
          <div className={styles.friendText}>친구</div>
          {isLoading ? (
            <div className={styles.loading}>로딩중...</div>
          ) : isError ? (
            <div className={styles.error}>
              <span className={styles.errorMsgRed}>Error </span>: {error.message}
            </div>
          ) : (
            groupMemberInviteList &&
            groupMemberInviteList.nonGroupFriends.length !== 0 ? (
              <FriendList
                friendList={groupMemberInviteList.nonGroupFriends}
                handleInviteGroupMemberClick={handleInviteGroupMemberClick}
                handleCancelInviteClick={handleCancelInviteClick}
              />
            ): <div className={styles.error}>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteGroupMemberPage;
