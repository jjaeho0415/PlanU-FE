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
