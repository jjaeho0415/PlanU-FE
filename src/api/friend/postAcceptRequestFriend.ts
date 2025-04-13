import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onMutate: () => {
      toast.loading("처리 중...", { id: "accessRequestFriendLoading" });
    },
    onSuccess: () => {
      toast.dismiss("accessRequestFriendLoading");
      toast.success("성공!");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["FRIEND_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["RECEIVE_FRIEND_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("accessRequestFriendLoading");
      toast.error(error.message);
    },
  });
};
