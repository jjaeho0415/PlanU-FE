import React, { useEffect, useState } from "react";
import styles from "./Inputs.module.scss";
import ParticipantsPicker from "./ParticipantsPicker";
import useScheduleStore from "@store/useScheduleStore";

const MemberBox: React.FC = ({}) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const { participants, setParticipants } = useScheduleStore();

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
          <ParticipantsPicker />
          <div className={styles.Done} onClick={() => setIsSelecting(false)}>
            확인
          </div>
        </>
      )}
    </div>
  );
};

export default MemberBox;
