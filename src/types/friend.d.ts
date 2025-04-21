type IGetFriendListResponseBodyType = {
  totalFriends: number;
  friends: IFriendItemType[];
};

type IFriendItemType = {
  name: string;
  username: string;
  profileImageUrl: string;
};

type IRecommendedFriendItemType = {
  name: string;
  username: string;
  profileImageUrl: string;
};

type IGetRecommendedFriendListResponseBodyType = {
  totalFriends: number;
  friends: IRecommendedFriendItemType[];
};
