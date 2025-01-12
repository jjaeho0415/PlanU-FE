import CloseIcon from "@assets/Icons/Close/Icon_close.svg?react";
import React from "react";
import styles from "./profileItem.module.scss";

interface Props {
  name: string;
  imageUrl: string;
  onRemove: () => void;
}

const ProfileItem: React.FC<Props> = ({ name, imageUrl, onRemove }) => {
  return (
    <div className={styles.profileItem}>
      <img src={imageUrl} alt={name} className={styles.avatar} />
      <span className={styles.name}>{name}</span>
      <button onClick={onRemove} className={styles.removeButton}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ProfileItem;
