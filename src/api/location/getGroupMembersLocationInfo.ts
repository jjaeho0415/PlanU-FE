import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useQuery } from "@tanstack/react-query";

const getGroupMembersLocationInfo = async (authorization: string, groupId: string, scheduleId: string) => {
    const response:IGetGroupMemberLocationResponseType = await api.get({
        endpoint: `${apiRoutes.group}/${groupId}/schedules/${scheduleId}/member-location`,
        authorization
    })
    return response;
}

export const useGetGroupMembersLocationInfo = (authorization: string, groupId: string, scheduleId: string) => {
    return useQuery({
        queryKey: ["GROUP_MEMBERS_LOCATION_INFO", groupId, scheduleId],
        queryFn: () => getGroupMembersLocationInfo(authorization, groupId, scheduleId)
    })
}