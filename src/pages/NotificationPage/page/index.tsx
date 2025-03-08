import HasOnlyBackArrowHeader from "@components/headers/HasOnlyBackArrowHeader"
import styles from "./alert.module.scss"
import { useNavigate } from "react-router-dom"
import AlertList from "../components/NotificationList";

// const notificationList: INotificationItemType[] = {
//   [
//     id: 1,
  
//   ]
// }

const NotificationPage = () => {

    const navigate = useNavigate();

  return (
      <div className={styles.mainContainer}>
          <HasOnlyBackArrowHeader title="알림" handleClick={() => navigate(-1)} />
          <AlertList notificationList={[]}/>
    </div>
  )
}

export default NotificationPage