// 알림 조회
type IGetNotificationListResponseBodyType = {
  notificationList: INotificationItemType[];
};

type INotificationItemType = {
  id: number;
  eventType:
    | "FRIEND_REQUEST"
    | "FRIEND_ACCEPT"
    | "SCHEDULE_REMINDER"
    | "BIRTHDAY"
    | "GROUP_DELETE"
    | "GROUP_INVITE"
    | "GROUP_ACCEPT"
    | "GROUP_EXPEL"
    | "GROUP_SCHEDULE_DELETE"
    | "GROUP_SCHEDULE_CREATE"
    | "COMMENT"
    | "GROUP_INVITATION_CANCELLED"
    | "GROUP_MEMBER_LEFT";
  contents: string;
  read: boolean;
  relatedUrl: string;
  createdDate: string;
};
