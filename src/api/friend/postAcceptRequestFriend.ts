import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postAcceptRequestFriend = async (authorization: string, username: string) => {
  const response: IResponseType = await api.post({
    endpoint: `${apiRoutes.acceptFriendRequest}?username=${username}`,
    authorization,
  });
  return response;
};

export const usePostAcceptRequestFriend = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => postAcceptRequestFriend(authorization, username),
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
