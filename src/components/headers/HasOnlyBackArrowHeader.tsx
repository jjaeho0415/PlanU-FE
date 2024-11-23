import React from 'react'
import styles from "./hasOnlyBackArrowHeader.module.scss"
import BackArrow1_Icon from "@assets/Icons/headers/backArrow1.svg?react";
import BackArrow2_Icon from "@assets/Icons/headers/backArrow2.svg?react";

interface Props {
    title: "가입하기" | "가능한 날짜 선택" | string;
    handleClick: () => void;
}

const HasOnlyBackArrowHeader: React.FC<Props> = ({title, handleClick}) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.iconSection} onClick={handleClick}>
                {title === "가입하기" ? <BackArrow1_Icon width={18} height={14} /> : <BackArrow2_Icon width={9} height={18} />}
            </div>
            <div className={styles.titleSection}>
                {title}
            </div>
      </div>
  )
};

export default HasOnlyBackArrowHeader