import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      navigate("/groupList");
    },
    onError: (error) => alert(error.message),
  });
};