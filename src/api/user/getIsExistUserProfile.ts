import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";

export const getIsExistUserProfile = async (authorization: string): Promise<string> => {
  try {
    const response = await api.get<IResponseType>({
      endpoint: apiRoutes.userInformationExist,
      authorization,
    });
    return response.resultMsg;
  } catch (error) {
    console.error(error);
    throw new Error("유효한 액세스 토큰이 아닙니다");
  }
};
