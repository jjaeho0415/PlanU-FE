import { useDeleteCancelRequestFriend } from "@api/friend/deleteCancelRequestFriend";
import { useDeleteDeleteFriends } from "@api/friend/deleteDeleteFriends";
import { useDeleteRejectRequestFriend } from "@api/friend/deleteRejectRequestFriend";
import { usePostAcceptRequestFriend } from "@api/friend/postAcceptRequestFriend";
import { usePostRequestFriend } from "@api/friend/postRequestFriend";
import MiniButton from "@components/buttons/MiniButton";
import useAuthStore from "@store/useAuthStore";
import styles from "./memberCard.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  memberInfo: IFriendItemType;
  activeTab: "친구목록" | "받은요청" | "보낸요청";
  isEditing?: boolean;
  hasSentRequest?: boolean;
  setSentRequestUsernames?: React.Dispatch<React.SetStateAction<string[]>>;
}

const MemberCard: React.FC<Props> = ({
  memberInfo,
  activeTab,
  isEditing = false,
  hasSentRequest,
  setSentRequestUsernames,
}) => {
  const { accessToken } = useAuthStore.getState();
  const { mutate: cancelRequestFriend } = useDeleteCancelRequestFriend(accessToken);
  const { mutate: acceptRequestFriend } = usePostAcceptRequestFriend(accessToken);
  const { mutate: rejectRequestFriend } = useDeleteRejectRequestFriend(accessToken);
  const { mutate: deleteFriend } = useDeleteDeleteFriends(accessToken);
  const { mutate: sendFriendRequest } = usePostRequestFriend(accessToken);
  const navigate = useNavigate();

  const handleShowFriendCalendar = () => {
    navigate(`/myCalendar/${memberInfo.name}/${memberInfo.username}`);
  };

  const handleCancelRequestFriend = () => {
    cancelRequestFriend(memberInfo.username);
  };

  const handleRejectFriendRequest = () => {
    rejectRequestFriend(memberInfo.username);
  };

  const handleAcceptRequestFriend = () => {
    acceptRequestFriend(memberInfo.username);
  };

  const handleDeleteMember = () => {
    deleteFriend(memberInfo.username);
  };

  const handleSendFriendRequest = () => {
    sendFriendRequest(memberInfo.username, {
      onSuccess: () => {
        setSentRequestUsernames?.((prev) => [...prev, memberInfo.username]);
      },
    });
  };

  const renderButtons = () => {
    if (isEditing && activeTab === "친구목록") {
      return <MiniButton buttonText="삭제" color="gray" onClick={handleDeleteMember} />;
    }

    switch (activeTab) {
      case "친구목록":
        return (
          <MiniButton
            buttonText="달력보기"
            color="white"
            isCalendar
            onClick={handleShowFriendCalendar}
          />
        );
      case "받은요청":
        return (
          <>
            <MiniButton
              buttonText="수락"
              color="purple"
              isAddFriend
              onClick={handleAcceptRequestFriend}
            />
            <MiniButton buttonText="거절" color="gray" onClick={handleRejectFriendRequest} />
          </>
        );
      case "보낸요청":
        return hasSentRequest ? (
          <>
            <MiniButton buttonText="요청중.." color="white" />
            <MiniButton buttonText="요청취소" color="red" onClick={handleCancelRequestFriend} />
          </>
        ) : (
          <MiniButton color="purple" isFriendRequest={true} onClick={handleSendFriendRequest} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.memberCardContainer}>
      <div className={styles.leftSection}>
        <div className={styles.profileSection}>
          <img src={memberInfo.profileImageUrl} width={40} height={40} alt="profile" />
        </div>

        <div className={styles.textSection}>
          <div className={styles.nameSection}>{memberInfo.name}</div>
          <div className={styles.idSection}>@{memberInfo.username}</div>
        </div>
      </div>

      <div className={styles.rightSection}>{renderButtons()}</div>
    </div>
  );
};

export default MemberCard;
