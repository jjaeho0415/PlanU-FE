import styles from "./groupOptions.module.scss";
import MoneyIcon from "@assets/Icons/groupPage/moneyIcon.svg?react";
import PostIcon from "@assets/Icons/groupPage/postIcon.svg?react";
import CalendarIcon from "@assets/Icons/groupPage/calendarIcon.svg?react";
import MemberIcon from "@assets/Icons/groupPage/memberIcon.svg?react";
import ChattingIcon from "@assets/Icons/groupPage/chattingIcon.svg?react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: "정산하기" | "그룹 달력" | "게시물" | "멤버" | "채팅" | string;
  groupId: number;
}

const GroupOptions: React.FC<Props> = ({ title, groupId }) => {

  const navigate = useNavigate();

  const IconOptions = () => {
    switch (title) {
      case "게시물":
        return <PostIcon width={30} height={30} />;
      case "그룹 달력":
        return <CalendarIcon width={30} height={30} />;
      case "정산하기":
        return <MoneyIcon width={30} height={30} />;
      case "멤버":
        return <MemberIcon width={30} height={30} />;
      case "채팅":
        return <ChattingIcon width={30} height={30} />;
      default:
        return;
    }
  };

  const handleIconClick = () => {
    switch (title) {
      case "게시물":
        return alert("서비스 준비중")
      case "그룹 달력":
        return navigate(`/group/${groupId}/groupCalendar`);
      case "정산하기":
        return alert("서비스 준비중");
      case "멤버":
        return navigate(`/group/${groupId}/members`);
      case "채팅":
        return navigate(`/group/${groupId}/chatting`);
      default:
        return;
    }
  };

  return (
    <div className={styles.mainContainer} onClick={handleIconClick}>
      {IconOptions()}
      <div className={styles.titleSection}>{title}</div>
    </div>
  );
};

export default GroupOptions;
