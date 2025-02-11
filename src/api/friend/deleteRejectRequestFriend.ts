import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteRejectRequestFriend = async (authorization: string, username: string) => {
  const response: IResponseType = await api.delete({
    endpoint: `${apiRoutes.rejectFriendRequest}?username=${username}`,
    authorization,
  });
  return response;
};

export const useDeleteRejectRequestFriend = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => deleteRejectRequestFriend(authorization, username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["RECEIVE_FRIEND_LIST"],
      });
    },
    onError: (error) => alert(error.message),
  });
};
