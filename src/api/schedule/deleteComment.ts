import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_SCHEDULE_COMMENTS", groupId, scheduleId],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
