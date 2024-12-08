import api from "@api/fetcher";
import apiRoutes from "@api/apiRoutes";
import { useMutation } from "@tanstack/react-query";

const postRegister = async (body: IPostRegister): Promise<IResponseType> => {
  const endpoint = `${apiRoutes.users}`;
  return await api.post({ endpoint, body });
};

export const usePostRegister = () => {
  return useMutation({
    mutationFn: (data: IPostRegister) => postRegister(data),
  });
};
