import React from "react";
import styles from "./chatListSearchHeader.module.scss";
import Search_Icon from "@assets/Icons/headers/searchIcon.svg?react";
import { useNavigate } from "react-router-dom";

interface Props {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const ChatListSearchHeader: React.FC<Props> = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchSection}>
        <Search_Icon width={20} height={20} />
        <input
          value={searchText}
          onChange={handleOnChange}
          placeholder="검색"
          className={styles.inputSection}
        />
      </div>
      <div className={styles.textSection} onClick={() => navigate(-1)}>
        취소
      </div>
    </div>
  );
};

export default ChatListSearchHeader;
