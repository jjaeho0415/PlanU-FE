import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteForcedWithdrawalFromGroup = async (authorization: string, groupId: number, username: string) => {
  const response = await api.put<IResponseType>({
    endpoint: `${apiRoutes.group}/${groupId}/members/${username}`,
    authorization,
  });
  return response;
};

export const useDeleteForcedWithdrawalFromGroup = (
    authorization: string,
    groupId: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => deleteForcedWithdrawalFromGroup(authorization, groupId, username),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
    },
    onError: (error) => alert(error.message),
  });
};