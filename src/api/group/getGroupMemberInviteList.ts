import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupMemberInviteList = async (groupId: string, authorization: string) => {
  const response = await api.get<IGetGroupMemberInviteListResponseBodyType>({
    endpoint: `${apiRoutes.group}/${groupId}/invite-list`,
    authorization,
  });
  return response;
};

export const useGetGroupMemberInviteList = (groupId: string, authorization: string) => {
  return useQuery({
    queryKey: ["GROUP_MEMBER_INVITE_LIST"],
    queryFn: () => getGroupMemberInviteList(groupId, authorization),
    enabled: authorization !== null,
  });
};
