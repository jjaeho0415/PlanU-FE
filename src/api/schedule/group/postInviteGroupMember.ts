import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GROUP_MEMBER_INVITE_LIST"],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
