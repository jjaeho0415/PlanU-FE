import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const changePassword = async (
  accessToken: string,
  body: IChangePasswordRequest,
): Promise<IResponseType> => {
  return await api.post({
    endpoint: `${apiRoutes.userChangePassword}`,
    authorization: accessToken,
    body,
  });
};

export const useChangePassword = (accessToken: string) => {
  return useMutation({
    mutationFn: (data: IChangePasswordRequest) => changePassword(accessToken, data),
  });
};
