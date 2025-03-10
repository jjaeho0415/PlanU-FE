//일정 생성
type IPostCreateGroupScheduleType = {
  title: string;
  color: string;
  startDateTime: string;
  endDateTime: string | null;
  location: string;
  latitude: number;
  longitude: number;
  participants: string[];
  memo: string;
};

type IGetMemberType = {
  name: string;
  userName: string;
  profileImage: string;
};

type IPostCreateMyScheduleType = {
  title: string;
  color: string;
  startDateTime: string;
  endDateTime: string | null;
  location: string;
  latitude: number;
  longitude: number;
  participants: string[];
  unregisteredParticipants: string[];
  memo: string;
};

// 하나의 날짜에 대한 일정, 생일 정보 api - 그룹,나의 달력 페이지
type IGetScheduleListResponseBodyType = {
  schedules: IGroupScheduleItemType[];
  birthdayPerson: string[];
};

type IScheduleItemType = {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  groupId: string;
  id: number;
  color: string;
};

// 그룹 달력 일정 유무 조회 api - 그룹 달력 페이지
type IGetGroupCalendarCheckEventsResponseBodyType = {
  groupScheduleData: IGroupScheduleType[];
};

type IGroupScheduleType = {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
};

// 그룹 달력 - 가능한 날짜 조회 api
type IGetGroupAvailableDatesCalendarResponseBodyType = {
  availableDateRatios: IGroupPossibleScheduleItemType[];
};

type IGroupAvailableDatesCalendarItemType = {
  date: string;
  ratio: number;
};

// 그룹 달력 - 가능한 날짜(해당 날짜 가능한 멤버 리스트) api
type IGetGroupAvailableDatesMemberListResponseBodyType = {
  availableMembers: string[];
};

// 그룹 달력 - 가능한 날짜(멤버별) api
type IGetGroupAvailableDatesMemberInfosResponseBodyType = {
  availableMemberInfos: IGroupAvailableDatesMemberInfoItemType[];
};

type IGroupAvailableDatesMemberInfoItemType = {
  name: string;
  profileImage: string;
  availableDates: string[];
};

// 그룹 달력 - 가능한 날짜(날짜별) api
type IGetGroupAvailableDatesDateInfoResponseBodyType = {
  availableDateInfos: IGroupAvailableDatesDateInfoItemType[];
};

type IGroupAvailableDatesDateInfoItemType = {
  availableDate: string;
  memberNames: string[];
};

// 그룹 달력 - 가능한 날짜(순위) api
type IGetGroupAvailableDatesRanksResponseBodyType = {
  availableDateRanks: IGroupAvailableDatesRankItemType[];
};

type IGroupAvailableDatesRankItemType = {
  ranks: number;
  date: string;
  countOfAvailableMembers: number;
};

//그룹 일정 상세 조회
type IParticipants = {
  profileImage: string;
  name: string;
  username: string;
};

type IGetGroupScheduleDetailType = {
  groupScheduleId: number;
  title: string;
  color: string;
  startDate: string;
  endDate: string;
  location: string;
  latitude: number;
  longitude: number;
  participants: IParticipants[];
  memo: string;
};
