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