import React from "react";
import styles from "./Boxes.module.scss";
import useScheduleStore from "@store/useScheduleStore";

const MemoBox: React.FC = () => {
  const { memo } = useScheduleStore();

  return (
    <div className={styles.MemoContainer}>
      <p>메모</p>
      <p className={styles.MemoContent}>{memo}</p>
    </div>
  );
};

export default MemoBox;
