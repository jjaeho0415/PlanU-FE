import React from "react";
import styles from "./Boxes.module.scss";

interface Props {
  memo: string;
}

const MemoBox: React.FC<Props> = ({ memo }) => {
  return (
    <div className={styles.MemoContainer}>
      <p>메모</p>
      <p className={styles.MemoContent}>{memo}</p>
    </div>
  );
};

export default MemoBox;
