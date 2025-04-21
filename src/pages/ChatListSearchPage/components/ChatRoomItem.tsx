import React from "react";
import styles from "./chatRoomItem.module.scss";

interface Props {
  name: string;
  imageUrl: string;
}

const ChatRoomItem: React.FC<Props> = ({ name, imageUrl }) => {
  return (
    <div className={styles.profileItem}>
      <img src={imageUrl} alt={name} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default ChatRoomItem;
