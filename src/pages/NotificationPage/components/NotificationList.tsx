import styles from "./notificationList.module.scss"

interface Props{
  notificationList: INotificationItemType[];
}

const NotificationList:React.FC<Props> = ({notificationList}) => {
  return (
    <div className={styles.alertListContainer}>NotificationList</div>
  )
}

export default NotificationList