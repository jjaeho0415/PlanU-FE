import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupScheduleDetail = async (
  authorization: string,
  groupId: string,
  scheduleId: string,
) => {
  const response = api.get<IGetGroupScheduleDetailType>({
    endpoint: `${apiRoutes.group}/${groupId}/schedules/${scheduleId}`,
    authorization,
  });
  return response;
};

export const useGetGroupScheduleDetail = (
  authorization: string,
  groupId: string,
  scheduleId: string,
) => {
  return useQuery({
    queryKey: ["GROUP_SCHEDULE_DETAIL", groupId, scheduleId],
    queryFn: () => getGroupScheduleDetail(authorization, groupId, scheduleId),
    enabled: groupId !== undefined && authorization !== "",
  });
};
