import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupAvailableDatesMemberInfos = async (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  const response: IGetGroupAvailableDatesMemberInfosResponseBodyType = await api.get({
    endpoint: `${apiRoutes.group}/${groupId}/available-dates/member-info?yearMonth=${yearMonth}`,
    authorization,
  });
  return response;
};

export const useGetGroupAvailableDatesMemberInfos = (
  groupId: string,
  authorization: string,
  yearMonth: string,
) => {
  return useQuery({
    queryKey: ["GROUP_AVAILABLE_DATES_MEMBER_INFO", groupId, yearMonth],
    queryFn: () => getGroupAvailableDatesMemberInfos(groupId, authorization, yearMonth),
    enabled: groupId !== undefined && authorization !== "",
  });
};
