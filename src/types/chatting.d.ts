//채팅방 목록
type chatRoomResponseDTO = {
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
