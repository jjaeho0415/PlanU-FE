import React from "react";
import FooterBar from "../../../components/nav-bar/BottomNavBar";
import ChatItem from "../components/ChatItem";
import ChatListHeader from "../components/ChatListHeader";
import styles from "./messagesPage.module.scss";
import { useGetChatRoomList } from "@api/chat/getChatRoomList";
import useAuthStore from "@store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { data: chatList } = useGetChatRoomList(accessToken);

  const handleSearchClick = () => {
    navigate("/chatList/search");
  };
  const handleAlertClick = () => {
    navigate("/notificationList");
  };

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
