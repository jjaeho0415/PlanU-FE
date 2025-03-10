// 알림 조회
type IGetNotificationListResponseBodyType = {
  notificationList: INotificationItemType[];
};

type INotificationItemType = {
  id: number;
  eventType: "FRIEND_REQUEST" | "FRIEND_ACCEPT" | "SCHEDULE_REMINDER" | "BIRTHDAY" | "GROUP_DELETE" | "GROUP_INVITE" | "GROUP_ACCEPT" | "GROUP_EXPEL" | "GROUP_SCHEDULE_DELETE" | "GROUP_SCHEDULE_CREATE" | "COMMENT";
  contents: string;
    read: boolean;
    relatedUrl: string;
};

