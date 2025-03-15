import React, { useState } from "react";
import styles from "./Comment.module.scss";
import Icon_x from "@assets/Icons/Close/Icon_close.svg?react";
import Icon_send from "@assets/Icons/scheduleDetail/Icon_send.svg?react";
import { usePostCreateComment } from "@api/schedule/postComment";
import useAuthStore from "@store/useAuthStore";

interface props {
  setIsOpenCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  commentData: IGetCommentList | null;
  groupId: string;
  scheduleId: string;
}

const CommentModal: React.FC<props> = ({
  setIsOpenCommentModal,
  commentData,
  groupId,
  scheduleId,
}) => {
  const { accessToken } = useAuthStore();
  const { mutate: createComment } = usePostCreateComment(accessToken, groupId, scheduleId);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleCreateComment = () => {
    if (message.trim() === "") return;

    createComment({ message: message });
  };
  return (
    <div className={styles.Container}>
      <div className={styles.TopBox}>
        <p>댓글 {commentData?.countOfComment ?? 0}</p>
        <Icon_x className={styles.Icon} onClick={() => setIsOpenCommentModal(false)} />
      </div>
      <div className={styles.CommentsBox}>
        {commentData?.comments.map((comment) => (
          <div className={styles.CommentItemBox} key={comment.name}>
            <div className={styles.ProfileImg}></div>
            <div className={styles.CommentRightBox}>
              <div className={styles.CommentTopBox}>
                <p className={styles.Name}>{comment.name}</p>
                <p className={styles.Time}>{comment.timestamp}</p>
              </div>
              <p className={styles.ContentBox}>{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.InputBox}>
        <input
          className={styles.Input}
          placeholder="댓글 추가..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleCreateComment()}
        />
        <Icon_send className={styles.Icon} onClick={handleCreateComment} />
      </div>
    </div>
  );
};

export default CommentModal;
