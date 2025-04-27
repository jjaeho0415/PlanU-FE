import React from "react";
import styles from "./chatBubble.module.scss";

interface Props {
  message: IChatItem;
  isSentByMe: boolean;
  type: number;
}

const ChatBubble: React.FC<Props> = ({ message, isSentByMe, type }) => {
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
          {type === 1 && (
            <p className={`${isSentByMe ? styles.sentText : styles.receivedText}`}>
              {message.message}
            </p>
          )}
          {type === 2 && (
            <img
              src={message.message}
              className={`${styles.image} ${isSentByMe ? styles.sentText : styles.receivedText}`}
            />
          )}
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
