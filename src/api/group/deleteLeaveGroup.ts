import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const deleteLeaveGroup = async (authorization: string, groupId: number) => {
  const response = await api.delete<IResponseType>({
    endpoint: `${apiRoutes.leaveGroup}/${groupId}`,
    authorization,
  });
  return response;
};

export const useDeleteLeaveGroup = (authorization: string, groupId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteLeaveGroup(authorization, groupId),
    onMutate: () => {
      toast.loading("처리 중...", { id: "leaveGroupLoading" });
    },
    onSuccess: () => {
      toast.dismiss("leaveGroupLoading");
      toast.success("그룹 나가기 성공");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      navigate("/groupList");
    },
    onError: (error) => {
      toast.dismiss("leaveGroupLoading");
      toast.error(error.message);
    },
  });
};
