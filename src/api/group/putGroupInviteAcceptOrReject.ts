import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const putGroupInviteAccept = async (authorization: string, groupId: number) => {
  const response = await api.put<IResponseType>({
    endpoint: `${apiRoutes.acceptGroupInvitation}/${groupId}`,
    authorization,
  });
  return response;
};

export const usePutGroupInviteAccept = (
  authorization: string,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: number) => putGroupInviteAccept(authorization, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_INVITE_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      setIsModalOpen(false);
    },
    onError: (error) => alert(error.message),
  });
};

const deleteGroupInvite = async (authorization: string, groupId: number) => {
  const response = await api.delete<IResponseType>({
    endpoint: `${apiRoutes.rejectGroupInvitation}/${groupId}`,
    authorization,
  });
  return response;
};

export const useDeleteGroupInvite = (
  authorization: string,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: number) => deleteGroupInvite(authorization, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_INVITE_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      setIsModalOpen(false);
    },
    onError: (error) => alert(error.message),
  });
};
