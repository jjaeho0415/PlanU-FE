import React from "react";
import styles from "./Inputs.module.scss";

const TitleBox: React.FC = () => {
  return <input className={styles.Input} placeholder="제목"></input>;
};

export default TitleBox;
