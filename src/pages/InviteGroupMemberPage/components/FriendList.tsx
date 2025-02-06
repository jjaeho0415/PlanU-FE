import FriendItem from "./FriendItem";
import styles from "./friendList.module.scss";

interface Props {
  friendList: IGetNonGroupFriendType[];
  handleInviteGroupMemberClick: (username: string) => void;
  handleCancelInviteClick: (username: string) => void;
}

const FriendList: React.FC<Props> = ({
  friendList,
  handleInviteGroupMemberClick,
  handleCancelInviteClick,
}) => {
  return (
    <div className={styles.friendList}>
      {friendList.map((friend) => (
        <FriendItem
          friendInfo={friend}
          handleCancelInviteClick={handleCancelInviteClick}
          handleInviteGroupMemberClick={handleInviteGroupMemberClick}
        />
      ))}
    </div>
  );
};

export default FriendList;
