import apiRoutes from "@api/apiRoutes"
import api from "@api/fetcher"
import { useQuery } from "@tanstack/react-query";

const getGroupTotalMemberCount = async (groupId: string, authorization: string) => {
    const response: IGetGroupTotalMemberCountResponseBodyType = await api.get({
      endpoint: `${apiRoutes.group}/${groupId}/members/count`,
      authorization,
    });
    return response;
}

export const useGetGroupTotalMemberCount = (groupId: string, authorization: string) => {
    return useQuery({
        queryKey: ["GROUP_MEMBER_COUNT", groupId],
        queryFn: () => getGroupTotalMemberCount(groupId, authorization),
        enabled: groupId !== undefined && authorization !== ""
    })
}