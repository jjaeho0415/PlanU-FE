import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import styles from "./inviteGroupMember.module.scss";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { useState } from "react";
import FriendList from "../components/FriendList";

const friendMemberList: IGetFriendMemberType[] = [
  {
    profileImage: "",
    name: "정재호",
    username: "jjh",
    status: "NONE",
  },
  {
    profileImage: "",
    name: "김도하",
    username: "kdh",
    status: "NONE",
  },
  {
    profileImage: "",
    name: "이다은",
    username: "lde",
    status: "NONE",
  },
  {
    profileImage: "",
    name: "이수현",
    username: "lsh",
    status: "NONE",
  },
  {
    profileImage: "",
    name: "이상준",
    username: "lsj",
    status: "NONE",
  },
  {
    profileImage: "",
    name: "최준혁",
    username: "cjh",
    status: "PROGRESS",
  },
];

const InviteGroupMemberPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInviteGroupMemberClick = () => {
    // 그룹 참여 요청 api 연동
    return;
  };
  const handleCancelInviteClick = () => {
    // 그룹 참여 요청 취소 요청 api 연동
    return;
  };
  const handleSearchIconClick = () => {
    // 검색 api 호출 로직 작성
    return;
  };

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="멤버 초대" handleClick={() => navigate(-1)} />
      <div className={styles.contentContainer}>
        <div className={styles.searchContainer}>
          <SearchBox
            inputValue={inputValue}
            setInputValue={setInputValue}
            type="invite"
            handleSearchIconClick={handleSearchIconClick}
          />
        </div>
        <div className={styles.line}></div>
        <div className={styles.friendContainer}>
          <div className={styles.friendText}>친구</div>
          <FriendList
            friendList={friendMemberList}
            handleInviteGroupMemberClick={handleInviteGroupMemberClick}
            handleCancelInviteClick={handleCancelInviteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default InviteGroupMemberPage;
