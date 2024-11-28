import { DefaultButton } from "@components/buttons/DefaultButton";
import { useState } from "react";
import HasOnlyBackArrowHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import GroupNameInput from "../components/GroupNameInput";
import ImageUploader from "../components/ImageUploader";
import styles from "./GroupCreation.module.scss";

function GroupCreationPage() {
  const [groupName, setGroupName] = useState("");

  const handleCompletion = () => {
    if (!groupName) {
      alert("그룹 이름을 입력해주세요.");
      return;
    }
  };
  const handleBackClick = () => {};
  return (
    <div className={styles.GroupCreationPage}>
      <HasOnlyBackArrowHeader title="그룹 생성하기" handleClick={handleBackClick} />
      <div className={styles.ContentWrapper}>
        <ImageUploader />
        <GroupNameInput groupName={groupName} setGroupName={setGroupName} />
      </div>
      <div className={styles.ButtonWrapper}>
        <DefaultButton buttonText="완료" onClick={handleCompletion} />
      </div>
    </div>
  );
}

export default GroupCreationPage;
