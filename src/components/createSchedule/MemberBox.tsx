import React, { useEffect, useState } from "react";
import styles from "./Inputs.module.scss";
import ParticipantsPicker from "./ParticipantsPicker";

interface props {
  participants: IGetMemberType[];
  setParticipants: React.Dispatch<React.SetStateAction<IGetMemberType[]>>;
  unregisteredParticipnats?: string[];
  setUnregisteredParticipants?: React.Dispatch<React.SetStateAction<string[]>>;
}

const MemberBox: React.FC<props> = ({
  participants,
  setParticipants,
  unregisteredParticipnats,
  setUnregisteredParticipants,
}) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

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
