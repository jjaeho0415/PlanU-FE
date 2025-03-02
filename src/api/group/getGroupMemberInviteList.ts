import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupMemberInviteList = async (
  groupId: string,
  authorization: string,
  searchInput: string,
) => {
  const endpoint = searchInput
    ? `${apiRoutes.group}/${groupId}/invite-list?search=${searchInput}`
    : `${apiRoutes.group}/${groupId}/invite-list`;
  const response = await api.get<IGetGroupMemberInviteListResponseBodyType>({
    endpoint,
    authorization,
  });
  return response;
};

export const useGetGroupMemberInviteList = (
  groupId: string,
  authorization: string,
  searchInput: string,
) => {
  return useQuery({
    queryKey: ["GROUP_MEMBER_INVITE_LIST"],
    queryFn: () => getGroupMemberInviteList(groupId, authorization, searchInput),
    enabled: groupId !== undefined && authorization !== "",
  });
};
