export const notificationType = (eventType: string) => {
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
