import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getUserInfo = async (accessToken: string): Promise<IGetUserInfoResponseBodyType> => {
  return await api.get({
    endpoint: `${apiRoutes.userProfile}`,
    authorization: accessToken,
  });
};

export const useGetUserInfo = (accessToken: string) => {
  return useQuery({
    queryKey: ["USER_INFO"],
    queryFn: () => getUserInfo(accessToken),
    enabled: accessToken !== "",
  });
};
