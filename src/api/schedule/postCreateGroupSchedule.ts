import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const postCreateGroupSchedule = async (
  body: IPostCreateGroupScheduleType,
  groupId: number,
  authorization: string,
) => {
  const endpoint = `${apiRoutes.group}/${groupId}/schedules`;
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
    onSuccess: () => {
      alert("일정 생성이 완료되었습니다.");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
