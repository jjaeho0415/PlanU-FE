import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

type IGetUserInfoResponseType = {
  name: string;
  profileImage: string;
  username: string;
  email: string;
  birthday: string;
};

const getUserInfo = async (accessToken: string):Promise<IGetUserInfoResponseType> => {
  return await api.get({
    endpoint: `${apiRoutes.userProfile}`,
    authorization: accessToken,
  });
};

export const useGetUserInfo = (accessToken: string) => {
    return useQuery({
        queryKey: ['UserProfile'],
        queryFn: () => getUserInfo(accessToken),
      
    })
}