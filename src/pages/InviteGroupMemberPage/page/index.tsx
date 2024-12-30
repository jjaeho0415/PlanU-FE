import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader"
import styles from "./inviteGroupMember.module.scss"
import { useNavigate } from "react-router-dom"
import SearchBox from "../components/SearchBox";
import { useState } from "react";

const InviteGroupMemberPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const handleSearchIconClick = () => {
    // 검색 api 호출 로직 작성
    return;
  }

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="멤버 초대" handleClick={() => navigate(-1)}/>
      <div className={styles.contentContainer}>
        <div className={styles.searchContainer}>
          <SearchBox inputValue={inputValue} setInputValue={setInputValue} type="invite" handleSearchIconClick={handleSearchIconClick}/>
        </div>
        <div className={styles.line}/>
        <div className={styles.friendContainer}></div>
      </div>
    </div>
  )
}

export default InviteGroupMemberPage