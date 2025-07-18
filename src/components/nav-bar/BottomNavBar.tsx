import React from "react";
import styles from "./bottomNavBar.module.scss";
import CalendarIcon from "@assets/Icons/bottomNavBar/Calendar.svg?react";
import UsersIcon from "@assets/Icons/bottomNavBar/Users.svg?react";
import ChatIcon from "@assets/Icons/bottomNavBar/chat_bubble.svg?react";
import PersonIcon from "@assets/Icons/bottomNavBar/person.svg?react";
import useBottomStore from "@store/useBottomStore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/useAuthStore";
import { useGetNewChatNumber } from "@api/chat/getNewChatNumber";

const BottomNavBar: React.FC = () => {
  const { bottomIndex, setBottomIndex } = useBottomStore();
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { data: newChatNumber } = useGetNewChatNumber(accessToken);

  const handleClick = (index: number) => {
    setBottomIndex(index);
    switch (index) {
      case 0:
        return navigate(`/myCalendar`);
      case 1:
        return navigate(`/groupList`);
      case 2:
        return navigate(`/chatList`);
      case 3:
        return navigate(`/myPage`);
      default:
        return;
    }
  };

  const getIcon = (index: number) => {
    const isActive = bottomIndex === index;
    const strokeColor = isActive ? "var(--violet-icon)" : "var(--black)";
    const iconProps = { stroke: strokeColor };

    switch (index) {
      case 0:
        return <CalendarIcon {...iconProps} width={36} height={34} />;
      case 1:
        return <UsersIcon {...iconProps} width={36} height={34} />;
      case 2:
        return (
          <div>
            {newChatNumber! > 0 && <div className={styles.NewChatNumber}>{newChatNumber}</div>}
            <ChatIcon {...iconProps} width={33} height={31} />
          </div>
        );
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
          className={`${styles.NavItem} ${bottomIndex === index ? styles.Active : ""}`}
          onClick={() => handleClick(index)}
        >
          {getIcon(index)}
        </div>
      ))}
    </div>
  );
};

export default BottomNavBar;
