import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getMyCalendarCheckEvents = async (
  username: string,
  yearMonth: string,
  authorization: string,
) => {
  const response = api.get<IGetMyCalendarCheckEventsResponseBodyType>({
    endpoint: `${apiRoutes.schedules}/${username}/check-events?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetMyCalendarCheckEvents = (
  username: string,
  yearMonth: string,
  authorization: string,
) => {
  return useQuery({
    queryKey: ["MY_CHECK_EVENTS", username, yearMonth],
    queryFn: () => getMyCalendarCheckEvents(username, yearMonth, authorization),
    enabled: !!username && !!yearMonth && !!authorization,
  });
};
