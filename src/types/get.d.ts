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
