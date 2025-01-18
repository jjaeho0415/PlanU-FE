import DefaultButton from "@components/buttons/DefaultButton";
import { useState } from "react";
import HasOnlyBackArrowHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import GroupNameInput from "../components/GroupNameInput";
import ImageUploader from "../components/ImageUploader";
import styles from "./createGroup.module.scss";
import { useNavigate } from "react-router-dom";
import { usePostCreateGroup } from "@api/group/postCreateGroup";
import useAuthStore from "@store/useAuthStore";

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState();
  const { mutate: postCreateGroup } = usePostCreateGroup(accessToken);

  const handleCompletion = () => {
    if (!groupName) {
      alert("그룹 이름을 입력해주세요.");
      return;
    }

    if (!image) {
      alert("그룹 이미지를 업로드해주세요.");
      return;
    }
    if (typeof image !== "string") {
      postCreateGroup({ groupName, groupImage: image });
    }
    
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.CreateGroupPage}>
      <HasOnlyBackArrowHeader title="그룹 생성하기" handleClick={handleBackClick} />
      <div className={styles.ContentWrapper}>
        <div style={{ width: "200px", height: "200px" }}>
          <ImageUploader iconType="camera" image={image} setImage={setImage} />
        </div>

        <GroupNameInput groupName={groupName} setGroupName={setGroupName} />
      </div>
      <div className={styles.ButtonWrapper}>
        <DefaultButton buttonText="완료" onClick={handleCompletion} />
      </div>
    </div>
  );
};

export default CreateGroupPage;
