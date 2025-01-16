import React from "react";
import styles from "./Comment.module.scss";
import Icon_x from "@assets/Icons/Close/Icon_close.svg?react";
import Icon_send from "@assets/Icons/scheduleDetail/Icon_send.svg?react";

interface props {
  setIsOpenCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const comments = [
  { name: "이수현", time: "39분 전", content: "ㅋㅋㅋ재밌겠다" },
  { name: "김도하", time: "1시간 전", content: "ㅇㅋ ㄱㄱ" },
  { name: "정재호", time: "10분 전", content: "김도하 오셈" },
  { name: "이상준", time: "10분 전", content: "댓글이요" },
  { name: "이수현", time: "39분 전", content: "ㅋㅋㅋ재밌겠다" },
  { name: "이수현", time: "39분 전", content: "ㅋㅋㅋ재밌겠다" },
];

const CommentModal: React.FC<props> = ({ setIsOpenCommentModal }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.TopBox}>
        <p>댓글 17</p>
        <Icon_x className={styles.Icon} onClick={() => setIsOpenCommentModal(false)} />
      </div>
      <div className={styles.CommentsBox}>
        {comments.map((comment) => (
          <div className={styles.CommentItemBox} key={comment.name}>
            <div className={styles.ProfileImg}></div>
            <div className={styles.CommentRightBox}>
              <div className={styles.CommentTopBox}>
                <p className={styles.Name}>{comment.name}</p>
                <p className={styles.Time}>{comment.time}</p>
              </div>
              <p className={styles.ContentBox}>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.InputBox}>
        <input className={styles.Input} placeholder="댓글 추가..." />
        <Icon_send className={styles.Icon} />
      </div>
    </div>
  );
};

export default CommentModal;
