import React, { useState } from "react";
import styles from "./bottomNavBar.module.scss";
import CalenderIcon from "@assets/Icons/bottomNavBar/Calendar.svg?react";
import UsersIcon from "@assets/Icons/bottomNavBar/Users.svg?react";
import ChatIcon from "@assets/Icons/bottomNavBar/chat_bubble.svg?react";
import PersonIcon from "@assets/Icons/bottomNavBar/person.svg?react";

const BottomNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const getIcon = (index: number) => {
    const isActive = activeIndex === index;
    const strokeColor = isActive ? "var(--violet-icon)" : "var(--black)";
    const iconProps = { stroke: strokeColor };

    switch (index) {
      case 0:
        return <CalenderIcon {...iconProps} width={36} height={34} />;
      case 1:
        return <UsersIcon {...iconProps} width={36} height={34} />;
      case 2:
        return <ChatIcon {...iconProps} width={33} height={31} />;
      case 3:
        return <PersonIcon {...iconProps} width={36} height={34} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.Container}>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`${styles.NavItem} ${activeIndex === index ? styles.Active : ""}`}
          onClick={() => handleClick(index)}
        >
          {getIcon(index)}
        </div>
      ))}
    </div>
  );
};

export default BottomNavBar;
