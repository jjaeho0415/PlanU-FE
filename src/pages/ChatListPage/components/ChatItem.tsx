import ArrowIcon from "@assets/Icons/arrow/RightArrow.svg?react";
import PinnedIcon from "@assets/Icons/chatt/pinned.svg?react";
import React from "react";
import styles from "./chatItem.module.scss";

interface ChatItemProps {
  profileImage: string;
  groupName: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isPinned?: boolean;
  showNotification?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({
  profileImage,
  groupName,
  lastMessage,
  time,
  unreadCount,
  isPinned = false,
  showNotification = false,
}) => {
  return (
    <div className={styles.chatItem}>
      <img src={profileImage} alt={`${groupName} 프로필`} className={styles.profileImage} />

      <div className={styles.chatContentWrapper}>
        <div className={styles.chatContent}>
          <div className={styles.groupName}>
            {groupName}
            {isPinned && <PinnedIcon className={styles.pinnedIcon} />}
          </div>
          <div className={styles.lastMessage}>{lastMessage}</div>
        </div>

        <div className={styles.timeInfo}>
          <span className={styles.time}>{time}</span>
          <ArrowIcon className={styles.arrowIcon} />

          {showNotification && unreadCount && unreadCount > 0 && (
            <div className={styles.notification}>{unreadCount}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
