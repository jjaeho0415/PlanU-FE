import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import styles from "./inviteGroupMember.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { useEffect, useRef, useState } from "react";
import FriendList from "../components/FriendList";
import useAuthStore from "@store/useAuthStore";
import { useGetGroupMemberInviteList } from "@api/group/getGroupMemberInviteList";
import { usePostInviteGroupMember } from "@api/group/postInviteGroupMember";
import { useDeleteInviteGroupMember } from "@api/group/deleteInviteGroupMember";
import { isEqual } from "lodash";

const InviteGroupMemberPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const prevInputValueRef = useRef<string>("");
  const { groupId } = useParams<{ groupId: string }>();
  const { accessToken } = useAuthStore.getState();
  const {
    data: groupMemberInviteList,
    isError,
    error,
    isLoading,
    refetch: refetchInviteGroupMember,
  } = useGetGroupMemberInviteList(groupId!, accessToken, inputValue);
  const { mutate: inviteGroupMember } = usePostInviteGroupMember(groupId!, accessToken);
  const { mutate: cancelInviteGroupMember } = useDeleteInviteGroupMember(groupId!, accessToken);
  const initialGetGroupMemberInviteList = useRef(groupMemberInviteList);

  useEffect(() => {
    if (!inputValue && groupMemberInviteList && initialGetGroupMemberInviteList.current) {
      if (
        isEqual(
          groupMemberInviteList.nonGroupFriends,
          initialGetGroupMemberInviteList.current.nonGroupFriends,
        )
      ) {
        return;
      }
      refetchInviteGroupMember();
    }
  }, [inputValue, refetchInviteGroupMember, groupMemberInviteList]);

  const handleInviteGroupMemberClick = (username: string) => {
    inviteGroupMember(username);
  };
  const handleCancelInviteClick = (username: string) => {
    cancelInviteGroupMember(username);
  };
  const handleSearchIconClick = () => {
    if (!inputValue) {
      return;
    }
    if (prevInputValueRef.current === inputValue) {
      return;
    }
    refetchInviteGroupMember();
    prevInputValueRef.current = inputValue;
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
          ) : groupMemberInviteList && groupMemberInviteList.nonGroupFriends.length !== 0 ? (
            <FriendList
              friendList={groupMemberInviteList.nonGroupFriends}
              handleInviteGroupMemberClick={handleInviteGroupMemberClick}
              handleCancelInviteClick={handleCancelInviteClick}
            />
          ) : (
            <div className={styles.error}>
              {inputValue === "" ? (
                <div className={styles.resultMsg}>
                  <div>친구목록이 없습니다.</div>
                  <div
                    className={styles.addFriends}
                    onClick={() => navigate(`/myPage/friendsManagement`)}
                  >
                    친구 추가하러 가기
                  </div>
                </div>
              ) : (
                "검색 결과가 없습니다."
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteGroupMemberPage;
