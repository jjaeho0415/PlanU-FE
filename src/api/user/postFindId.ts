import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

const postFindId = async (body: IPostFindIdRequestBodyType): Promise<IResponseType> => {
  const endpoint = `${apiRoutes.userFindId}`;
  return await api.post({ endpoint, body });
};

export const usePostFindId = () => {
  return useMutation({
    mutationFn: (data: IPostFindIdRequestBodyType) => postFindId(data),
  });
};
