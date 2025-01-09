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
}

type IGroupSchedulesType = {
    id: number;
    title: string;
    startDateTime: string;
    endDateTime: string;
    color: string;
}

type IGetFriendMemberType = {
    profileImageUrl: string;
    name: string;
    username: string;
    requestState: "progress" | "none";
}

type IGetGroupMembersType = {
    members: IGroupMemberType[];
}

type IGroupMemberType = {
    name: string;
    username: string;
    profileImageUrl: string;
    groupRole: "LEADER" | "PARTICIPANT";
    friendStatus: "RECEIVE" | "FRIEND" | "NOT_FRIEND" | "ME";
}

type IGetScheduleType = {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
};

type IGetGroupPossibleScheduleType = {
    date: string;
    possibleRatio: number;
}