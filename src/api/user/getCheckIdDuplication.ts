import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";
import apiRoutes from "@api/apiRoutes";

async function getCheckIdDuplication(username: string): Promise<IResponseType> {
  return await api.get({ endpoint: `${apiRoutes.users}/username/${username}/exists` });
}

export function useGetCheckIdDuplication(username: string, enabled?: boolean) {
  return useQuery({
    queryKey: ["getCheckIdDuplication", username],
    queryFn: () => getCheckIdDuplication(username),
    enabled,
  });
}
