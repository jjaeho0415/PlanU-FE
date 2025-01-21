type IGetResponseGroupDetailType = {
  groupName: string;
  todaySchedules: ITodaySchedulesType[];
  groupSchedules: IGroupSchedulesType[];
};

type ITodaySchedulesType = {
  id: number;
  title: string;
  startDateTime: string;
  location: string;
};

type IGroupSchedulesType = {
  id: number;
  title: string;
  startDateTime: string;
  endDateTime: string;
  color: string;
};

type IGetFriendMemberType = {
  profileImage: string;
  name: string;
  username: string;
  status: "PROGRESS" | "NONE";
};

type IGetGroupMembersType = {
  members: IGroupMemberType[];
};

type IGroupMemberType = {
  name: string;
  username: string;
  profileImage: string;
  groupRole: "LEADER" | "PARTICIPANT";
  friendStatus: "RECEIVE" | "FRIEND" | "NONE" | "ME" | "REQUEST";
};

type IGetScheduleType = {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
};

type IGetGroupPossibleScheduleType = {
  date: string;
  possibleRatio: number;
};

type IGetGroupMemberItemType = {
  location: string;
  lat: number;
  lng: number;
  name: string;
  profileImage: string;
};

type IGetGroupListItemType = IGetGroupInviteListItemType & {
  participant: number;
};

type IGetGroupInviteListItemType = {
  groupId: number;
  groupName: string;
  groupImageUrl: string;
};
