import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getChatMessages = async (authorization: string, groupId: string, messageId?: string) => {
  const response = await api.get<IChatMessageResponse>({
    endpoint: `${apiRoutes.chatMessages}?groupId=${groupId}${messageId ? `&messageId=${messageId}` : ""}`,
    authorization,
  });
  return response;
};

export const useGetChatMessages = (authorization: string, groupId: string, messageId?: string) => {
  return useQuery({
    queryKey: ["CHAT_MESSAGES"],
    queryFn: () => getChatMessages(authorization, groupId, messageId),
    enabled: authorization !== "",
  });
};
