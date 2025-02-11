type IGetFriendListResponseBodyType = {
  totalFriends: number;
  friends: IFriendItemType[];
};

type IFriendItemType = {
  name: string;
  username: string;
  profileImageUrl: string;
};
