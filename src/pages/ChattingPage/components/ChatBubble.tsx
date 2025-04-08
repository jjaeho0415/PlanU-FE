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
      <p className={styles.UnreadCount}>
        {message.unReadCount > 0 && isSentByMe && message.unReadCount}
      </p>
      <div className={styles.RightContainer}>
        {!isSentByMe && <p className={styles.SenderName}>{message.name}</p>}
        <div className={styles.bubble}>
          <p className={`${styles.text} ${isSentByMe ? styles.sentText : styles.receivedText}`}>
            {message.message}
          </p>
          <span className={styles.time}>{message.chatTime}</span>
        </div>
      </div>
      <p className={styles.UnreadCount}>
        {message.unReadCount > 0 && !isSentByMe && message.unReadCount}
      </p>
    </div>
  );
};

export default ChatBubble;
