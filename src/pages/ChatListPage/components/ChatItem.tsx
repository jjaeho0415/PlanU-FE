import ArrowIcon from "@assets/Icons/arrow/RightArrow.svg?react";
import PinnedIcon from "@assets/Icons/chatt/pinned.svg?react";
import React from "react";
import styles from "./chatItem.module.scss";

interface ChatItemProps {
  chatRoom: IChatRoomResponseType;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatRoom }) => {
  return (
    <div className={styles.chatItem}>
      <img
        src={chatRoom.groupImageUrl}
        alt={`${chatRoom.groupName} 프로필`}
        className={styles.profileImage}
      />

      <div className={styles.chatContentWrapper}>
        <div className={styles.chatContent}>
          <div className={styles.groupName}>
            {chatRoom.groupName}
            {chatRoom.isPin && <PinnedIcon className={styles.pinnedIcon} />}
          </div>
          <div className={styles.lastMessage}>{chatRoom.lastChat}</div>
        </div>

        <div className={styles.timeInfo}>
          <span className={styles.time}>{chatRoom.lastChatTime}</span>
          <ArrowIcon className={styles.arrowIcon} />

          {chatRoom.unreadChats && chatRoom.unreadChats > 0 && (
            <div className={styles.notification}>{chatRoom.unreadChats}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
