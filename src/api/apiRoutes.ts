const apiRoutes = {
  // 유저관련
  users: "/users",
  userInformation: "/users/profile",
  userInformationExist: "/users/profile/exists",
  userProfile: "/users/my-info",
  userFindId: "/users/find-username",
  userFindPw: "/users/find-password",
  reissue: "/users/token/reissue",
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
  //스케줄 관련
  schedules: "/schedules",
  //채팅 관련
  chatRoomsList: "/chats",
  // 알림 관련
  readNotification: "/notification/read",
  notificationList: "/notification/list"
};

export default apiRoutes;
