import React, { useState } from "react";
import styles from "./bottomNavBar.module.scss";
import CalenderIcon from "@assets/Icons/Calendar.svg?react";

const BottomNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const bottomNavBar = (index: number) => {
    switch (index) {
      case 0:
        return <CalenderIcon/>
    }
  }

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.Container}>
      {icons.map((item, index) => (
        <img
          src={item.icon}
          alt={item.label}
          width={35}
          height={35}
          key={index}
          className={activeIndex === index ? styles.activeIcon : styles.defaultIcon}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default BottomNavBar;
