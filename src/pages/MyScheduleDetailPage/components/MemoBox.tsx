import React from "react";
import styles from "./Boxes.module.scss";

const MemoBox: React.FC = () => {
  return (
    <div className={styles.MemoContainer}>
      <p>메모</p>
      <p className={styles.MemoContent}>모두 참석바랍니다~!</p>
    </div>
  );
};

export default MemoBox;
