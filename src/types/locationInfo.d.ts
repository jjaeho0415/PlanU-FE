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
  location: string;
  lat: number;
  lng: number;
  name: string;
  profileImage: string;
};