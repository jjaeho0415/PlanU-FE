import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const postRequestFriend = async (authorization: string, username: string) => {
  const response: IResponseType = await api.post({
    endpoint: `${apiRoutes.requestFriend}?username=${username}`,
    authorization,
  });
  return response;
};

export const usePostRequestFriend = (
  authorization: string,
  setId?: React.Dispatch<React.SetStateAction<string>>,
  setActiveTab?: React.Dispatch<React.SetStateAction<"친구목록" | "받은요청" | "보낸요청">>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => postRequestFriend(authorization, username),
    onMutate: () => {
      toast.loading("처리 중...", { id: "requestFriendLoading" });
    },
    onSuccess: () => {
      toast.dismiss("requestFriendLoading");
      toast.success("성공!");
      setId && setId("");
      setActiveTab && setActiveTab("보낸요청");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["REQUEST_FRIEND_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("requestFriendLoading");
      toast.error(error.message);
    },
  });
};
