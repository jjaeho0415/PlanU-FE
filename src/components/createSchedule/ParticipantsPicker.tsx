import styles from "./participants.module.scss";
import Icon_uncheckbox from "@assets/Icons/checkbox/Icon_blankBox.svg?react";
import Icon_checkbox from "@assets/Icons/checkbox/Icon_checkBox_purple.svg?react";

const members = [
  { userId: "shuding", name: "이수현" },
  { userId: "danii", name: "이다은" },
  { userId: "ehgk", name: "김도하" },
  { userId: "jezo", name: "정재호" },
  { userId: "sangjun", name: "이상준" },
  { userId: "twinklehigh", name: "최준혁" },
];

interface IParticipant {
  userId: string;
  name: string;
}

interface props {
  participants: IParticipant[];
  setParticipants: React.Dispatch<React.SetStateAction<IParticipant[]>>;
}

const ParticipantsPicker: React.FC<props> = ({ participants, setParticipants }) => {
  const handleAddParticipants = (member: IParticipant) => {
    if (participants.some((p) => p.userId === member.userId)) {
      setParticipants(participants.filter((p) => p.userId !== member.userId));
    } else {
      setParticipants([...participants, member]);
    }
  };
  return (
    <div className={styles.Container}>
      {members.map((member, index) => {
        const isSelected = participants.some((p) => p.userId === member.userId);
        return (
          <div key={index} className={styles.ItemBox}>
            <div className={styles.Checkbox} onClick={() => handleAddParticipants(member)}>
              {isSelected ? <Icon_checkbox /> : <Icon_uncheckbox />}
            </div>
            <p>{member.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantsPicker;
