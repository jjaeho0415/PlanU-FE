import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getRequestFriendList = async (authorization: string) => {
  const response: IGetFriendListResponseBodyType = await api.get({
    endpoint: apiRoutes.showRequestFriendList,
    authorization,
  });
  return response;
};

export const useGetRequestFriendList = (authorization: string, activeTab: string) => {
  return useQuery({
    queryKey: ["REQUEST_FRIEND_LIST"],
    queryFn: () => getRequestFriendList(authorization),
    enabled: activeTab === "보낸요청",
  });
};
