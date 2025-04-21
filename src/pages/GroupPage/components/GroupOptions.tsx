import styles from "./groupOptions.module.scss";
import moneyIcon from "@assets/images/groupPage/moneyIcon.png";
import postIcon from "@assets/images/groupPage/postIcon.png";
import calendarIcon from "@assets/images/groupPage/calendarIcon.png";
import memberIcon from "@assets/images/groupPage/memberIcon.png";
import chattingIcon from "@assets/images/groupPage/chattingIcon.png";
import { useNavigate } from "react-router-dom";

interface Props {
  title: "정산하기" | "그룹 달력" | "게시물" | "멤버" | "채팅" | string;
  groupId: string;
}

const GroupOptions: React.FC<Props> = ({ title, groupId }) => {

  const navigate = useNavigate();

  const IconOptions = () => {
    switch (title) {
      case "게시물":
        return <img src={postIcon} width={30} height={30} />;
      case "그룹 달력":
        return <img src={calendarIcon} width={30} height={30} />;
      case "정산하기":
        return <img src={moneyIcon} width={30} height={30} />;
      case "멤버":
        return <img src={memberIcon} width={30} height={30} />;
      case "채팅":
        return <img src={chattingIcon} width={30} height={30} />;
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
