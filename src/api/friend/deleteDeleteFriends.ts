import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteDeleteFriends = async (authorization: string, username: string) => {
  const response: IResponseType = await api.delete({
    endpoint: `${apiRoutes.friend}?username=${username}`,
    authorization,
  });
  return response;
};

export const useDeleteDeleteFriends = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => deleteDeleteFriends(authorization, username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FRIEND_LIST"],
      });
    },
    onError: (error) => alert(error.message),
  });
};
