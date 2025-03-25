type ILocationInfoType  =  UserLatLngType & {
  location: string;
};

type UserLatLngType = {
  lat: number;
  lng: number;
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