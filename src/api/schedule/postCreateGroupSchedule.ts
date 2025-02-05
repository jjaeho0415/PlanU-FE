import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useLocationInfoStore from "@store/useLocationInfoStore";
import useScheduleStore from "@store/useScheduleStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { setLocationInfo } = useLocationInfoStore();
  const scheduleStore = useScheduleStore.getState();

  return useMutation({
    mutationFn: (body: IPostCreateGroupScheduleType) =>
      postCreateGroupSchedule(body, groupId, authorization),
    onSuccess: () => {
      alert("일정 생성이 완료되었습니다.");
      navigate(-1);
      setLocationInfo("", 0, 0, "");
      scheduleStore.reset();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
