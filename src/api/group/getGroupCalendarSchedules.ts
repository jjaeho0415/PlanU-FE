import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupCalendarSchedules = async (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  const response = await api.get<IGetGroupCalendarSchedulesResponseBodyType>({
    endpoint: `${apiRoutes.group}/${groupId}/calendar?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetGroupCalendarSchedules = (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  return useQuery({
    queryKey: ["GROUP_CALENDAR_SCHEDULES", groupId],
    queryFn: () => getGroupCalendarSchedules(groupId, authorization, yearMonth),
    enabled: groupId !== undefined && authorization !== "",
  });
};
