import React from "react";
import styles from "./changeColorBox.module.scss";

interface Props {
  setColor: (info: string) => void;
  setIsOpenChangeColorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeColorBox: React.FC<Props> = ({ setColor, setIsOpenChangeColorModal }) => {
  const colorList = ["#F6B6CA", "#A0B1DE", "#9BD5BD", "#FFDF88", "#FFA55D", "#D6BCA3"];

  const handleSelectColor = (colorItem: string) => {
    setColor(colorItem);
    setIsOpenChangeColorModal(false);
  };

  return (
    <div
      className={styles.overlay}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          setIsOpenChangeColorModal(false);
        }
      }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.topSection}>
          <div className={styles.centerText}>색상 선택</div>
        </div>
        <div className={styles.colorListSection}>
          {colorList.map((colorItem) => (
            <div key={colorItem} className={styles.colorItemSection} onClick={() => handleSelectColor(colorItem)}>
              <div className={styles.colorSection} style={{ backgroundColor: colorItem }}></div>
              <div>{colorItem}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeColorBox;
