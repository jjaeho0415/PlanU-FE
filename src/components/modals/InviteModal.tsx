import React from "react";
import styles from "./inviteModal.module.scss";
import ReactDOM from "react-dom";

interface Props {
  groupId: number;
  groupName: string;
  groupImage: string;
  setIsInviteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAcceptClick: (id: number) => void;
  handleRejectClick: (id: number) => void;
}

const InviteModal: React.FC<Props> = ({
  groupName,
  groupImage,
  groupId,
  setIsInviteModalOpen,
  handleAcceptClick,
  handleRejectClick,
}) => {
  const handleButtonClick = (buttonName: "accept" | "reject" | "later") => {
    switch (buttonName) {
      case "accept":
        handleAcceptClick(groupId);
        break;
      case "reject":
        handleRejectClick(groupId);
        break;
      case "later":
        setIsInviteModalOpen(false);
        break;
      default:
        return;
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.overLay}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          setIsInviteModalOpen(false);
        }
      }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.topSection}>
          <div className={styles.imageSection}>
            <img
              src={groupImage}
              alt="그룹 이미지"
              width={60}
              height={60}
              className={styles.image}
            />
          </div>
          <div>{groupName}에서 사용자를 초대함</div>
        </div>
        <div className={styles.centerSection}>
          <p>{groupName} 단체 모임에서 회원님을</p>
          <p>초대했습니다. 포대를 수락하면</p>
          <p>팀원들과 위치 공유가 가능해지며</p>
          <p>회원님의 달력이 팀원들에게</p>
          <p>공유됩니다.</p>
        </div>
        <div className={styles.bottomSection}>
          <div onClick={() => handleButtonClick("accept")}>
            수락
          </div>
          <hr className={styles.hr} />
          <div  onClick={() => handleButtonClick("reject")}>
            거부
          </div>
          <hr className={styles.hr} />
          <div onClick={() => handleButtonClick("later")}>나중에 하기</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default InviteModal;
