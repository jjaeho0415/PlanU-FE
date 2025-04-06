import React, { useEffect, useState } from "react";
import styles from "./AlertModal.module.scss";
import ReactDOM from "react-dom";
import MiniButton from "@components/buttons/MiniButton";

interface Props {
  type: string;
  onClick: () => void;
  setIsOpenAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertModal: React.FC<Props> = ({ type, onClick, setIsOpenAlertModal }) => {
  const [modalContent, setModalContent] = useState<string>("");

  useEffect(() => {
    if (type === "일정삭제") {
      setModalContent("일정을 삭제하시겠습니까?");
    } else if (type === "댓글삭제") {
      setModalContent("댓글을 삭제하시겠습니까?");
    }
  }, []);

  return ReactDOM.createPortal(
    <div
      className={styles.Overlay}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          setIsOpenAlertModal(false);
        }
      }}
    >
      <div className={styles.Container}>
        <p>{modalContent}</p>
        <div className={styles.ButtonBox}>
          <MiniButton
            buttonText="취소"
            color="gray"
            onClick={() => {
              setIsOpenAlertModal(false);
            }}
          />
          <MiniButton buttonText="확인" color="purple_light" onClick={onClick} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AlertModal;
