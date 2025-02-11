import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

const getGroupDetails = async (groupId: string, authorization: string) => {
  const response: IGetGroupDetailsResponseBodyType = await api.get({
    endpoint: `${apiRoutes.group}/${groupId}/details`,
    authorization,
  });
  return response;
};

export const useGetGroupDetails = (groupId: string, authorization: string) => {
  return useQuery({
    queryKey: ["GROUP_DETAILS"],
    queryFn: () => getGroupDetails(groupId, authorization),
  });
};
