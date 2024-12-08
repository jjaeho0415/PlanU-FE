import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getIsExistUserProfile = async (authorization: string): Promise<IResponseType> => {
  try {
    const response = await api.get<IResponseType>({
      endpoint: apiRoutes.userInformationExist,
      authorization,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("유효한 액세스 토큰이 아닙니다");
  }
};

export const useGetIsExistUserProfile = (accessToken: string) => {
  return useQuery<IResponseType>({
    queryKey: ["userProfileExist", accessToken],
    queryFn: () => getIsExistUserProfile(accessToken),
    enabled: accessToken !== "",
  });
};
