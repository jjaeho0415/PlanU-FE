import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader";
import styles from "./notification.module.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import NotificationList from "../components/NotificationList";

const NotificationPage = () => {
  const { notifications, isLoading, error } = useOutletContext<{
    notifications: IGetNotificationListResponseBodyType;
    isLoading: boolean;
    error: Error | null;
  }>();
  const navigate = useNavigate();

  const sortedNotificationList = notifications.notificationList.sort((a, b) => {
    console.log(notifications.notificationList)
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    })

  if (isLoading) {
    return <div>로딩중...</div>
  }
  if (error) {
    return <div>오류 발생 : {error.message}</div>
  }

  return (
    <div className={styles.mainContainer}>
      <HasOnlyBackArrowHeader title="알림" handleClick={() => navigate(-1)} />
      <NotificationList notificationList={sortedNotificationList} />
    </div>
  );
};

export default NotificationPage;
