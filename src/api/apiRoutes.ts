const apiRoutes = {
  // 유저관련
  users: "/users",
  userInformation: "/users/profile",
  userInformationExist: "/users/profile/exists",
  userProfile: "/users/my-info",
  userFindId: "/users/find-username",
  userFindPw: "/users/find-password",
  reissue: "/users/token/reissue",
  userVerifyPassword: "/users/verify-password",
  userChangePassword: "/users/validate-new-password",
  updateUserLocation: "/users/location/update",
  logout: "/users/logout",
  // 그룹 관련
  group: "/groups",
  createGroup: "/groups/create",
  inviteGroupMember: "/groups/invite",
  acceptGroupInvitation: "/groups/join",
  showGroupList: "/groups/list",
  rejectGroupInvitation: "/groups/decline",
  showGroupInvitationList: "/groups/inviteList",
  leaveGroup: "/groups/leave",
  deleteGroup: "/groups/delete",
  pin: "/groups/pin",
  // 친구 관련
  requestFriend: "/users/friends/request",
  acceptFriendRequest: "/users/friends/request-accept",
  rejectFriendRequest: "/users/friends/request-reject",
  cancelFriendRequest: "/users/friends/request-cancel",
  friend: "/users/friends",
  showReceiveFriendList: "/users/friends/receive",
  showRequestFriendList: "/users/friends/request",
  showRecommendedFriendList: "/users/friends/recommendations",
  //스케줄 관련
  schedules: "/schedules",
  availableDates: "/available-dates",
  //채팅 관련
  chatRoomsList: "/chats",
  chatMessages: "/chats/messages",
  chatImage: "/chats/file",
  // 알림 관련
  readNotification: "/notification/read",
  notificationList: "/notification/list",
  readAllNotifications: "/notification/read-all",
  //실시간 위치 공유 소켓 연결
  locationGroups: "/location/groups",
  subLocation: "/sub/location/groups",
  pubLocation: "/pub/location/groups",
};

export default apiRoutes;
