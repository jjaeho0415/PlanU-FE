import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";

const postCreateMySchedule = async (body: IPostCreateMyScheduleType, authorization: string) => {
  const endpoint = `${apiRoutes.shedules}`;
  const response = await api.post({
    endpoint,
    body,
    authorization,
  });

  return response;
};

export const usePostCreateMyShcedule = (authorization: string) => {
  return useMutation({
    mutationFn: (body: IPostCreateMyScheduleType) => postCreateMySchedule(body, authorization),
    onSuccess: () => {
      alert("일정 생성이 완료되었습니다.");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
