import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteComment = async (
  authorization: string,
  groupId: string,
  scheduleId: string,
  commentId: number,
) => {
  const endpoint = `${apiRoutes.group}/${groupId}/schedules/${scheduleId}/comment/${commentId}`;
  const response = await api.delete({
    endpoint,
    authorization,
  });

  return response;
};

export const useDeleteComment = (
  authorization: string,
  groupId: string,
  scheduleId: string,
  commentId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(authorization, groupId, scheduleId, commentId),
    onMutate: () => {
      toast.loading("처리 중...", { id: "deleteCommentLoading" });
    },
    onSuccess: () => {
      toast.dismiss("deleteCommentLoading");
      toast.success("댓글 삭제 완료");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_SCHEDULE_COMMENTS", groupId, scheduleId],
      });
    },
    onError: (error) => {
      toast.dismiss("deleteCommentLoading");
      toast.error(error.message);
    },
  });
};
