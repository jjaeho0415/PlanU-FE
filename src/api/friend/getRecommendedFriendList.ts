import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getRecommendedFriendList = async (authorization: string) => {
  const response: IGetRecommendedFriendListResponseBodyType = await api.get({
    endpoint: apiRoutes.showRecommendedFriendList,
    authorization,
  });

  return response;
};

const useGetRecommendedFriendList = (authorization: string, activeTab: string) => {
  return useQuery({
    queryKey: ["RECOMMENDED_FRIEND_LIST"],
    queryFn: () => getRecommendedFriendList(authorization),
    enabled: activeTab === "보낸요청",
  });
};

export default useGetRecommendedFriendList;
