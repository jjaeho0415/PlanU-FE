import React from 'react'
import styles from "./onlyTextHeader.module.scss"

interface Props{
    title: string;
    backgroundColor: "white" | "purple";
}

const OnlyTextHeader: React.FC<Props> = ({ title, backgroundColor }) => {

  return (
    <div className={`${styles.mainContainer} ${styles[backgroundColor]}`}>
      <div className={styles.titleSection}>{title}</div>
    </div>
  );
}

export default OnlyTextHeader