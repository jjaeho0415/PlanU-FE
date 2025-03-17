import React, { useEffect, useState } from "react";
import ChatListSearchHeader from "../components/ChatListSearchHeader";
import ProfileItem from "../components/ChatRoomItem";
import styles from "./chatListPage.module.scss";
import { useGetChatRoomList } from "@api/chat/getChatRoomList";
import useAuthStore from "@store/useAuthStore";

const ChatListSearchPage: React.FC = () => {
  const { accessToken } = useAuthStore();
  const { data: chatList } = useGetChatRoomList(accessToken);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IChatRoomResponseType[]>([]);

  useEffect(() => {
    if (chatList && searchResults) {
      setSearchResults(chatList.data.filter((chat) => chat.groupName.includes(searchText)));
    }
  }, [searchText]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <ChatListSearchHeader searchText={searchText} setSearchText={setSearchText} />
      </div>
      {searchText && (
        <>
          <h2 className={styles.title}>결과</h2>
          <div className={styles.profileList}>
            {searchResults.map((group) => (
              <ProfileItem
                key={group.groupId}
                name={group.groupName}
                imageUrl={group.groupImageUrl}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatListSearchPage;
