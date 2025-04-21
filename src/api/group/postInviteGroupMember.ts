import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const postInviteGroupMember = async (groupId: string, authorization: string, username: string) => {
  const response: IPostInviteGroupMemberResponseType = await api.post({
    endpoint: `${apiRoutes.inviteGroupMember}?groupId=${groupId}&username=${username}`,
    authorization,
  });
  return response;
};

export const usePostInviteGroupMember = (groupId: string, authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username: string) => postInviteGroupMember(groupId, authorization, username),
    onMutate: () => {
      toast.loading("처리 중...", { id: "inviteMemberLoading" });
    },
    onSuccess: () => {
      toast.dismiss("inviteMemberLoading");
      toast.success("그룹 멤버 초대 완료");
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
