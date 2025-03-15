import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getMyScheduleDetail = async (authorization: string, scheduleId: string) => {
  const response = api.get<IGetMyScheduleDetailType>({
    endpoint: `${apiRoutes.schedules}/${scheduleId}`,
    authorization,
  });
  return response;
};

export const useGetMyScheduleDetail = (authorization: string, scheduleId: string) => {
  return useQuery({
    queryKey: ["MY_SCHEDULE_DETAIL", scheduleId],
    queryFn: () => getMyScheduleDetail(authorization, scheduleId),
    enabled: authorization !== "",
  });
};
