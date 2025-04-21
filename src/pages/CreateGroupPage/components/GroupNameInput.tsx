import styles from "./groupNameInput.module.scss";

interface groupNameInputProps {
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
}

const GroupNameInput: React.FC<groupNameInputProps> = ({ groupName, setGroupName }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    input.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, "");
    if (input.length <= 15) {
      setGroupName(input);
    }
  };

  return (
    <div className={styles.GroupNameInputSection}>
      <input
        type="text"
        placeholder="그룹 이름을 입력하세요."
        className={styles.groupNameInput}
        value={groupName}
        onChange={handleInputChange}
        maxLength={15}
      />
    </div>
  );
};

export default GroupNameInput;
