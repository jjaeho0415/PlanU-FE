import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getChatRoomList = async (authorization: string) => {
  const response = await api.get<IGetGroupListResponseBodyType>({
    endpoint: apiRoutes.chatRoomsList,
    authorization,
  });
  return response;
};

export const useGetChatRoomList = (authorization: string) => {
  return useQuery({
    queryKey: ["CHATROOM_LIST"],
    queryFn: () => getChatRoomList(authorization),
    enabled: authorization !== "",
  });
};
