import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupAvailableDatesMemberList = async (
  groupId: string,
  authorization: string,
  selectedDate: string,
) => {
  const response: IGetGroupAvailableDatesMemberListResponseBodyType = await api.get({
    endpoint: `${apiRoutes.group}/${groupId}/available-dates/members?date=${selectedDate}`,
    authorization,
  });
  return response;
};

export const useGetGroupAvailableDatesMemberList = (
  groupId: string,
  authorization: string,
  selectedDate: string,
) => {
  return useQuery({
    queryKey: ["GROUP_AVAILABLE_DATES_MEMBERS_LIST", groupId, selectedDate],
    queryFn: () => getGroupAvailableDatesMemberList(groupId, authorization, selectedDate),
    enabled: groupId !== undefined && authorization !== "",
  });
};
