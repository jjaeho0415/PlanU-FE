import React, { useEffect, useState } from "react";
import styles from "./Inputs.module.scss";
import ParticipantsPicker from "./ParticipantsPicker";

interface IParticipant {
  userId: string;
  name: string;
}

interface props {
  members?: IParticipant[];
}

const MemberBox: React.FC<props> = ({ members = [] }) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  useEffect(() => {
    if (members.length !== 0) {
      setParticipants(members);
    }
  }, []);

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
          <ParticipantsPicker participants={participants} setParticipants={setParticipants} />
          <div className={styles.Done} onClick={() => setIsSelecting(false)}>
            확인
          </div>
        </>
      )}
    </div>
  );
};

export default MemberBox;
