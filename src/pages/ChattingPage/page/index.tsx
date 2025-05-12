import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatHeader from "../components/ChattingHeader";
import styles from "./chatPage.module.scss";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useGetChatMessages } from "@api/chat/getChatMessages";
import useAuthStore from "@store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import Icon_button from "@assets/Icons/chatt/button.svg?react";
import Icon_mic from "@assets/Icons/chatt/mic.svg?react";
import Icon_deleteImg from "@assets/Icons/Close/Icon_close.svg?react";
import { useGetUserInfo } from "@api/user/getUserInfo";
import { useGetUpdateChatMessages } from "@api/chat/getUpdateChatMessages copy";
import { useGetGroupDetails } from "@api/group/getGroupDetail";
import SendMessageInput from "../components/SendMessageInput";
import BottomMenuBox from "../components/BottomMenuBox";

const ChattingPage: React.FC = () => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<IGroupedChatMessages[]>([]);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imageFile, setImgaeFile] = useState<string | null | File>(null);
  const chatRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const readMessageRef = useRef<number>(-1);
  const [startId, setStartId] = useState<number>(-1);
  const [type, setType] = useState<number>(-1);
  const [messageInput, setMessageInput] = useState<string>("");
  const [isBottomMenuClick, setIsBottomMenuClick] = useState<boolean>(false);
  const { data: groupDetailData } = useGetGroupDetails(groupId ?? "", accessToken);
  const { data: chatMessagesData } = useGetChatMessages(accessToken, groupId ?? "");
  const { data: updatedChatMessageData } = useGetUpdateChatMessages(
    accessToken,
    groupId ?? "",
    startId,
    readMessageRef.current,
    type,
  );
  const { data: userData } = useGetUserInfo(accessToken);

  useEffect(() => {
    if (chatMessagesData) {
      setMessages(chatMessagesData.data);
    }
  }, [chatMessagesData]);

  useEffect(() => {
    if (
      !updatedChatMessageData?.data ||
      startId === -1 ||
      readMessageRef.current === -1 ||
      type !== 3
    )
      return;

    const extractedMessages = extractMessagesInRange(
      updatedChatMessageData.data,
      startId,
      readMessageRef.current,
    );

    if (extractedMessages.length === 0) return;

    for (const msg of extractedMessages) {
      updateUnreadCount(msg);
    }

    setStartId(-1);
    setType(-1);
  }, [updatedChatMessageData]);

  useEffect(() => {
    if (messages.length > 0) {
      let unreadStartId: number | null = null;

      for (const group of messages) {
        for (const msg of group.messages) {
          if (msg.unReadCount > 0) {
            unreadStartId = msg.messageId;
            break;
          }
        }
        if (unreadStartId !== null) break;
      }

      if (unreadStartId !== null) {
        setStartId(unreadStartId);
      } else {
        const firstMessage = messages[0]?.messages[0];
        if (firstMessage) {
          setStartId(firstMessage.messageId);
        }
      }

      const lastMessage = messages[messages.length - 1];
      const lastChatItem = lastMessage.messages[lastMessage.messages.length - 1];

      if (lastChatItem) {
        handleChatScroll(lastChatItem.messageId);

        if (readMessageRef.current === lastChatItem.messageId) return;

        if (client && connected) {
          client.publish({
            destination: `/pub/chat/read/${lastChatItem.messageId}/${groupId}`,
            body: JSON.stringify({}),
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
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        setConnected(true);

        stompClient.subscribe(`/sub/chat/group/${groupId}`, (message) => {
          handleIncomingMessage(message.body);
        });
      },
      onDisconnect: () => {
        setConnected(false);
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

  const extractMessagesInRange = (
    updatedChatMessageData: IChatItem[],
    startId: number,
    endId: number,
  ): IChatItem[] => {
    const result: IChatItem[] = [];
    let isInRange = false;

    for (const msg of updatedChatMessageData) {
      if (msg.messageId === startId) {
        isInRange = true;
      }
      if (isInRange) {
        result.push(msg);
      }
      if (msg.messageId === endId) {
        return result;
      }
    }
    return result;
  };

  const handleIncomingMessage = (raw: string) => {
    let newMessage: IChatItem;
    try {
      newMessage = JSON.parse(raw);
    } catch (err) {
      console.error("Invalid message format:", err);
      return;
    }

    switch (newMessage.type) {
      case 1:
        setType(1);
        addNewMessage(newMessage);
        return;
      case 2:
        setType(2);
        addNewMessage(newMessage);
        return;
      case 3:
        setType(3);
        return;
      case 4:
        setType(4);
        updateUnreadCount(newMessage);
        return;
      case 5:
        setType(5);
        return;
      default:
        console.warn("Unhandled message type:", newMessage.type);
    }
  };

  const updateUnreadCount = (message: IChatItem) => {
    setMessages((prev) =>
      prev.map((group) => ({
        ...group,
        messages: group.messages.map((msg) =>
          msg.messageId === message.messageId ? { ...msg, unReadCount: message.unReadCount } : msg,
        ),
      })),
    );
  };

  const addNewMessage = (message: IChatItem) => {
    const messageDate = message.chatDate;

    setMessages((prevMessages) => {
      const existingDateIndex = prevMessages.findIndex((group) => group.chatDate === messageDate);

      if (existingDateIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[existingDateIndex] = {
          ...updatedMessages[existingDateIndex],
          messages: [...updatedMessages[existingDateIndex].messages, message],
        };
        return updatedMessages;
      } else {
        return [...prevMessages, { chatDate: messageDate, messages: [message] }];
      }
    });
  };

  const sendMessage = () => {
    if (client && connected && messageInput.trim() !== "") {
      const chatMessage = {
        type: imageFile ? 2 : 1,
        message: messageInput,
      };

      client.publish({
        destination: `/pub/chat/group/${groupId}`,
        body: JSON.stringify(chatMessage),
      });

      setMessageInput("");
    }
  };

  const handleChatScroll = (id: number) => {
    if (chatRef.current[id]) {
      chatRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleDeleteImg = () => {
    setImgPreview(null);
    setImgaeFile(null);
    setIsBottomMenuClick(false);
  };

  const handleLeftClick = () => {
    navigate("/chatList");
  };

  const handleRightClick = () => {};

  return (
    <div className={styles.chatPage}>
      <div className={styles.header}>
        <ChatHeader
          groupName={groupDetailData?.groupInfo.groupName ?? ""}
          groupImage={groupDetailData?.groupInfo.groupImage ?? ""}
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
                {chat.type === 1 || chat.type === 2 ? (
                  <ChatBubble
                    key={chat.messageId}
                    message={chat}
                    isSentByMe={userData?.username === chat.sender}
                    type={chat.type}
                  />
                ) : (
                  chat.type === 5 && (
                    <div className={styles.EnterChatRoom}>{chat.name}님이 입장했습니다.</div>
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {imgPreview && (
        <div className={styles.ImageContainer}>
          <Icon_deleteImg className={styles.DeleteIcon} onClick={handleDeleteImg} />
          <img src={imgPreview} className={styles.Image} />
        </div>
      )}
      <div className={styles.BottomContainer}>
        <Icon_button
          className={styles.Cursor}
          onClick={() => setIsBottomMenuClick(!isBottomMenuClick)}
        />
        <SendMessageInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          sendMessage={sendMessage}
          isSendImage={imageFile ? true : false}
          groupId={groupId ?? ""}
          imageFile={imageFile}
          setImgaeFile={setImgaeFile}
          setImgaePreview={setImgPreview}
          setIsBottomMenuClick={setIsBottomMenuClick}
        />
        <Icon_mic className={styles.Cursor} />
      </div>
      {isBottomMenuClick && (
        <BottomMenuBox
          setImgPreview={setImgPreview}
          imageFile={imageFile}
          setImageFile={setImgaeFile}
        />
      )}
    </div>
  );
};

export default ChattingPage;
