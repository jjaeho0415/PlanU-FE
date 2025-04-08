import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onMutate: () => {
      toast.loading("처리 중...", { id: "acceptGroupInviteLoading" });
    },
    onSuccess: () => {
      toast.dismiss("acceptGroupInviteLoading");
      toast.success("그룹 참여 완료");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_INVITE_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.dismiss("acceptGroupInviteLoading");
      toast.error(error.message);
    },
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
    onMutate: () => {
      toast.loading("처리 중...", { id: "deleteGroupInviteLoading" });
    },
    onSuccess: () => {
      toast.dismiss("deleteGroupInviteLoading");
      toast.success("그룹 초대 거절 완료");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_INVITE_LIST"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GROUP_LIST"],
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.dismiss("deleteGroupInviteLoading");
      toast.error(error.message);
    },
  });
};
