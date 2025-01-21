import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

type IResponseGetGroupInviteListType = {
  data: IGetGroupInviteListItemType[];
};

const getGroupInviteList = async (authorization: string) => {
  const response = await api.get<IResponseGetGroupInviteListType>({
    endpoint: apiRoutes.showGroupInvitationList,
    authorization,
  });
  return response;
};

export const useGetGroupInviteList = (authorization: string) => {
  return useQuery({
    queryKey: ["GROUP_INVITE_LIST"],
    queryFn: () => getGroupInviteList(authorization),
    enabled: authorization !== "",
  });
};
