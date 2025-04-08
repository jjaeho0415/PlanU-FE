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

type IChatItem = {
  type: number;
  messageId: number;
  message: string;
  sender: string;
  unReadCount: number;
  chatDate: string;
  chatTime: string;
  profileImageUrl: string;
  name: string;
};

type IGroupedChatMessages = {
  chatDate: string;
  messages: IChatItem[];
};

type IChatMessageResponse = {
  data: IGroupedChatMessages[];
};
