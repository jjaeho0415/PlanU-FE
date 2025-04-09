import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useLocationInfoStore from "@store/useLocationInfoStore";
import useScheduleStore from "@store/useScheduleStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
  const { resetScheduleState } = useScheduleStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();

  return useMutation({
    mutationFn: (body: IPostCreateGroupScheduleType) =>
      postCreateGroupSchedule(body, groupId, authorization),
    onMutate: () => {
      toast.loading("처리 중...", { id: "createGroupScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("createGroupScheduleLoading");
      toast.success("일정 생성 완료");
      navigate(-1);
      setLocationInfo("", 0, 0, "");
      resetScheduleState();
      clearLocationInfo();
    },
    onError: (error) => {
      toast.dismiss("createGroupScheduleLoading");
      toast.error(error.message);
    },
  });
};
