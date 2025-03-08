//채팅방 목록
type IGetChatListType = { data: IChatRoomResponseType[] };

type IChatRoomResponseType = {
  groupId: number;
  groupName: string;
  groupImageUrl: string;
  participant: number;
  isPin: boolean;
  lastChat: string;
  lastChatDate: string;
  lastChatTime: string;
  unreadChats: number;
};
