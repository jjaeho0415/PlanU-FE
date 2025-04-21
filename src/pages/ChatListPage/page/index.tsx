import React from "react";
import FooterBar from "../../../components/nav-bar/BottomNavBar";
import ChatItem from "../components/ChatItem";
import ChatListHeader from "../components/ChatListHeader";
import styles from "./messagesPage.module.scss";
import { useGetChatRoomList } from "@api/chat/getChatRoomList";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useOutletContext } from "react-router-dom";

const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { data: chatList } = useGetChatRoomList(accessToken);
  const { notifications } = useOutletContext<{
    notifications: IGetNotificationListResponseBodyType;
  }>();

  const handleSearchClick = () => {
    navigate("/chatList/search");
  };
  const handleAlertClick = () => {
    navigate("/notificationList");
  };

  const handleChatRoomClick = (groupId: number) => {
    navigate(`/group/${groupId}/chatting`);
  };

  const isExistUnReadNotification =
    notifications && notifications.notificationList.length > 0
      ? notifications.notificationList.some((notification) => !notification.read)
      : false;

  return (
    <div className={styles.messagesPage}>
      <ChatListHeader
        handleSearchClick={handleSearchClick}
        handleAlertClick={handleAlertClick}
        isExistUnReadAlarms={isExistUnReadNotification}
      />
      <div className={styles.chatList}>
        {chatList?.data.map((chatRoom, index) => (
          <div onClick={() => handleChatRoomClick(chatRoom.groupId)}>
            <ChatItem key={index} chatRoom={chatRoom} />
          </div>
        ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default ChatListPage;
