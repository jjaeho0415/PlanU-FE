import styles from "./groupMemberItem.module.scss";

interface Props {
  groupMemberItem: IGetGroupMemberItemType;
  handleGroupMemberClick: () => void;
}

const GroupMemberItem: React.FC<Props> = ({ groupMemberItem, handleGroupMemberClick }) => {
  return (
    <div className={styles.groupMemberItem} onClick={handleGroupMemberClick}>
      <div className={styles.profileImageSection}>
        <img
          src={
            groupMemberItem.profileImage
              ? groupMemberItem.profileImage
              : "https://planu-storage-main.s3.ap-northeast-2.amazonaws.com/defaultProfile.png"
          }
          className={styles.profileImage}
          alt={`${groupMemberItem.name}의 프로필`}
        />
      </div>
      <div className={styles.userInfoSection}>
        <div className={styles.name}>{groupMemberItem.name}</div>
        <div className={styles.location}>{groupMemberItem.location}</div>
      </div>
    </div>
  );
};

export default GroupMemberItem;
