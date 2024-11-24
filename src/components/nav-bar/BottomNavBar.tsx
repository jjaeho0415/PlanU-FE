import React, { useState } from "react";
import styles from "./bottomNavBar.module.scss";
// SVG 파일 import

const icons = [
  { icon: "../../assets/Icons/Calendar.png", label: "캘린더" },
  { icon: "../../assets/Icons/Users.svg", label: "친구" },
  { icon: "../../assets/Icons/chat_bubble.svg", label: "메시지" },
  { icon: "../../assets/Icons/person.svg", label: "프로필" },
];

const BottomNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);


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
