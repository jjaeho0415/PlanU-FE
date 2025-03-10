import { useNavigate } from "react-router-dom";
import styles from "./notificationItem.module.scss";
import DefaultNotificationIcon from "@assets/Icons/alert/defaultAlert.svg?react";
import RedDotIcon from "@assets/Icons/headers/redDot.svg?react";
import { usePostReadNotification } from "@api/notification/postReadNotification";
import useAuthStore from "@store/useAuthStore";

const notificationType = (eventType: string) => {
  switch (eventType) {
    case "FRIEND_REQUEST":
      return "친구 요청 알림";
    case "FRIEND_ACCEPT":
      return "친구 요청 수락 알림";
    case "SCHEDULE_REMINDER":
      return "일정 알림";
    case "GROUP_DELETE":
      return "그룹 삭제 알림";
    case "GROUP_INVITE":
      return "그룹 초대 알림";
    case "GROUP_ACCEPT":
      return "그룹 초대 수락 알림";
    case "GROUP_EXPEL":
      return "그룹 강제 탈퇴 알림";
    case "GROUP_SCHEDULE_DELETE":
      return "그룹 일정 삭제 알림";
    case "GROUP_SCHEDULE_CREATE":
      return "그룹 일정 생성 알림";
    case "COMMENT":
      return "그룹 일정 댓글 알림";
    case "BIRTHDAY":
      return "생일 알림";
  }
};

interface Props {
  notificationItem: INotificationItemType;
}

const NotificationItem: React.FC<Props> = ({ notificationItem }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState();
  const { mutate: readNotification } = usePostReadNotification(accessToken);

  const handleNotificationClick = () => {
    // readNotification(notificationItem.id);
    navigate(`${notificationItem.relatedUrl}`);
  };

  return (
    <div className={styles.notificationItemContainer} onClick={handleNotificationClick}>
      <div className={styles.leftSection}>
        <DefaultNotificationIcon width={53} height={51} />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.eventTypeText}>{notificationType(notificationItem.eventType)}</div>
        <div className={styles.contentsText}>{notificationItem.contents}</div>
        <div className={styles.createdTimeText}>1일 전</div>
        {!notificationItem.read && <RedDotIcon className={styles.redDotIcon} />}
      </div>
    </div>
  );
};

export default NotificationItem;
