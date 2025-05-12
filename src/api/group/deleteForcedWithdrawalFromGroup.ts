import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteForcedWithdrawalFromGroup = async (
  authorization: string,
  groupId: number,
  username: string,
) => {
  const response = await api.delete<IResponseType>({
    endpoint: `${apiRoutes.group}/${groupId}/members/${username}`,
    authorization,
  });
  return response;
};

export const useDeleteForcedWithdrawalFromGroup = (authorization: string, groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) =>
      deleteForcedWithdrawalFromGroup(authorization, groupId, username),
    onMutate: () => {
      toast.loading("처리 중...", { id: "forcedWithdrawalLoading" });
    },
    onSuccess: () => {
      toast.dismiss("forcedWithdrawalLoading");
      toast.success("강제 추방 완료");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("forcedWithdrawalLoading");
      toast.error(error.message);
    },
  });
};
