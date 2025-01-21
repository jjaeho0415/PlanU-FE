import styles from "./memberItem.module.scss";
import DefaultProfile from "@assets/Icons/groupPage/smallCircleProfile.svg?react";
import CrownIcon from "@assets/Icons/groupPage/crownIcon.svg?react";
import MiniButton from "@components/buttons/MiniButton";
import { usePostRequestFriend } from "@api/friend/postRequestFriend";
import useAuthStore from "@store/useAuthStore";

interface Props {
  memberInfo: IGroupMemberType;
  isUserLeader: boolean;
}

const MemberItem: React.FC<Props> = ({ memberInfo, isUserLeader }) => {
  const { accessToken } = useAuthStore.getState();
  const {mutate: requestFriend } = usePostRequestFriend(accessToken)
  const handleRequestFriend = (username: string) => {
    requestFriend(username);
  };

  const handleForcedExit = () => {
    // 강제퇴장
    return;
  };

  const handleShowFriendCalendar = () => {
    // 달력 보기
    return;
  };

  const handleCancelRequestFriend = () => {
    // 친구 요청 취소
    return;
  };

  const handleLeaveGroup = () => {
    // 그룹 탈퇴
    return;
  };

  const handleDeleteGroup = () => {
    // 그룹 삭제
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
            <MiniButton buttonText="요청취소" color="red" onClick={handleCancelRequestFriend} />
          </>
        );
      }
      else {
        return (
          <>
            <MiniButton buttonText="요청수락" color="purple_light" />
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
            <MiniButton buttonText="강제퇴장" color="gray" onClick={handleForcedExit} />
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
            <MiniButton buttonText="강제퇴장" color="gray" onClick={handleForcedExit} />
          </>
        );
      } else if(memberInfo.friendStatus === "REQUEST") {
        return (
          <>
            <MiniButton buttonText="요청중.." color="white" />
            <MiniButton buttonText="요청취소" color="red" onClick={handleCancelRequestFriend} />
            <MiniButton buttonText="강제퇴장" color="gray" onClick={handleForcedExit} />
          </>
        );
      }
      else {
        return (
          <>
            <MiniButton buttonText="요청수락" color="purple_light" />
            <MiniButton buttonText="강제퇴장" color="gray" onClick={handleForcedExit} />
          </>
        );
      }
    }
  };

  return (
    <div className={styles.memberItemContainer}>
      <div className={styles.leftSection}>
        <div className={styles.profileSection}>
          {memberInfo.profileImageUrl ? (
            <img src={memberInfo.profileImageUrl} width={38} height={37} alt="profile" />
          ) : (
            <DefaultProfile width={38} height={37} />
          )}
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
