// 그룹 멤버 목록 조회 api
type IGetGroupMemberListResponseBodyType = {
  members: IGroupMemberItemType[];
};

type IGroupMemberItemType = {
  name: string;
  username: string;
  profileImage: string;
  groupRole: "LEADER" | "PARTICIPANT";
  friendStatus: "RECEIVE" | "FRIEND" | "NONE" | "ME" | "REQUEST";
};

// 그룹 초대 목록 조회 api
type IGetGroupInviteListResponseBodyType = {
  data: IGetGroupInviteItemType[];
};

type IGetGroupInviteItemType = {
  groupId: number;
  groupName: string;
  groupImageUrl: string;
};

// 그룹 목록 조회 api
type IGetGroupListResponseBodyType = {
  data: IGetGroupItemType[];
};

type IGetGroupItemType = IGetGroupInviteItemType & {
  participant: number;
  isPin: boolean;
};

// 그룹 생성 api
type IPostCreateGroupRequestBodyType = {
  groupName: string;
  groupImage: File;
};

type IPostCreateGroupResponseBodyType = {
  groupId: number;
  groupName: string;
  leaderUserName: string;
  groupImageUrl: string;
};

// 그룹 Today 일정 조회 api
type IGetGroupTodaySchedulesResponseBodyType = {
  groupName: string;
  todaySchedules: ITodaySchedulesType[];
};

type ITodaySchedulesType = {
  id: number;
  title: string;
  startDateTime: string;
  location: string;
};

// 그룹 일정 조회 api
type IGetGroupCalendarSchedulesResponseBodyType = {
  groupSchedules: IGroupSchedulesType[];
};

type IGroupSchedulesType = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
};

// 그룹 정보 조회 api
type IGetGroupDetailsResponseBodyType = {
  groupInfo: IGroupInfoType;
};

type IGroupInfoType = {
  groupName: string;
  groupImage: string;
  isPin: boolean;
};
// 그룹 상대 초대 목록 조회 api(그룹원이 아닌 친구 목록)
type IGetGroupMemberInviteListResponseBodyType = {
  nonGroupFriends: IGetNonGroupFriendType[];
};

type IGetNonGroupFriendType = {
  profileImage: string;
  name: string;
  username: string;
  status: "PROGRESS" | "NONE";
};

// 그룹 멤버 초대 api
type IPostInviteGroupMemberResponseType = {
    invitedUsername: string;
    groupId: number;
    groupName: string;
    groupImageUrl: string;
}

// 그룹 총 인원 수 조회 api
type IGetGroupTotalMemberCountResponseBodyType = {
  countOfMembers: number;
}