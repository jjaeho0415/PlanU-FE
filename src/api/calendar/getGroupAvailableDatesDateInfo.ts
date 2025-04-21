import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupAvailableDatesDateInfo = async (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  const response: IGetGroupAvailableDatesDateInfoResponseBodyType = await api.get({
    endpoint: `${apiRoutes.group}/${groupId}/available-dates/date-info?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetGroupAvailableDatesDateInfo = (
  groupId: string,
  authorization: string,
  yearMonth: string,
  activeTab: "멤버별" | "날짜별" | "순위",
) => {
  return useQuery({
    queryKey: ["GROUP_AVAILABLE_DATES_DATE_INFO", groupId, yearMonth],
    queryFn: () => getGroupAvailableDatesDateInfo(groupId, authorization, yearMonth),
    enabled: groupId !== undefined && authorization !== "" && activeTab === "날짜별"
  });
};
