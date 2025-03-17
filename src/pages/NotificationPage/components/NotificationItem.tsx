import { useNavigate } from "react-router-dom";
import styles from "./notificationItem.module.scss";
import DefaultNotificationIcon from "@assets/Icons/alert/defaultAlert.svg?react";
import RedDotIcon from "@assets/Icons/headers/redDot.svg?react";
import { usePostReadNotification } from "@api/notification/postReadNotification";
import useAuthStore from "@store/useAuthStore";
import { notificationType } from "../utils/notificationType";
import { getRelativeTime } from "../utils/getRelativeTime";

interface Props {
  notificationItem: INotificationItemType;
}

const NotificationItem: React.FC<Props> = ({ notificationItem }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState();
  const { mutate: readNotification } = usePostReadNotification(accessToken);

  const handleNotificationClick = () => {
    if (!notificationItem.read) {
      readNotification(notificationItem.id);
    }
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
        <div className={styles.createdTimeText}>
          {getRelativeTime(notificationItem.createdDate)}
        </div>
        {!notificationItem.read && <RedDotIcon className={styles.redDotIcon} />}
      </div>
    </div>
  );
};

export default NotificationItem;
