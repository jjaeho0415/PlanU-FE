import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupTodaySchedules = async (groupId: string, authorization: string) => {
  const response = await api.get<IGetGroupTodaySchedulesResponseBodyType>({
    endpoint: `${apiRoutes.group}/${groupId}/today`,
    authorization,
  });
  return response;
};

export const useGetGroupTodaySchedules = (groupId: string, authorization: string) => {
  return useQuery({
    queryKey: ["GROUP_TODAY_SCHEDULES"],
    queryFn: () => getGroupTodaySchedules(groupId, authorization),
    enabled: authorization !== null,
  });
};
