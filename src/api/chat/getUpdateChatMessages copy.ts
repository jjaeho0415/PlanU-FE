import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getUpdateChatMessages = async (
  authorization: string,
  groupId: string,
  startId: number,
  endId: number,
) => {
  const response = await api.get<IUpdateMessageResponse>({
    endpoint: `${apiRoutes.chatMessages}/update?groupId=${groupId}&startId=${startId}&endId=${endId}`,
    authorization,
  });
  return response;
};

export const useGetUpdateChatMessages = (
  authorization: string,
  groupId: string,
  startId: number,
  endId: number,
  type: number,
) => {
  return useQuery({
    queryKey: ["UPDATED_CHAT_MESSAGES", groupId, startId, endId],
    queryFn: () => getUpdateChatMessages(authorization, groupId, startId, endId),
    enabled: authorization !== "" && startId !== -1 && endId !== -1 && type === 3,
  });
};
