import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getReceiveFriendList = async (authorization: string) => {
  const response: IGetFriendListResponseBodyType = await api.get({
    endpoint: apiRoutes.showReceiveFriendList,
    authorization,
  });
  return response;
};

export const useGetReceiveFriendList = (authorization: string, activeTab: string) => {
  return useQuery({
    queryKey: ["RECEIVE_FRIEND_LIST"],
    queryFn: () => getReceiveFriendList(authorization),
    enabled: activeTab === "받은요청",
  });
};
