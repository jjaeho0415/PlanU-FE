import { usePostRequestFriend } from "@api/friend/postRequestFriend";
import useAuthStore from "@store/useAuthStore";
import React, { useState } from "react";
import styles from "./idInput.module.scss";

interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<"친구목록" | "받은요청" | "보낸요청">>;
}
const IDInput: React.FC<Props> = ({ setActiveTab }) => {
  const [id, setId] = useState<string>("");
  const maxLength = 20;

  const { accessToken } = useAuthStore.getState();
  const { mutate: requestFriend } = usePostRequestFriend(accessToken, setId, setActiveTab);

  const handleRequestFriend = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (id.trim() === "") {
        return;
      }
      requestFriend(id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setId(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={id}
        onChange={handleChange}
        onKeyDown={handleRequestFriend}
        placeholder="ID로 친구 추가"
        className={styles.input}
      />
      <span className={styles.counter}>
        {id.length}/{maxLength}
      </span>
    </div>
  );
};

export default IDInput;
