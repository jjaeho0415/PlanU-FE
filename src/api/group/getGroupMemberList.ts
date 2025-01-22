import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useQuery } from "@tanstack/react-query";

const getGroupMemberList = async (authorization: string, groupId: string) => {
    const response = await api.get<IGetGroupMembersType>({
        endpoint: `${apiRoutes.group}/${groupId}/members`,
        authorization
    })
    return response;
}

export const useGetGroupMemberList = (authorization: string, groupId: string) => {
    return useQuery({
        queryKey: ["GROUP_MEMBER_LIST", groupId],
        queryFn: () => getGroupMemberList(authorization, groupId),
        enabled: authorization !== ""
    })
}