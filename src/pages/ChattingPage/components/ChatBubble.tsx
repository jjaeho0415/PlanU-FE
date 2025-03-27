import React, { useEffect, useState } from "react";
import styles from "./chatBubble.module.scss";
import useAuthStore from "@store/useAuthStore";

interface Props {
  message: IChatItem;
}

const ChatBubble: React.FC<Props> = ({ message }) => {
  const { username } = useAuthStore();
  const [isSentByMe, setIsSentByMe] = useState<boolean>(false);

  useEffect(() => {
    if (username === message.sender) {
      setIsSentByMe(true);
    }
  }, [message.sender]);

  return (
    <div className={`${styles.bubbleContainer} ${isSentByMe ? styles.sent : styles.received}`}>
      {!isSentByMe && message.profileImageUrl && (
        <img
          src={message.profileImageUrl}
          alt={`${message.sender}의 프로필이미지`}
          className={styles.profileImage}
        />
      )}
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
