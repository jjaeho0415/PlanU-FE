import React from "react";
import styles from "./possible.module.scss";

interface props {
  possibleMemberList: IGetGroupAvailableDatesMemberListResponseBodyType | undefined;
}

const PossibleMember: React.FC<props> = ({ possibleMemberList }) => {
  return (
    <div className={styles.Container}>
      {!possibleMemberList ? (
        <div className={styles.loading}>로딩중...</div>
      ) : (
        <>
          <div className={styles.TitleBox}>가능한 멤버</div>
          <div className={styles.line} />
          <div className={styles.MemberBox}>
            {possibleMemberList.availableMembers.length > 0
              ? possibleMemberList.availableMembers.map((member, index) => (
                  <p key={index} className={styles.TextMembers}>
                    {member}
                    {possibleMemberList.availableMembers.length - 1 !== index && ","}
                  </p>
                ))
              : "가능한 멤버가 없습니다."}
          </div>
        </>
      )}
    </div>
  );
};

export default PossibleMember;
