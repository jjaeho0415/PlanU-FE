import DefaultProfile from "@assets/Icons/groupPage/smallCircleProfile.svg?react";
import MiniButton from "@components/buttons/MiniButton";
import styles from "./memberCard.module.scss";

interface Props {
  memberInfo: {
    name: string;
    username: string;
    profileImageUrl?: string;
  };
  activeTab: "친구목록" | "받은요청" | "보낸요청";
  isEditing?: boolean;
}

const MemberCard: React.FC<Props> = ({ memberInfo, activeTab, isEditing = false }) => {
  const handleShowFriendCalendar = () => {};

  const handleRequestFriend = () => {};

  const handleCancelRequestFriend = () => {};

  const handleRejectFriendRequest = () => {};

  const handleDeleteMember = () => {};

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
              onClick={handleRequestFriend}
            />
            <MiniButton buttonText="거절" color="gray" onClick={handleRejectFriendRequest} />
          </>
        );
      case "보낸요청":
        return (
          <>
            <MiniButton buttonText="요청중.." color="white" />
            <MiniButton buttonText="요청취소" color="red" onClick={handleCancelRequestFriend} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.memberCardContainer}>
      <div className={styles.leftSection}>
        <div className={styles.profileSection}>
          {memberInfo.profileImageUrl ? (
            <img src={memberInfo.profileImageUrl} width={38} height={37} alt="profile" />
          ) : (
            <DefaultProfile width={38} height={37} className={styles.profileImage} />
          )}
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
