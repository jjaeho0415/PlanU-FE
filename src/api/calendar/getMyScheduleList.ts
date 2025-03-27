import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

// 개인 달력 일정 조회 API
const getMyScheduleList = async (username: string, authorization: string, selectedDate: string) => {
  const response = api.get<IGetScheduleListResponseBodyType>({
    endpoint: `${apiRoutes.schedules}/${username}/list?startDate=${selectedDate}&endDate=${selectedDate}`,
    authorization,
  });
  return response;
};

export const useGetMyScheduleList = (
  username: string,
  authorization: string,
  selectedDate: string,
) => {
  return useQuery({
    queryKey: ["MY_SCHEDULE_LIST", username, selectedDate],
    queryFn: () => getMyScheduleList(username, authorization, selectedDate),
    enabled: !!username && !!authorization,
  });
};
