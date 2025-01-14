import styles from "./searchInput.module.scss";
import SearchIcon from "@assets/Icons/Icon_search.svg?react";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearchIconClick: () => void;
}

const SearchInput: React.FC<Props> = ({ inputValue, setInputValue, handleSearchIconClick }) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchIconClick();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <input
        className={styles.inputContainer}
        value={inputValue}
        onChange={onInputChange}
        placeholder="장소를 검색하세요"
        onKeyDown={onKeyDown}
      />
      <SearchIcon className={styles.searchIcon} onClick={handleSearchIconClick} />
    </div>
  );
};

export default SearchInput;
