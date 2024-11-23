import React from 'react'
import styles from "./onlyTextHeader.module.scss"
import classNames from 'classnames';

interface Props{
    title: string;
    backgroundColor: "white" | "purple";
}

const OnlyTextHeader: React.FC<Props> = ({ title, backgroundColor }) => {
    
    const mainContainerClass = classNames({
      [styles.mainContainer]: true,
      [styles.whiteBackground]: backgroundColor === "white",
      [styles.purpleBackground]: backgroundColor === "purple",
    });

  return (
    <div className={mainContainerClass}>
      <div className={styles.titleSection}>{title}</div>
    </div>
  );
}

export default OnlyTextHeader