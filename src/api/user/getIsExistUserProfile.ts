import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";

export const getIsExistUserProfile = async (authorization: string): Promise<string> => {
  const response = await api.get<IResponseType>({
    endpoint: apiRoutes.userInformationExist,
    authorization,
  });
  return response.resultMsg;
};
