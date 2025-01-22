import { useEffect, useState } from "react";
import MemberItem from "./MemberItem";
import styles from "./memberList.module.scss";

interface Props {
  memberList: IGroupMemberType[];
}

const MemberList: React.FC<Props> = ({ memberList }) => {
  const [isUserLeader, setIsUserLeader] = useState<boolean>(false);

  useEffect(() => {
    memberList.map(
      (member) =>
        member.friendStatus === "ME" && member.groupRole === "LEADER" && setIsUserLeader(true),
    );
  }, [memberList]);

  return (
    <div className={styles.memberList}>
      {memberList.map((member) => (
        <MemberItem memberInfo={member} isUserLeader={isUserLeader} key={member.username} />
      ))}
    </div>
  );
};

export default MemberList;
