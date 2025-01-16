import ArrowIcon from "@assets/Icons/ProfileItem/arrow.svg?react";
import React from "react";
import styles from "./modalEditableProfileItem.module.scss";

interface ModalEditableProfileItemProps {
  label: string;
  value: string;
  onArrowClick?: () => void;
}

const ModalEditableProfileItem: React.FC<ModalEditableProfileItemProps> = ({
  label,
  value,
  onArrowClick,
}) => {
  return (
    <div className={styles.container} onClick={onArrowClick}>
      <div className={styles.label}>{label}</div>
      <div className={styles.valueContainer}>
        <span>{value}</span>
        <ArrowIcon className={styles.arrow} />
      </div>
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default ModalEditableProfileItem;
