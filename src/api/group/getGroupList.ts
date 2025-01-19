import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

type IResponseGetGroupListType = {
  data: IGetGroupListItemType[];
}

const getGroupList = async (authorization: string) => {
  const response = await api.get<IResponseGetGroupListType>({
    endpoint: apiRoutes.showGroupList,
    authorization,
  });
  return response;
};

export const useGetGroupList = (authorization: string) => {
  return useQuery({
    queryKey: ["GROUP_LIST"],
    queryFn: () => getGroupList(authorization),
    enabled: authorization !== "",
  });
};
