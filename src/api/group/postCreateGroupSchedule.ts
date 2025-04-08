import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const postCreateGroupSchedule = async (
  body: IPostCreateGroupScheduleType,
  groupId: number,
  authorization: string,
) => {
  const endpoint = `${apiRoutes.group}/${groupId}`;
  const response = await api.post({
    endpoint,
    body,
    authorization,
  });

  return response;
};

export const usePostCreateGroupSchedule = (authorization: string, groupId: number) => {
  return useMutation({
    mutationFn: (body: IPostCreateGroupScheduleType) =>
      postCreateGroupSchedule(body, groupId, authorization),
    onMutate: () => {
      toast.loading("처리 중...", { id: "createGroupScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("createGroupScheduleLoading");
      toast.success("일정 생성이 완료되었습니다.");
    },
    onError: (error) => {
      toast.dismiss("createGroupScheduleLoading");
      toast.error(error.message);
    },
  });
};
