import React from "react";
import styles from "./mini.module.scss";
import Icon_calendar from "@assets/Icons/Icon_calendar.svg?react";
import Icon_add from "@assets/Icons/Icon_add.svg?react";

interface IMiniButton {
  buttonText: string;
  color: "purple" | "purple_light" | "white" | "gray" | "red";
  isCalendar?: boolean;
  isAddFriend?: boolean;
  onClick: () => void;
}

const MiniButton: React.FC<IMiniButton> = ({
  buttonText,
  color,
  isCalendar = false,
  isAddFriend = false,
  onClick,
}) => {
  return (
    <div className={`${styles.Container} ${styles[color]}`} onClick={onClick}>
      {isCalendar && <Icon_calendar />}
      <p>{buttonText}</p>
      {isAddFriend && <Icon_add />}
    </div>
  );
};

export default MiniButton;
