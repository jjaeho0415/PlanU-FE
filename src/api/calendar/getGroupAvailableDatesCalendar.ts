import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupAvailableDatesCalendar = async (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  const response:IGetGroupAvailableDatesCalendarResponseBodyType = await api.get({
    endpoint: `${apiRoutes.group}/${groupId}/available-dates?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetGroupAvailableDatesCalendar = (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  return useQuery({
    queryKey: ["GROUP_AVAILABLE_DATES_CALENDAR", groupId, yearMonth],
    queryFn: () => getGroupAvailableDatesCalendar(groupId, authorization, yearMonth),
    enabled: groupId !== undefined && authorization !== "",
  });
};
