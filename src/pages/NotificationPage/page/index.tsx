import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader"
import styles from "./notification.module.scss"
import { useNavigate } from "react-router-dom"
import AlertList from "../components/NotificationList";

const notificationList: INotificationItemType[] = [
  {
    id: 1,
    eventType: "FRIEND_REQUEST",
    contents: "이수현님이 친구요청을 보냈습니다.",
    read: false,
    relatedUrl: "/myPage/friendsManagement",
  },
  {
    id: 2,
    eventType: "FRIEND_ACCEPT",
    contents: "이상준님이 친구요청을 수락하였습니다.",
    read: false,
    relatedUrl: "/myPage/friendsManagement",
  },
  {
    id: 3,
    eventType: "SCHEDULE_REMINDER",
    contents: "영화 보기 일정이 하루 남았습니다.",
    read: false,
    relatedUrl: "/mySchedule/2",
  },
  {
    id: 4,
    eventType: "SCHEDULE_REMINDER",
    contents: "회의 일정 2시간 전",
    read: true,
    relatedUrl: "/group/1/calendar/schedule/4",
  },
  {
    id: 5,
    eventType: "GROUP_DELETE",
    contents: "MyGroup 그룹이 삭제되었습니다.",
    read: false,
    relatedUrl: "/groupList",
  },
  {
    id: 6,
    eventType: "GROUP_INVITE",
    contents: "이상준님이 그룹 초대 요청을 보냈습니다.",
    read: false,
    relatedUrl: "/groupList",
  },
  {
    id: 7,
    eventType: "GROUP_ACCEPT",
    contents: "이상준님이 그룹 초대 요청을 수락하였습니다.",
    read: false,
    relatedUrl: "/group/1/members",
  },
  {
    id: 8,
    eventType: "GROUP_EXPEL",
    contents: "MyGroup 그룹에서 추방되었습니다.",
    read: true,
    relatedUrl: "/groupList",
  },
  {
    id: 9,
    eventType: "GROUP_SCHEDULE_DELETE",
    contents: "그룹 일정 '프로젝트 회의'이(가) 삭제되었습니다",
    read: true,
    relatedUrl: "/group/1/groupCalendar",
  },
  {
    id: 10,
    eventType: "GROUP_SCHEDULE_CREATE",
    contents: "그룹 일정 '프로젝트 회의'이(가) 생성되었습니다",
    read: true,
    relatedUrl: "/group/1/calendar/schedule/4",
  },
  {
    id: 11,
    eventType: "COMMENT",
    contents: "[밥먹기] 이상준님이 댓글을 작성했습니다.",
    read: false,
    relatedUrl: "/group/1/calendar/schedule/4",
  },
  {
    id: 12,
    eventType: "BIRTHDAY",
    contents: "오늘은 이상준님의 생일입니다.",
    read: false,
    relatedUrl: "/group/1/calendar/schedule/4",
  },
];


const NotificationPage = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="알림" handleClick={() => navigate(-1)} />
      <AlertList notificationList={notificationList} />
    </div>
  );
}

export default NotificationPage