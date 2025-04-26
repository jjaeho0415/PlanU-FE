import React from "react";
import styles from "./Inputs.module.scss";
import Icon_arrow from "@assets/Icons/arrow/RightArrow.svg?react";

interface props {
  setIsOpenChangeColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
}

const ColorBox: React.FC<props> = ({setIsOpenChangeColorModal, color}) => {

  
  const handleChangeColorClick = () => {
    setIsOpenChangeColorModal(true);
  }

  return (
    <div className={styles.Box} onClick={handleChangeColorClick}>
      <p className={styles.Title}>색상</p>
      <div className={styles.RightBox}>
        <div className={styles.Color} style={{backgroundColor: color}}></div>
        <Icon_arrow />
      </div>
    </div>
  );
};

export default ColorBox;
