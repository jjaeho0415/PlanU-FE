import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getComments = async (authorization: string, groupId: string, scheduleId: string) => {
  const response = api.get<IGetCommentList>({
    endpoint: `${apiRoutes.group}/${groupId}/schedules/${scheduleId}/comment`,
    authorization,
  });
  return response;
};

export const useGetComments = (authorization: string, groupId: string, scheduleId: string) => {
  return useQuery({
    queryKey: ["GROUP_SCHEDULE_COMMENTS", groupId, scheduleId],
    queryFn: () => getComments(authorization, groupId, scheduleId),
    enabled: groupId !== undefined && authorization !== "",
  });
};
