import DefaultProfileImage from "@assets/images/bubble.jpg";
import ProfileImage from "@assets/images/CD.jpg";
import React, { useState } from "react";
import ChatListSearchHeader from "../components/ChatListSearchHeader";
import ProfileItem from "../components/ProfileItem";
import styles from "./chatListPage.module.scss";

const ChatListSearchPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Plan U", imageUrl: DefaultProfileImage },
    {
      id: 2,
      name: "백령대동제 모임",
      imageUrl: ProfileImage,
    },
  ]);

  const handleRemoveProfile = (id: number) => {
    setSearchResults(searchResults.filter((profile) => profile.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <ChatListSearchHeader searchText={searchText} setSearchText={setSearchText} />
      </div>

      <h2 className={styles.title}>최근 검색</h2>

      <div className={styles.profileList}>
        {searchResults.map((profile) => (
          <ProfileItem
            key={profile.id}
            name={profile.name}
            imageUrl={profile.imageUrl}
            onRemove={() => handleRemoveProfile(profile.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatListSearchPage;
