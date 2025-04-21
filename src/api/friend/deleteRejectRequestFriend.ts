import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onMutate: () => {
      toast.loading("처리 중...", { id: "rejectRequestFriendLoading" });
    },
    onSuccess: () => {
      toast.dismiss("rejectRequestFriendLoading");
      toast.success("성공!");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["RECEIVE_FRIEND_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("rejectRequestFriendLoading");
      toast.error(error.message);
    },
  });
};
