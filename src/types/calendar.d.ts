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
