import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const deleteGroup = async (authorization: string, groupId: number) => {
  const response = await api.delete<IResponseType>({
    endpoint: `${apiRoutes.deleteGroup}/${groupId}`,
    authorization,
  });
  return response;
};

export const useDeleteGroup = (authorization: string, groupId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteGroup(authorization, groupId),
    onMutate: () => {
      toast.loading("처리 중...", { id: "deleteGroupLoading" });
    },
    onSuccess: () => {
      toast.dismiss("deleteGroupLoading");
      toast.success("그룹 삭제 완료");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      navigate("/groupList");
    },
    onError: (error) => {
      toast.dismiss("deleteGroupLoading");
      toast.error(error.message);
    },
  });
};
