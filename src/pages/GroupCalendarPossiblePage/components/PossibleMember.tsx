import React from "react";
import styles from "./possible.module.scss";

interface props {
  possibleMembers: string[];
}

const PossibleMember: React.FC<props> = ({ possibleMembers }) => {
  return (
    <div className={styles.Container}>
      <p className={styles.TextTitle}>가능한 멤버 |</p>
      {possibleMembers.map((member) => (
        <p key={member} className={styles.TextMembers}>
          {member},
        </p>
      ))}
    </div>
  );
};

export default PossibleMember;
