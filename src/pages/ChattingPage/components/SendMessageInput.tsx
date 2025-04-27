import React from "react";
import styles from "./sendMessage.module.scss";
import Icon_sendMessage from "@assets/Icons/chatt/IconSendMessageButton.svg?react";
import { usePostSendImage } from "@api/chat/postSendImage";
import useAuthStore from "@store/useAuthStore";

interface Props {
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  isSendImage: boolean;
  groupId: string;
  imageFile: string | File | null;
  setImgaeFile: React.Dispatch<React.SetStateAction<string | File | null>>;
  setImgaePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const SendMessageInput: React.FC<Props> = ({
  messageInput,
  setMessageInput,
  sendMessage,
  isSendImage,
  groupId,
  imageFile,
  setImgaeFile,
  setImgaePreview,
}) => {
  const { accessToken } = useAuthStore();
  const { mutate: sendImage } = usePostSendImage(accessToken);

  const setMessageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      sendMessage();
    }
  };

  const handleSendImage = () => {
    sendImage({ groupId: groupId, file: imageFile as File });
    setImgaeFile(null);
    setImgaePreview(null);
  };

  return (
    <div className={styles.InputContainer}>
      <input
        className={styles.Input}
        value={messageInput}
        onChange={setMessageValue}
        onKeyDown={onKeyDown}
      />
      <Icon_sendMessage
        onClick={isSendImage ? handleSendImage : sendMessage}
        className={styles.SendIcon}
      />
    </div>
  );
};

export default SendMessageInput;
