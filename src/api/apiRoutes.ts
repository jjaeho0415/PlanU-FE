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
  leaveGroup:"groups/leave", 
  deleteGroup: "/groups/delete",
  
};

export default apiRoutes;
