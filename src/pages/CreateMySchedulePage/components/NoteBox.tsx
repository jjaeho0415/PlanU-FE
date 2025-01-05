import React from "react";
import styles from "./Inputs.module.scss";

const NoteBox: React.FC = () => {
  return <textarea className={styles.TextArea} placeholder="노트"></textarea>;
};

export default NoteBox;
