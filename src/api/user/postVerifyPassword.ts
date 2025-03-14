import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const verifyPassword = async (body: IVerifyPasswordRequest): Promise<IResponseType> => {
  const endpoint = `${apiRoutes.userVerifyPassword}`;
  return await api.post({ endpoint, body });
};

export const useVerifyPassword = () => {
  return useMutation({
    mutationFn: (data: IVerifyPasswordRequest) => verifyPassword(data),
  });
};
