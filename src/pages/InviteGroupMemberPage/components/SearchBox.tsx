import { useNavigate } from "react-router-dom";
import styles from "./searchBox.module.scss";
import SearchIcon from "@assets/Icons/Icon_search.svg?react";

interface Props {
  type: "onlyClick" | "invite";
  inputValue?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  handleSearchIconClick?: () => void;
  groupId?: string;
}

const SearchBox: React.FC<Props> = ({
  type,
  inputValue,
  setInputValue,
  handleSearchIconClick,
  groupId,
}) => {
  const navigate = useNavigate();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue!(e.target.value);
  };

  const handleEnterDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchIconClick!()
    }
  } 

  return (
    <div className={styles.mainContainer}>
      <input
        className={styles.inputContainer}
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={handleEnterDown}
        onClick={() => type === "onlyClick" && navigate(`/group/${groupId}/inviteMembers`)}
        placeholder={type === "onlyClick" ? "아이디나 이름으로 추가하기":"아이디나 이름으로 검색하기"}
        maxLength={15}
        style={{
          cursor: type === "onlyClick" ? "pointer" : "default",
        }}
      />
      <SearchIcon className={styles.searchIcon} onClick={handleSearchIconClick} />
    </div>
  );
};

export default SearchBox;
