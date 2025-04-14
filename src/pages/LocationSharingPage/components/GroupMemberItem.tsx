import { calculateDistance } from "@utils/calculateDistance";
import styles from "./groupMemberItem.module.scss";

interface Props {
  groupMemberItem: IMemberLocationType;
  handleGroupMemberClick: () => void;
  arrivalLocationInfo: IArrivalLocationInfo;
  selectedUserName: string 
}

const GroupMemberItem: React.FC<Props> = ({
  groupMemberItem,
  handleGroupMemberClick,
  arrivalLocationInfo,
  selectedUserName,
}) => {
  const distance = calculateDistance(
    groupMemberItem.latitude,
    groupMemberItem.longitude,
    arrivalLocationInfo.latitude,
    arrivalLocationInfo.longitude,
  );

  const isSelected = selectedUserName === groupMemberItem.username;

  return (
    <div
      className={`${styles.groupMemberItem} ${isSelected && styles.selected}`}
      onClick={handleGroupMemberClick}
    >
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
        <div className={styles.location}>
          {distance === 0 ? "도착" : distance.toFixed(2) + "km 남음"}
        </div>
      </div>
    </div>
  );
};

export default GroupMemberItem;
