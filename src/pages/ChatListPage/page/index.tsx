import ProfileImage from "@assets/images/discord.jpg";
import React from "react";
import FooterBar from "../../../components/nav-bar/BottomNavBar";
import ChatItem from "../components/ChatItem";
import ChatListHeader from "../components/ChatListHeader";
import styles from "./messagesPage.module.scss";

const chatData = [
  {
    profileImage: ProfileImage,
    groupName: "V.nets 웹 스터디",
    lastMessage: "이모티콘을 보냈습니다.",
    time: "오후 1:03",
    isPinned: true,
    showNotification: false,
  },
  {
    profileImage: ProfileImage,
    groupName: "Plan U",
    lastMessage: "ㅋㅋㅋㅋㅋㅋㅋ",
    time: "오후 12:48",
    isPinned: true,
    showNotification: false,
  },
  {
    profileImage: ProfileImage,
    groupName: "정산",
    lastMessage: "굿굿",
    time: "오전 11:34",
    unreadCount: 3,
    showNotification: true,
  },
  {
    profileImage: ProfileImage,
    groupName: "KNU 컴퓨터공",
    lastMessage: "새해 복 많이 받으세요!",
    time: "오전 8:45",
    showNotification: false,
  },
  {
    profileImage: ProfileImage,
    groupName: "수영",
    lastMessage: "ㅇㅋㅇㅋ",
    time: "어제",
    unreadCount: 2,
    showNotification: true,
  },
  {
    profileImage: ProfileImage,
    groupName: "춘천팟",
    lastMessage: "내일 커피베이에서 만날까??",
    time: "어제",
    showNotification: false,
  },
  {
    profileImage: ProfileImage,
    groupName: "뇽뇽걸",
    lastMessage: "사진을 보냈습니다.",
    time: "12월 29일",
    unreadCount: 8,
    showNotification: true,
  },
];

const MessagesPage: React.FC = () => {
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
        {chatData.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default MessagesPage;
