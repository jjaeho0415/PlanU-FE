import React from "react";
import styles from "./chatBubble.module.scss";

interface Props {
  message: IChatItem;
  isSentByMe?: boolean;
}

const ChatBubble: React.FC<Props> = ({ message, isSentByMe = false }) => {
  return (
    <div className={`${styles.bubbleContainer} ${isSentByMe ? styles.sent : styles.received}`}>
      {/* {!isSentByMe && message.profileImageURL && ( */}
      <img
        src={message.profileImageURL}
        alt={`${message.sender}의 프로필이미지`}
        className={styles.profileImage}
      />
      {/* )} */}
      <div className={styles.bubble}>
        <p className={`${styles.text} ${isSentByMe ? styles.sentText : styles.receivedText}`}>
          {message.message}
        </p>
        <span className={styles.time}>{message.chatTime}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
