import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IPostComment) => postCreateComment(authorization, groupId, scheduleId, body),
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
