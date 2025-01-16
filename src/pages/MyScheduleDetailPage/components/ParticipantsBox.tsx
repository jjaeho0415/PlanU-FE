import React from "react";
import styles from "./Boxes.module.scss";
import Icon_checkbox from "../../../assets/Icons/checkbox/Icon_checkBox_check.svg?react";

const participants = [
  { name: "이수현" },
  { name: "이다은" },
  { name: "정재호" },
  { name: "최준혁" },
  { name: "김도하" },
  { name: "이상준" },
];

const ParticipantsBox: React.FC = () => {
  return (
    <div className={styles.ParticipantsContainer}>
      <p>참석자</p>
      <div className={styles.ParticipantsBox}>
        {participants.map((participant) => (
          <div key={participant.name}>
            <Icon_checkbox />
            <p>{participant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsBox;
