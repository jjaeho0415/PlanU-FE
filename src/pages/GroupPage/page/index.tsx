import { DefaultButton } from "@components/buttons/DefaultButton";
import { useState } from "react";
import HasOnlyBackArrowHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import GroupNameInput from "../components/GroupNameInput";
import ImageUploader from "../components/ImageUploader";
import styles from "./groupCreation.module.scss";

function GroupCreationPage() {
  const [groupName, setGroupName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleCompletion = () => {
    if (!groupName) {
      alert("그룹 이름을 입력해주세요.");
      return;
    }

    if (!image) {
      alert("그룹 이미지를 업로드해주세요.");
      return;
    }

    alert("그룹 생성 완료!");
  };

  const handleBackClick = () => {};

  return (
    <div className={styles.GroupCreationPage}>
      <HasOnlyBackArrowHeader title="그룹 생성하기" handleClick={handleBackClick} />
      <div className={styles.ContentWrapper}>
        <ImageUploader iconType="camera" image={image} setImage={setImage} />
        <GroupNameInput groupName={groupName} setGroupName={setGroupName} />
      </div>
      <div className={styles.ButtonWrapper}>
        <DefaultButton buttonText="완료" onClick={handleCompletion} />
      </div>
    </div>
  );
}

export default GroupCreationPage;
