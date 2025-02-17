import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      navigate("/groupList");
    },
    onError: (error) => alert(error.message),
  });
};
