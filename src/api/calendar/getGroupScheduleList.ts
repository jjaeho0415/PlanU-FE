import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher"
import { useQuery } from "@tanstack/react-query";

const getGroupScheduleList = async (groupId: string, authorization: string, selectedDate: string) => {
    const response = api.get<IGetScheduleListResponseBodyType>({
        endpoint: `${apiRoutes.group}/${groupId}/schedules/list?startDate=${selectedDate}&endDate=${selectedDate}`,
        authorization
    });
    return response;
}

export const useGetGroupScheduleList = (groupId: string, authorization: string, selectedDate:string) => {
    return useQuery({
        queryKey: ["GROUP_SCHEDULE_LIST", groupId, selectedDate],
        queryFn: () => getGroupScheduleList(groupId, authorization, selectedDate),
        enabled: groupId !== undefined && authorization !== ""
    })
}