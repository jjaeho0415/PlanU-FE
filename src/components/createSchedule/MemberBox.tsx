import React, { useEffect, useState } from "react";
import styles from "./Inputs.module.scss";
import ParticipantsPicker from "./ParticipantsPicker";
import useScheduleStore from "@store/useScheduleStore";
import { useGetGroupMemberList } from "@api/group/getGroupMemberList";
import useAuthStore from "@store/useAuthStore";

interface props {
  groupId?: string;
}

const MemberBox: React.FC<props> = ({ groupId = "" }) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const { participants, setParticipants } = useScheduleStore();
  const { accessToken } = useAuthStore();
  const { data: groupMemberList } = useGetGroupMemberList(accessToken, groupId);

  useEffect(() => {
    if (participants.length !== 0) {
      setParticipants(participants);
    }
  }, [participants]);

  return (
    <div>
      <input
        className={styles.Input}
        onClick={() => {
          setIsSelecting(true);
        }}
        placeholder={participants.length === 0 ? "참석자" : ""}
        value={participants.length === 0 ? "" : participants.map((p) => p.name).join(", ")}
      ></input>
      {isSelecting && (
        <>
          <ParticipantsPicker groupMemberList={groupMemberList} />
          <div className={styles.Done} onClick={() => setIsSelecting(false)}>
            확인
          </div>
        </>
      )}
    </div>
  );
};

export default MemberBox;
