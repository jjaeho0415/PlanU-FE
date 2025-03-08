import React from "react";
import FooterBar from "../../../components/nav-bar/BottomNavBar";
import ChatItem from "../components/ChatItem";
import ChatListHeader from "../components/ChatListHeader";
import styles from "./messagesPage.module.scss";
import { useGetChatRoomList } from "@api/chat/getChatRoomList";
import useAuthStore from "@store/useAuthStore";

const ChatListPage: React.FC = () => {
  const { accessToken } = useAuthStore();
  const { data: chatList } = useGetChatRoomList(accessToken);
  const handleSearchClick = () => {};
  const handleAlertClick = () => {};

  return (
    <div className={styles.messagesPage}>
      <ChatListHeader
        handleSearchClick={handleSearchClick}
        handleAlertClick={handleAlertClick}
        isExistNoReadAlarms={true}
      />
      <div className={styles.chatList}>
        {chatList?.data.map((chatRoom, index) => <ChatItem key={index} chatRoom={chatRoom} />)}
      </div>
      <FooterBar />
    </div>
  );
};

export default ChatListPage;
