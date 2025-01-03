import MiniButton from "@components/buttons/MiniButton";
import styles from "./friendItem.module.scss";
import DefaultProfile from "@assets/Icons/Default Profile/default_profile.svg?react";

interface Props {
  friendInfo: IGetFriendMemberType;
  handleInviteGroupMemberClick: () => void;
  handleCancelInviteClick: () => void;
}

const FriendItem: React.FC<Props> = ({
  friendInfo,
  handleInviteGroupMemberClick,
  handleCancelInviteClick,
}) => {
  return (
    <div className={styles.friendItem}>
      <div className={styles.leftSection}>
        <div className={styles.profileSection}>
          {friendInfo.profileImageUrl ? (
            <img src={friendInfo.profileImageUrl} width={42.43} height={40} alt="profile" />
          ) : (
            <DefaultProfile width={40} height={25} />
          )}
        </div>
        <div>{friendInfo.name}</div>
      </div>
      <div className={styles.rightSection}>
        {friendInfo.requestState === "none" ? (
          <MiniButton
            buttonText="친구 초대"
            color="purple_light"
            isAddFriend={true}
            onClick={handleInviteGroupMemberClick}
          />
        ) : (
          <>
            <MiniButton buttonText="요청중..." color="white" />
            <MiniButton buttonText="요청취소" color="red" onClick={handleCancelInviteClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default FriendItem;
