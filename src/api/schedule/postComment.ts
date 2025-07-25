import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const postCreateComment = async (
  authorization: string,
  groupId: string,
  scheduleId: string,
  body: IPostComment,
) => {
  const response = await api.post({
    endpoint: `${apiRoutes.group}/${groupId}/schedules/${scheduleId}/comment`,
    body,
    authorization,
  });

  return response;
};

export const usePostCreateComment = (
  authorization: string,
  groupId: string,
  scheduleId: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IPostComment) => postCreateComment(authorization, groupId, scheduleId, body),
    onMutate: () => {
      toast.loading("처리 중..", { id: "createCommentLoading" });
    },
    onSuccess: () => {
      toast.dismiss("createCommentLoading");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_SCHEDULE_COMMENTS", groupId, scheduleId],
      });
      setMessage("");
    },
    onError: (error) => {
      toast.dismiss("createCommentLoading");
      toast.error(error.message);
    },
  });
};
