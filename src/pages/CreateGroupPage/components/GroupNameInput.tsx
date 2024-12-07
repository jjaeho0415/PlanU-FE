import styles from "./groupNameInput.module.scss";

interface groupNameInputProps {
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
}

const GroupNameInput:React.FC<groupNameInputProps> = ({ groupName, setGroupName }) => {
  return (
    <div className={styles.GroupNameInputSection}>
      <input
        type="text"
        placeholder="그룹 이름을 입력하세요."
        className={styles.groupNameInput}
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
    </div>
  );
}

export default GroupNameInput;
