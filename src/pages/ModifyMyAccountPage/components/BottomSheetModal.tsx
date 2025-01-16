import React from "react";
import styles from "./bottomSheetModal.module.scss";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  isPasswordModal?: boolean;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  isPasswordModal = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button className={styles.button} onClick={onClose}>
            취소
          </button>
          <button className={styles.button} onClick={onConfirm}>
            완료
          </button>
        </div>
        <div className={isPasswordModal ? styles.passwordContent : styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default BottomSheetModal;
