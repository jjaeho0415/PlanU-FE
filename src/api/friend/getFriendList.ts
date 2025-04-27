import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useQuery } from "@tanstack/react-query";

const getFriendList = async (authorization: string) => {
  const response: IGetFriendListResponseBodyType = await api.get({
    endpoint: `${apiRoutes.friend}`,
    authorization,
  });
  return response;
};

export const useGetFriendList = (authorization: string, activeTab: string) => {
  return useQuery({
    queryKey: ["FRIEND_LIST"],
    queryFn: () => getFriendList(authorization),
    enabled: activeTab === "친구목록",
  });
};
