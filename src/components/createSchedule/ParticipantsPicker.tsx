import { useGetGroupMemberList } from "@api/group/getGroupMemberList";
import styles from "./participants.module.scss";
import Icon_uncheckbox from "@assets/Icons/checkbox/Icon_blankBox.svg?react";
import Icon_checkbox from "@assets/Icons/checkbox/Icon_checkBox_purple.svg?react";
import useScheduleStore from "@store/useScheduleStore";
import useAuthStore from "@store/useAuthStore";

interface props {
  creator: string;
  groupId?: string;
}

const ParticipantsPicker: React.FC<props> = ({ creator, groupId = "" }) => {
  const { accessToken } = useAuthStore();
  const { data: groupMemberList } = useGetGroupMemberList(accessToken, groupId);
  const { participants, setParticipants } = useScheduleStore();

  const handleAddParticipants = (member: IGroupMemberItemType) => {
    if (member.username === creator) return;
    else if (participants.some((p) => p.username === member.username)) {
      setParticipants(participants.filter((p) => p.username !== member.username));
    } else {
      setParticipants([...participants, member]);
    }
  };

  return (
    <div className={styles.Container}>
      {groupMemberList?.members.map((member, index) => {
        const isSelected = participants.some((m) => m.username === member.username);
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
