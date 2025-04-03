type IGetArrivalLocationInfoResponseBodyType = {
  groupScheduleLocation: IArrivalLocationInfo;
}

type IArrivalLocationInfo = {
  location?: string;
  latitude: number;
  longitude: number;
  startTime: string;
}

type UserLatLngType = {
  latitude: number;
  longitude: number;
};

type SearchLocationResultType = {
  formatted_address: string;
  name: string;
  lat: number;
  lng: number;
};

type IGetGroupMemberLocationResponseType = {
  groupMemberLocations: IMemberLocationType[];
};

type IMemberLocationType = {
  latitude: number;
  longitude: number;
  name: string;
  username: string;
  profileImage: string;
}