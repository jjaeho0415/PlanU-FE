type IArrivalLocationInfo = {
  location?: string;
  latitude: number;
  longitude: number;
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
  latitude: number;
  longitude: number;
  name: string;
  username: string;
  profileImage: string;
};