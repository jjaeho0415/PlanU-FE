import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const verifyPassword = async (
  accessToken: string,
  body: IVerifyPasswordRequest,
): Promise<IResponseType> => {
  return await api.post({
    endpoint: `${apiRoutes.userVerifyPassword}`,
    authorization: accessToken,
    body,
  });
};

export const useVerifyPassword = (accessToken: string) => {
  return useMutation({
    mutationFn: (data: IVerifyPasswordRequest) => verifyPassword(accessToken, data),
  });
};
