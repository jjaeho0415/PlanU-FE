import React, { useState } from "react";
import styles from "./Comment.module.scss";
import Icon_x from "@assets/Icons/Close/Icon_close.svg?react";
import Icon_send from "@assets/Icons/scheduleDetail/Icon_send.svg?react";
import Icon_delete from "@assets/Icons/scheduleDetail/Icon_trashcan.svg?react";
import { usePostCreateComment } from "@api/schedule/postComment";
import useAuthStore from "@store/useAuthStore";
import { useDeleteComment } from "@api/schedule/deleteComment";
import AlertModal from "@components/modals/AlertModal";

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
  const [message, setMessage] = useState<string>("");
  const [commentId, setCommentId] = useState<number>(-1);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState<boolean>(false);
  const { mutate: createComment } = usePostCreateComment(
    accessToken,
    groupId,
    scheduleId,
    setMessage,
  );
  const { mutate: deleteComment } = useDeleteComment(accessToken, groupId, scheduleId, commentId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleCreateComment = () => {
    if (message.trim() === "") return;
    createComment({ message: message });
  };

  const handleDeleteComment = (comment: ICommentItem) => {
    setCommentId(comment.id);
    if (commentId !== -1 && comment.isMyComment) {
      setIsOpenAlertModal(true);
    }
  };

  const handleDeleteConfirm = () => {
    deleteComment();
    setIsOpenAlertModal(false);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TopBox}>
        <p>댓글 {commentData?.countOfComment ?? 0}</p>
        <Icon_x className={styles.Icon} onClick={() => setIsOpenCommentModal(false)} />
      </div>
      <div className={styles.CommentsBox}>
        {commentData?.comments.map((comment) => (
          <div className={styles.CommentItemBox} key={comment.id}>
            <div className={styles.ProfileImg}></div>
            <div className={styles.CommentRightBox}>
              <div className={styles.CommentTopBox}>
                <p className={styles.Name}>{comment.name}</p>
                <p className={styles.Time}>{comment.timestamp}</p>
              </div>
              <p className={styles.ContentBox}>{comment.message}</p>
            </div>
            {comment.isMyComment && (
              <Icon_delete
                className={styles.DeleteIcon}
                onClick={() => handleDeleteComment(comment)}
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.InputBox}>
        <input
          className={styles.Input}
          placeholder="댓글 추가..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.nativeEvent.isComposing && handleCreateComment()
          }
        />
        <Icon_send className={styles.Icon} onClick={handleCreateComment} />
      </div>
      {isOpenAlertModal && (
        <AlertModal
          type="댓글삭제"
          onClick={handleDeleteConfirm}
          setIsOpenAlertModal={setIsOpenAlertModal}
        />
      )}
    </div>
  );
};

export default CommentModal;
