import NotificationItem from "./NotificationItem";
import styles from "./notificationList.module.scss";

interface Props {
  notificationList: INotificationItemType[];
}

const NotificationList: React.FC<Props> = ({ notificationList }) => {
  return (
    <div className={styles.notificationListContainer}>
      {notificationList.length > 0 ? (
        notificationList.map((notificationItem) => (
          <NotificationItem notificationItem={notificationItem} key={notificationItem.id} />
        ))
      ) : (
        <div className={styles.noNotificationListSection}>알림 내역이 없습니다.</div>
      )}
      <div className={styles.bottomSection}>
        <div className={styles.bottomText}>알림은 6개월동안 보관됩니다</div>
        <hr className={styles.bottomLine} />
      </div>
    </div>
  );
};

export default NotificationList;
