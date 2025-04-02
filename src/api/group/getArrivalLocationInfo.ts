import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useQuery } from "@tanstack/react-query";

const getArrivalLocationInfo = async (authorization: string, groupId: string, scheduleId: string) => {
    const response = await api.get<IGetArrivalLocationInfoResponseBodyType>({
        endpoint: `${apiRoutes.group}/${groupId}/schedules/${scheduleId}/location`,
        authorization,
    })
    return response.groupScheduleLocation;
}

export const useGetArrivalLocationInfo = (authorization: string, groupId: string, scheduleId: string) => {
    return useQuery({
      queryKey: ["GROUP_ARRIVAL_LOCATION_INFO", groupId, scheduleId],
      queryFn: () => getArrivalLocationInfo(authorization, groupId, scheduleId),
      enabled: groupId !== undefined && scheduleId !== undefined && authorization !== "",
    });
}