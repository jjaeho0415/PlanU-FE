import styles from "./memberItem.module.scss";
import CrownIcon from "@assets/Icons/groupPage/crownIcon.svg?react";
import MiniButton from "@components/buttons/MiniButton";
import { usePostRequestFriend } from "@api/friend/postRequestFriend";
import useAuthStore from "@store/useAuthStore";
import { useDeleteCancelRequestFriend } from "@api/friend/deleteCancelRequestFriend";
import { usePostAcceptRequestFriend } from "@api/friend/postAcceptRequestFriend";
import { useDeleteRejectRequestFriend } from "@api/friend/deleteRejectRequestFriend";
import { useDeleteGroup } from "@api/group/deleteGroup";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteLeaveGroup } from "@api/group/deleteLeaveGroup";
import { useDeleteForcedWithdrawalFromGroup } from "@api/group/deleteForcedWithdrawalFromGroup";

interface Props {
  memberInfo: IGroupMemberItemType;
  isUserLeader: boolean;
}

const MemberItem: React.FC<Props> = ({ memberInfo, isUserLeader }) => {
  const { accessToken } = useAuthStore.getState();
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const { mutate: requestFriend } = usePostRequestFriend(accessToken);
  const { mutate: cancelRequestFriend } = useDeleteCancelRequestFriend(accessToken);
  const { mutate: acceptRequestFriend } = usePostAcceptRequestFriend(accessToken);
  const { mutate: rejectRequestFriend } = useDeleteRejectRequestFriend(accessToken);
  const { mutate: deleteGroup } = useDeleteGroup(accessToken, Number(groupId));
  const { mutate: leaveGroup } = useDeleteLeaveGroup(accessToken, Number(groupId));
  const { mutate: forcedWithdrawalGroup } = useDeleteForcedWithdrawalFromGroup(
    accessToken,
    Number(groupId),
  );

  const handleRequestFriend = (username: string) => {
    requestFriend(username);
  };

  const handleAcceptRequestFriend = (username: string) => {
    acceptRequestFriend(username);
  };

  const handleRejectRequestFriend = (username: string) => {
    rejectRequestFriend(username);
  };

  const handleCancelRequestFriend = (username: string) => {
    cancelRequestFriend(username);
  };

  const handleForcedWithdraw = (username: string) => {
    forcedWithdrawalGroup(username);
  };

  const handleLeaveGroup = () => {
    leaveGroup();
  };

  const handleDeleteGroup = () => {
    deleteGroup();
  };

  const handleShowFriendCalendar = () => {
    navigate(`/myCalendar/${memberInfo.username}`);
    return;
  };

  const buttonList = () => {
    // 사용자가 리더가 아닌경우
    if (!isUserLeader) {
      if (memberInfo.friendStatus === "FRIEND") {
        return (
          <>
            <MiniButton buttonText="친구" isCheck={true} color="gray" />
            <MiniButton
              buttonText="달력보기"
              color="white"
              isCalendar={true}
              onClick={handleShowFriendCalendar}
            />
          </>
        );
      } else if (memberInfo.friendStatus === "ME") {
        return <MiniButton buttonText="그룹탈퇴" color="red" onClick={handleLeaveGroup} />;
      } else if (memberInfo.friendStatus === "NONE") {
        return (
          <MiniButton
            buttonText="친구요청"
            color="purple_light"
            isAddFriend={true}
            onClick={() => handleRequestFriend(memberInfo.username)}
          />
        );
      } else if (memberInfo.friendStatus === "REQUEST") {
        return (
          <>
            <MiniButton buttonText="요청중.." color="white" />
            <MiniButton
              buttonText="요청취소"
              color="red"
              onClick={() => handleCancelRequestFriend(memberInfo.username)}
            />
          </>
        );
      } else {
        return (
          <>
            <MiniButton
              buttonText="친구수락"
              color="purple"
              onClick={() => handleAcceptRequestFriend(memberInfo.username)}
            />
            <MiniButton
              buttonText="친구거절"
              color="red"
              onClick={() => handleRejectRequestFriend(memberInfo.username)}
            />
          </>
        );
      }
    }
    // 사용자가 리더인경우
    else {
      if (memberInfo.friendStatus === "ME") {
        return <MiniButton buttonText="그룹삭제" color="red" onClick={handleDeleteGroup} />;
      } else if (memberInfo.friendStatus === "FRIEND") {
        return (
          <>
            <MiniButton buttonText="친구" isCheck={true} color="gray" />
            <MiniButton
              buttonText="달력보기"
              color="white"
              isCalendar={true}
              onClick={handleShowFriendCalendar}
            />
            <MiniButton
              buttonText="강제퇴장"
              color="gray"
              onClick={() => handleForcedWithdraw(memberInfo.username)}
            />
          </>
        );
      } else if (memberInfo.friendStatus === "NONE") {
        return (
          <>
            <MiniButton
              buttonText="친구요청"
              color="purple_light"
              isAddFriend={true}
              onClick={() => handleRequestFriend(memberInfo.username)}
            />
            <MiniButton
              buttonText="강제퇴장"
              color="gray"
              onClick={() => handleForcedWithdraw(memberInfo.username)}
            />
          </>
        );
      } else if (memberInfo.friendStatus === "REQUEST") {
        return (
          <>
            <MiniButton buttonText="요청중.." color="white" />
            <MiniButton
              buttonText="요청취소"
              color="red"
              onClick={() => handleCancelRequestFriend(memberInfo.username)}
            />
            <MiniButton
              buttonText="강제퇴장"
              color="gray"
              onClick={() => handleForcedWithdraw(memberInfo.username)}
            />
          </>
        );
      } else {
        return (
          <>
            <MiniButton
              buttonText="친구수락"
              color="purple_light"
              onClick={() => handleAcceptRequestFriend(memberInfo.username)}
            />
            <MiniButton
              buttonText="친구거절"
              color="red"
              onClick={() => handleRejectRequestFriend(memberInfo.username)}
            />
            <MiniButton
              buttonText="강제퇴장"
              color="gray"
              onClick={() => handleForcedWithdraw(memberInfo.username)}
            />
          </>
        );
      }
    }
  };

  return (
    <div className={styles.memberItemContainer}>
      <div className={styles.leftSection}>
        <div className={styles.profileSection}>
          <img src={memberInfo.profileImage} width={38} height={37} alt="profile" className={styles.profile} />
          {memberInfo.groupRole === "LEADER" && (
            <CrownIcon width={29} height={25} className={styles.crownIcon} />
          )}
        </div>
        <div className={styles.textSection}>
          <div className={styles.nameSection}>{memberInfo.name}</div>
          <div className={styles.idSection}>@{memberInfo.username}</div>
        </div>
      </div>
      <div className={styles.rightSection}>{buttonList()}</div>
    </div>
  );
};

export default MemberItem;
