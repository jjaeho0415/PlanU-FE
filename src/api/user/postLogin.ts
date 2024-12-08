import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

const postLogin = async (body: IPostLogin): Promise<IResponseType> => {
  const endpoint = `${apiRoutes.users}/login`;
  return await api.post({ endpoint, body });
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (data: IPostLogin) => postLogin(data),
  });
};
