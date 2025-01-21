import React, { useState } from "react";
import HasOnlyBackArrowHeader from "../../../components/headers/HasOnlyBackArrowHeader";
import FriendsTab from "../components/FriendsTab";
import IDInput from "../components/IDInput";
import MemberCard from "../components/MemberCard";
import styles from "./friendManagementPage.module.scss";
import DefaultButton from "@components/buttons/DefaultButton";

const FriendManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"친구목록" | "받은요청" | "보낸요청">("친구목록");
  const [isEditing, setIsEditing] = useState(false);

  const friendsList = [
    { name: "이수현", username: "shuding0307" },
    { name: "최준혁", username: "_twinkle_high" },
    { name: "이상준", username: "sang__00" },
    { name: "이다은", username: "Euniii0713" },
  ];

  const receivedFriendsList = [
    { name: "이다은", username: "Euniii0713" },
    { name: "김도하", username: "ehgk4245" },
  ];

  const sentFriendsList = [
    { name: "정재호", username: "purify_0kcal" },
    { name: "이수현", username: "shuding0307" },
  ];

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className={styles.friendManagementPage}>
      <HasOnlyBackArrowHeader title="친구 관리" handleClick={() => {}} />

      <div className={styles.idInput}>
        <IDInput />
      </div>

      <div className={styles.myIdInfo}>
        <span>내 아이디</span>
        <span>Euniii0713</span>
      </div>

      <FriendsTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.tabContent}>
        {activeTab === "친구목록" && (
          <div className={styles.friendList}>
            {friendsList.map((friend, index) => (
              <MemberCard
                key={index}
                memberInfo={friend}
                activeTab={activeTab}
                isEditing={isEditing}
              />
            ))}
          </div>
        )}
        {activeTab === "받은요청" && (
          <div className={styles.friendList}>
            {receivedFriendsList.map((friend, index) => (
              <MemberCard key={index} memberInfo={friend} activeTab={activeTab} />
            ))}
          </div>
        )}
        {activeTab === "보낸요청" && (
          <div className={styles.friendList}>
            {sentFriendsList.map((friend, index) => (
              <MemberCard key={index} memberInfo={friend} activeTab={activeTab} />
            ))}
          </div>
        )}

        {activeTab === "친구목록" && (
          <div className={styles.footer}>
            <DefaultButton
              buttonText={isEditing ? "완료" : "수정하기"}
              onClick={handleEditToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendManagementPage;
