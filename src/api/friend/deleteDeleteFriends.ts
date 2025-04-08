import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onMutate: () => {
      toast.loading("처리 중...", { id: "deleteFriendLoading" });
    },
    onSuccess: () => {
      toast.dismiss("deleteFriendLoading");
      toast.success("성공!");
      queryClient.invalidateQueries({
        queryKey: ["FRIEND_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("deleteFriendLoading");
      toast.error(error.message);
    },
  });
};
