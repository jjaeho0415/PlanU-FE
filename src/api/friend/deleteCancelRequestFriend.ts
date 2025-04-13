import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteCancelRequestFriend = async (authorization: string, username: string) => {
  const response: IResponseType = await api.delete({
    endpoint: `${apiRoutes.cancelFriendRequest}?username=${username}`,
    authorization,
  });
  return response;
};

export const useDeleteCancelRequestFriend = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => deleteCancelRequestFriend(authorization, username),
    onMutate: () => {
      toast.loading("처리 중...", { id: "cancelRequestFriendLoading" });
    },
    onSuccess: () => {
      toast.dismiss("cancelRequestFriendLoading");
      toast.success("성공!");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["REQUEST_FRIEND_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("cancelRequestFriendLoading");
      toast.error(error.message);
    },
  });
};
