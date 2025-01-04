import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import { useNavigate } from "react-router-dom";
import styles from "./groupMember.module.scss"
import { useState } from "react";
import SearchBox from "@pages/InviteGroupMemberPage/components/SearchBox";

const GroupMemberPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default GroupMemberPage;
