import styles from "./participants.module.scss";
import Icon_uncheckbox from "@assets/Icons/checkbox/Icon_blankBox.svg?react";
import Icon_checkbox from "@assets/Icons/checkbox/Icon_checkBox_purple.svg?react";

const members: IGetMemberType[] = [
  { userName: "shuding", name: "이수현", profileImage: "" },
  { userName: "danii", name: "이다은", profileImage: "" },
  { userName: "ehgk", name: "김도하", profileImage: "" },
  { userName: "jezo", name: "정재호", profileImage: "" },
  { userName: "sangjun", name: "이상준", profileImage: "" },
  { userName: "twinklehigh", name: "최준혁", profileImage: "" },
];

interface props {
  participants: IGetMemberType[];
  setParticipants: React.Dispatch<React.SetStateAction<IGetMemberType[]>>;
}

const ParticipantsPicker: React.FC<props> = ({ participants, setParticipants }) => {
  const handleAddParticipants = (member: IGetMemberType) => {
    if (participants.some((p) => p.userName === member.userName)) {
      setParticipants(participants.filter((p) => p.userName !== member.userName));
    } else {
      setParticipants([...participants, member]);
    }
  };

  return (
    <div className={styles.Container}>
      {members.map((member, index) => {
        const isSelected = participants.some((m) => m.userName === member.userName);
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
