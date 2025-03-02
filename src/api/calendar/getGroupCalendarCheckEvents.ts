import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupCalendarCheckEvents = async (
  groupId: string,
  yearMonth: string,
  authorization: string,
) => {
  const response = api.get<IGetGroupCalendarCheckEventsResponseBodyType>({
    endpoint: `${apiRoutes.group}/${groupId}/schedules/check-events?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetGroupCalendarCheckEvents = (
  groupId: string,
  yearMonth: string,
  authorization: string,
) => {
  return useQuery({
    queryKey: ["GROUP_CHECK_EVENTS", groupId, yearMonth],
    queryFn: () => getGroupCalendarCheckEvents(groupId, yearMonth, authorization),
    enabled: groupId !== undefined && authorization !== null,
  });
};
