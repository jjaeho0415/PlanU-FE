import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getFriendList = async (authorization: string) => {
  const response = await api.get({
    endpoint: apiRoutes.friend,
    authorization,
  });
  return response;
};

export const useGetFriendList = (authorization: string) => {
  return useQuery({
    queryKey: ["friendList"],
    queryFn: () => getFriendList(authorization),
  });
};
