import React from "react";
import styles from "./Inputs.module.scss";

interface props {
  title?: string;
}

const TitleBox: React.FC<props> = ({ title = "" }) => {
  return <input className={styles.Input} placeholder="제목" defaultValue={title ?? null}></input>;
};

export default TitleBox;
