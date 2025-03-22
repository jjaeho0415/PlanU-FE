import { default as Logo, default as ProfileEditPage } from "@assets/images/chat.jpg";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatHeader from "../components/ChattingHeader";
import styles from "./ChatPage.module.scss";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useGetChatMessages } from "@api/chat/getChatMessages";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import Icon_sendMessage from "@assets/Icons/chatt/IconSendMessageButton.svg?react";

const ChattingPage: React.FC = () => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<IChatItem[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  //const { data: chatMessagesData } = useGetChatMessages(accessToken);

  // useEffect(() => {
  //   if (chatMessagesData) {
  //     setMessages(chatMessagesData.data);
  //   }
  // }, [chatMessagesData]);

  useEffect(() => {
    if (!groupId) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_STOMP_URL), // WebSocket 서버 주소
      debug: (str) => console.log(str),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        setConnected(true);
        console.log("Connected to WebSocket");

        stompClient.subscribe(`/sub/chat/group/${groupId}`, (message) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
        });
      },
      onDisconnect: () => {
        setConnected(false);
        console.log("Disconnected");
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [groupId]);

  const setMessageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    if (client && connected && messageInput.trim() !== "") {
      const chatMessage = {
        groupId: groupId,
        sender: "사용자 이름", // 실제 사용자 정보 적용
        message: messageInput,
      };

      client.publish({
        destination: `/pub/chat/group/${groupId}`,
        body: JSON.stringify(chatMessage),
      });

      setMessageInput(""); // 입력창 초기화
    }
  };

  const handleLeftClick = () => {
    navigate(-1);
  };
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
            key={message.messageId}
            text={message.message}
            time={message.chatTime}
            isSentByMe={false}
            userImage={message.profileImageURL}
          />
        ))}
      </div>
      <div>
        <input className={styles.Input} onChange={setMessageValue} value={messageInput} />
        <Icon_sendMessage onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChattingPage;
