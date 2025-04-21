import React from "react";
import styles from "./chatBubble.module.scss";

interface Props {
  message: IChatItem;
  isSentByMe: boolean;
}

const ChatBubble: React.FC<Props> = ({ message, isSentByMe }) => {
  return (
    <div className={`${styles.bubbleContainer} ${isSentByMe ? styles.sent : styles.received}`}>
      {!isSentByMe && message.profileImageUrl && (
        <img
          src={message.profileImageUrl}
          alt={`${message.sender}의 프로필이미지`}
          className={styles.profileImage}
        />
      )}
      {isSentByMe && (
        <div className={styles.MyTimeUnreadCountBox}>
          <p className={styles.UnreadCount}>{message.unReadCount > 0 && message.unReadCount}</p>
          <span className={styles.time}>{message.chatTime}</span>
        </div>
      )}
      <div className={styles.MiddleContainer}>
        {!isSentByMe && <p className={styles.SenderName}>{message.name}</p>}
        <div className={styles.bubble}>
          <p className={`${styles.text} ${isSentByMe ? styles.sentText : styles.receivedText}`}>
            {message.message}
          </p>
        </div>
      </div>
      {!isSentByMe && (
        <div className={styles.TimeUnreadCountBox}>
          <p className={styles.UnreadCount}>{message.unReadCount > 0 && message.unReadCount}</p>
          <span className={styles.time}>{message.chatTime}</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
