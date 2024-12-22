import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

const postFindPw = async (body: IPostFindPassword): Promise<IResponseType> => {
  const endpoint = `${apiRoutes.userFindPw}`;
  return await api.post({ endpoint, body });
};

export const usePostFindPw = () => {
  return useMutation({
    mutationFn: (data: IPostFindPassword) => postFindPw(data),
  });
};
