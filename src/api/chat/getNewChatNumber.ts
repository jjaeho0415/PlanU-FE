import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getNewChatNumber = async (authorization: string) => {
  const response = await api.get<number>({
    endpoint: `${apiRoutes.chatRoomsList}/new`,
    authorization,
  });
  return response;
};

export const useGetNewChatNumber = (authorization: string) => {
  return useQuery({
    queryKey: ["NEW_CHAT_NUMBER"],
    queryFn: () => getNewChatNumber(authorization),
    enabled: authorization !== "",
    refetchInterval: 5000,
  });
};
