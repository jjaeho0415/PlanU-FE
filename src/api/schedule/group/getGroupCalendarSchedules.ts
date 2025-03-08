import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupCalendarSchedules = async (
  groupId: string,
  authorization: string,
  startDate: string,
  endDate: string,
) => {
  const response = await api.get<IGetGroupCalendarSchedulesResponseBodyType>({
    endpoint: `${apiRoutes.group}/${groupId}/calendar?startDate=${startDate}&endDate=${endDate}`,
    authorization,
  });
  return response;
};

export const useGetGroupCalendarSchedules = (
  groupId: string,
  authorization: string,
  startDate: string,
  endDate: string,
) => {
  return useQuery({
    queryKey: ["GROUP_CALENDAR_SCHEDULES"],
    queryFn: () => getGroupCalendarSchedules(groupId, authorization, startDate, endDate),
    enabled: authorization !== null,
  });
};
