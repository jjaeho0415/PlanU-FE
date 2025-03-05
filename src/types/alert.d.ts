// 알림 조회
type IGetNotificationListResponseBodyType = {
  notificationList: INotificationItemType[];
};

type INotificationItemType = {
  id: number;
  eventType: "FRIEND_REQUEST" | "FRIEND_ACCEPT" | "SCHEDULE_REMINDER" | "BIRTHDAY";
  contents: string;
  read: boolean;
};
