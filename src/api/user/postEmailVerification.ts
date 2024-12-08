import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

const postEmailVerification = async (body: IEmailBody): Promise<IResponseType> => {
  const endpoint = `${apiRoutes.users}/email-verification/sends`;
  return await api.post({ endpoint, body });
};

export const usePostEmailVerification = () => {
  return useMutation({
    mutationFn: (data: IEmailBody) => postEmailVerification(data),
  });
};
