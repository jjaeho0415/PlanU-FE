type IGetResponseGroupDetailType = {
  groupName: string;
  todaySchedules: ITodaySchedulesType[];
  groupSchedules: IGroupSchedulesType[];
};

type IGetFriendMemberType = {
  profileImage: string;
  name: string;
  username: string;
  status: "PROGRESS" | "NONE";
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

//가능한 날짜
type IGetAvailableMemberInfoType = {
  memberName: string;
  profileImage: string;
  availableDates: string[];
};

type IGetAvailableDateInfo = {
  availableDate: string;
  memberNames: string[];
};
