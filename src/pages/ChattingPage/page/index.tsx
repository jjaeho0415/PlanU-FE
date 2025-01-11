import { default as Logo, default as ProfileEditPage } from "@assets/images/chat.jpg";
import React from "react";
import ChatBubble from "../components/ChatBubble";
import ChatHeader from "../components/ChattingHeader";
import styles from "./ChatPage.module.scss";
const ChattingPage: React.FC = () => {
  const messages = [
    {
      id: 1,
      text: "안녕하세요. Plan U에 가입하신 것을 환영합니다.",
      time: "오전 11:28",
      isSentByMe: false,
      userImage: ProfileEditPage,
    },
    {
      id: 2,
      text: "소중한 사람들과 소중한 약속을 계획해보세요",
      time: "오전 11:29",
      isSentByMe: false,
      userImage: ProfileEditPage,
    },
    { id: 3, text: "Plan U에서는 위치 공유도 가능합니다.", time: "오후 12:09", isSentByMe: true },
    {
      id: 4,
      text: "오늘도 좋은 하루 되세요!",
      time: "오후 12:11",
      isSentByMe: false,
      userImage: ProfileEditPage,
    },
    { id: 5, text: "정말 감사합니다. 행복하세요", time: "오후 1:25", isSentByMe: true },
  ];
  const handleLeftClick = () => {};
  const handleRightClick = () => {};

  return (
    <div className={styles.chatPage}>
      <div className={styles.header}>
        <ChatHeader
          groupName="PlanU"
          groupImage={Logo}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
        />
      </div>

      <div className={styles.chatContainer}>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            text={message.text}
            time={message.time}
            isSentByMe={message.isSentByMe}
            userImage={message.userImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChattingPage;
