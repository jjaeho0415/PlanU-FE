import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useLocationInfoStore from "@store/useLocationInfoStore";
import useScheduleStore from "@store/useScheduleStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const postEditMySchedule = async (
  body: IPostCreateMyScheduleType,
  authorization: string,
  scheduleId: string,
) => {
  const endpoint = `${apiRoutes.schedules}/${scheduleId}`;
  const response = await api.put({
    endpoint,
    body,
    authorization,
  });

  return response;
};

export const usePostEditMySchedule = (authorization: string, scheduleId: string) => {
  const navigate = useNavigate();
  const { setLocationInfo } = useLocationInfoStore();
  const { resetScheduleState } = useScheduleStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IPostCreateMyScheduleType) =>
      postEditMySchedule(body, authorization, scheduleId),
    onMutate: () => {
      toast.loading("처리 중...", { id: "editMyScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("editMyScheduleLoading");
      toast.success("일정 수정 완료");
      queryClient.invalidateQueries({
        queryKey: ["MY_SCHEDULE_DETAIL", scheduleId],
      });
      navigate(-1);
      setLocationInfo("", 0, 0, "");
      resetScheduleState();
      clearLocationInfo();
    },
    onError: (error) => {
      toast.dismiss("editMyScheduleLoading");
      toast.error(error.message);
    },
  });
};
