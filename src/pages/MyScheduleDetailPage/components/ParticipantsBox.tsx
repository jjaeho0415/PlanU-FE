import React from "react";
import styles from "./Boxes.module.scss";
import Icon_checkbox from "../../../assets/Icons/checkbox/Icon_checkBox_purple.svg?react";

interface Props {
  participants: IParticipants[] | null;
}

const ParticipantsBox: React.FC<Props> = ({ participants }) => {
  return (
    <div className={styles.ParticipantsContainer}>
      <p>참석자</p>
      <div className={styles.ParticipantsBox}>
        {participants?.map((participant) => (
          <div className={styles.ParticipantItem} key={participant.name}>
            <Icon_checkbox className={styles.Checkbox} />
            <img
              src={participant.profileImage}
              alt={`${participant.username}의 프로필`}
              className={styles.ProfileImage}
            />
            <p>{participant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsBox;
