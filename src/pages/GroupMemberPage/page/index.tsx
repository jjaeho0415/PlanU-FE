import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import styles from "./groupMember.module.scss";
import { useState } from "react";
import SearchBox from "@pages/InviteGroupMemberPage/components/SearchBox";
import MemberList from "../components/memberList";

const groupMembers: IGetGroupMembersType = {
  members: [
    {
      name: "이수현",
      username: "shuding0307",
      groupRole: "PARTICIPANT",
      friendStatus: "FRIEND",
      profileImageUrl: "",
    },
    {
      name: "이다은",
      username: "Euniii0713",
      groupRole: "PARTICIPANT",
      friendStatus: "NOT_FRIEND",
      profileImageUrl: "",
    },
    {
      name: "이상준",
      username: "sang__00",
      groupRole: "PARTICIPANT",
      friendStatus: "NOT_FRIEND",
      profileImageUrl: "",
    },
    {
      name: "김도하",
      username: "ehgk4245",
      groupRole: "PARTICIPANT",
      friendStatus: "FRIEND",
      profileImageUrl: "",
    },
    {
      name: "최준혁",
      username: "_twinkle_high",
      groupRole: "PARTICIPANT",
      friendStatus: "RECEIVE",
      profileImageUrl: "",
    },
    {
      name: "정재호",
      username: "purify_0kcal",
      groupRole: "LEADER",
      friendStatus: "ME",
      profileImageUrl: "",
    },
  ],
};

const GroupMemberPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    // 검색 api 호출 로직 작성
    return;
  };

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="멤버" handleClick={() => navigate(-1)} />
      <div className={styles.contentContainer}>
        <div className={styles.searchContainer}>
          <SearchBox
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="invite"
            handleSearchIconClick={handleSearchIconClick}
          />
        </div>
        <div className={styles.memberListContainer}>
          <div className={styles.textBox}>멤버목록</div>
          <div className={styles.emptyBox} />
          <div className={styles.scrollContainer}>
            <MemberList memberList={groupMembers.members} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberPage;
