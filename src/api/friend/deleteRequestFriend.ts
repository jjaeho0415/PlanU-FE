import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteRequestFriend = async (authorization: string, username: string) => {
  const response: IResponseType = await api.delete({
    endpoint: `${apiRoutes.cancelFriendRequest}?username=${username}`,
    authorization,
  });
  return response;
};

export const useDeleteRequestFriend = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => deleteRequestFriend(authorization, username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
    },
    onError: (error) => alert(error.message),
  });
};
