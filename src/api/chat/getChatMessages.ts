import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getChatMessages = async (authorization: string) => {
  const response = await api.get<IChatMessageResponse>({
    endpoint: apiRoutes.chatMessages,
    authorization,
  });
  return response;
};

export const useGetChatMessages = (authorization: string) => {
  return useQuery({
    queryKey: ["CHAT_MESSAGES"],
    queryFn: () => getChatMessages(authorization),
    enabled: authorization !== "",
  });
};
