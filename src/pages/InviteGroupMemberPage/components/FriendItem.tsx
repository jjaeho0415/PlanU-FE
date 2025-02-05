import MiniButton from "@components/buttons/MiniButton";
import styles from "./friendItem.module.scss";

interface Props {
  friendInfo: IGetNonGroupFriendType;
  handleInviteGroupMemberClick: (username:string) => void;
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
          <img src={friendInfo.profileImage} width={42.43} height={40} alt="profile" />
        </div>
        <div className={styles.friendInfoSection}>
          <div>{friendInfo.name}</div>
          <div className={styles.friendId}>@{friendInfo.username}</div>
        </div>
      </div>
      <div className={styles.rightSection}>
        {friendInfo.status === "NONE" ? (
          <MiniButton
            buttonText="친구 초대"
            color="purple_light"
            isAddFriend={true}
            onClick={() => handleInviteGroupMemberClick(friendInfo.username)}
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
