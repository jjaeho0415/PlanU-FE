import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteInviteGroupMember = async (groupId: string, authorization: string, username: string) => {
  const response: IResponseType = await api.delete({
    endpoint: `${apiRoutes.inviteGroupMember}?groupId=${groupId}&username=${username}`,
    authorization,
  });
  return response;
};

export const useDeleteInviteGroupMember = (groupId: string, authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => deleteInviteGroupMember(groupId, authorization, username),
    onMutate: () => {
      toast.loading("처리 중...", { id: "inviteMemberLoading" });
    },
    onSuccess: () => {
      toast.dismiss("inviteMemberLoading");
      toast.success("초대 취소 완료")
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_INVITE_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("inviteMemberLoading");
      toast.error(error.message);
    },
  });
};
