import React from "react";
import styles from "./possible.module.scss";

interface props {
  possibleMembers: string[];
}

const PossibleMember: React.FC<props> = ({ possibleMembers }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.TitleBox}>가능한 멤버</div>
      <div className={styles.MemberBox}>
        {possibleMembers.map((member, index) => (
          <p key={index} className={styles.TextMembers}>
            {member}
            {possibleMembers.length - 1 !== index && ","}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PossibleMember;
