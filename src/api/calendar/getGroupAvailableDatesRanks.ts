import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupAvailableDatesRanks = async (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  const response: IGetGroupAvailableDatesRanksResponseBodyType = await api.get({
    endpoint: `${apiRoutes.group}/${groupId}/available-dates/ranks?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetGroupAvailableDatesRanks = (
  groupId: string,
  authorization: string,
  yearMonth: string,
  activeTab: "멤버별" | "날짜별" | "순위",
) => {
  return useQuery({
    queryKey: ["GROUP_AVAILABLE_DATES_RANKS", groupId, yearMonth],
    queryFn: () => getGroupAvailableDatesRanks(groupId, authorization, yearMonth),
    enabled: groupId !== undefined && authorization !== "" && activeTab === "순위",
  });
};
