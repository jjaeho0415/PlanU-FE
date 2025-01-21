import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postRequestFriend = async (authorization: string, username: string) => {
  const response: IResponseType = await api.post({
    endpoint: `${apiRoutes.requestFriend}?username=${username}`,
    authorization,
  });
  return response;
};

export const usePostRequestFriend = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => postRequestFriend(authorization, username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
