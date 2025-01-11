import React from "react";
import styles from "./chatBubble.module.scss";

interface Props {
  text: string;
  time: string;
  isSentByMe: boolean;
  userImage?: string;
}

const ChatBubble: React.FC<Props> = ({ text, time, isSentByMe, userImage }) => {
  return (
    <div className={`${styles.bubbleContainer} ${isSentByMe ? styles.sent : styles.received}`}>
      {!isSentByMe && userImage && <img src={userImage} alt="" className={styles.avatar} />}
      <div className={styles.bubble}>
        <p className={`${styles.text} ${isSentByMe ? styles.sentText : styles.receivedText}`}>
          {text}
        </p>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
