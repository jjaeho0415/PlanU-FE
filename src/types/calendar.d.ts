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
}

type IScheduleItemType = {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  groupId: string;
  id: number;
  color: string;
}

// 그룹 달력 일정 유무 조회 api - 그룹 달력 페이지
type IGetGroupCalendarCheckEventsResponseBodyType = {
  groupScheduleData: IGroupScheduleType[]
}

type IGroupScheduleType = {
  date: string;
  isSchedule: boolean;
  isBirthday: boolean;
};