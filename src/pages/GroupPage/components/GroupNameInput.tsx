import styles from "./GroupNameInput.module.scss";

interface GroupNameInputProps {
  groupName: string;
  setGroupName: (value: string) => void;
}

function GroupNameInput({ groupName, setGroupName }: GroupNameInputProps) {
  return (
    <div className={styles.GroupNameInputSection}>
      <input
        type="text"
        placeholder="그룹 이름을 입력하세요."
        className={styles.GroupNameInput}
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
    </div>
  );
}

export default GroupNameInput;
