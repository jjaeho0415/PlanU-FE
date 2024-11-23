import React, { useState } from "react";
import "./BottomNavBar.scss";

// SVG 파일 import
import CalendarIcon from "../../assets/icon/Calendar.svg";
import UsersIcon from "../../assets/icon/Users.svg";
import ChatBubbleIcon from "../../assets/icon/chat_bubble.svg";
import PersonIcon from "../../assets/icon/person.svg";

const icons = [
  { icon: CalendarIcon, label: "캘린더" },
  { icon: UsersIcon, label: "친구" },
  { icon: ChatBubbleIcon, label: "메시지" },
  { icon: PersonIcon, label: "프로필" },
];

const BottomNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bottom-nav">
      <div className="nav-item-container">
        {icons.map((item, index) => (
          <button
            key={index}
            className={`nav-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            <img src={item.icon} alt={item.label} className="icon" />
          </button>
        ))}
      </div>
      {/* indicator는 CSS에서 중앙 고정 처리 */}
      <div className="indicator" />
    </div>
  );
};

export default BottomNavBar;
