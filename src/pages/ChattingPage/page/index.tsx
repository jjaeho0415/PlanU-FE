import { default as Logo } from "@assets/images/chat.jpg";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatHeader from "../components/ChattingHeader";
import styles from "./ChatPage.module.scss";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useGetChatMessages } from "@api/chat/getChatMessages";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import Icon_sendMessage from "@assets/Icons/chatt/IconSendMessageButton.svg?react";
import { useGetUserInfo } from "@api/user/getUserInfo";
import { useGetUpdateChatMessages } from "@api/chat/getUpdateChatMessages copy";

const ChattingPage: React.FC = () => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<IGroupedChatMessages[]>([]);
  const chatRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const readMessageRef = useRef<number>(-1);
  const [startId, setStartId] = useState<number>(-1);
  const [messageInput, setMessageInput] = useState<string>("");
  const { data: chatMessagesData } = useGetChatMessages(accessToken, groupId ?? "");
  const { data: updatedChatMessageData } = useGetUpdateChatMessages(
    accessToken,
    groupId ?? "",
    startId,
    readMessageRef.current,
  );
  const { data: userData } = useGetUserInfo(accessToken);

  useEffect(() => {
    if (chatMessagesData) {
      setMessages(chatMessagesData.data);
    }
  }, [chatMessagesData]);

  // useEffect(() => {
  //   if (updatedChatMessageData) {
  //     setMessages(updatedChatMessageData.data);
  //   }
  // }, [updatedChatMessageData]);

  useEffect(() => {
    if (messages.length > 0) {
      const startMessage = messages[0];
      const startChatItem = startMessage.messages[0];

      if (startChatItem) {
        setStartId(startChatItem.messageId);
      }

      const lastMessage = messages[messages.length - 1];
      const lastChatItem = lastMessage.messages[lastMessage.messages.length - 1];

      if (lastChatItem) {
        handleChatScroll(lastChatItem.messageId);

        if (readMessageRef.current === lastChatItem.messageId) return;

        if (client && connected) {
          const chatMessage = {
            type: 4,
            messageId: lastChatItem.messageId,
            unReadCount: lastChatItem.unReadCount,
          };

          client.publish({
            destination: `/pub/chat/read/${lastChatItem.messageId}/${groupId}`,
            body: JSON.stringify(chatMessage),
          });

          readMessageRef.current = lastChatItem.messageId;
        }
      }
    }
  }, [messages]);

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
          setMessages((prevMessages) => {
            try {
              const newMessage: IChatItem = JSON.parse(message.body);
              const messageDate = newMessage.chatDate;

              const existingDateIndex = prevMessages.findIndex(
                (group) => group.chatDate === messageDate,
              );
              if (existingDateIndex !== -1) {
                const updatedMessages = [...prevMessages];
                updatedMessages[existingDateIndex] = {
                  ...updatedMessages[existingDateIndex],
                  messages: [...updatedMessages[existingDateIndex].messages, newMessage],
                };

                return updatedMessages;
              } else {
                return [...prevMessages, { chatDate: messageDate, messages: [newMessage] }];
              }
            } catch (error) {
              console.error("Invalid message format:", error);
              return prevMessages;
            }
          });
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
        type: 1,
        message: messageInput,
      };

      client.publish({
        destination: `/pub/chat/group/${groupId}`,
        body: JSON.stringify(chatMessage),
      });

      setMessageInput("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      sendMessage();
    }
  };

  const handleChatScroll = (id: number) => {
    if (chatRef.current[id]) {
      chatRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
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
          <div className={styles.ChatItemContainer} key={message.chatDate}>
            <div className={styles.Date}>{message.chatDate}</div>
            {message.messages.map((chat) => (
              <div
                key={chat.messageId}
                className={userData?.username === chat.sender ? styles.SentByMe : ""}
                ref={(el) => {
                  chatRef.current[chat.messageId] = el;
                }}
              >
                <ChatBubble
                  key={chat.messageId}
                  message={chat}
                  isSentByMe={userData?.username === chat.sender}
                />
                {/* {chat.messageId === readMessageRef.current && <div>라라라라</div>} */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.InputContainer}>
        <input
          className={styles.Input}
          value={messageInput}
          onChange={setMessageValue}
          onKeyDown={onKeyDown}
        />
        <Icon_sendMessage onClick={sendMessage} className={styles.SendIcon} />
      </div>
    </div>
  );
};

export default ChattingPage;
