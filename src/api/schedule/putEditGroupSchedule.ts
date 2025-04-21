import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useLocationInfoStore from "@store/useLocationInfoStore";
import useScheduleStore from "@store/useScheduleStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const putEditGroupSchedule = async (
  body: IPostCreateGroupScheduleType,
  groupId: string,
  scheduleId: string,
  authorization: string,
) => {
  const endpoint = `${apiRoutes.group}/${groupId}/schedules/${scheduleId}`;
  const response = await api.put({
    endpoint,
    body,
    authorization,
  });

  return response;
};

export const usePutEditGroupSchedule = (
  authorization: string,
  groupId: string,
  scheduleId: string,
) => {
  const navigate = useNavigate();
  const { setLocationInfo } = useLocationInfoStore();
  const { resetScheduleState } = useScheduleStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IPostCreateGroupScheduleType) =>
      putEditGroupSchedule(body, groupId, scheduleId, authorization),
    onMutate: () => {
      toast.loading("처리 중...", { id: "editGroupScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("editGroupScheduleLoading");
      toast.success("일정 수정 완료");
      queryClient.invalidateQueries({
        queryKey: ["GROUP_SCHEDULE_DETAIL", groupId, scheduleId],
      });
      navigate(-1);
      setLocationInfo("", 0, 0, "");
      resetScheduleState();
      clearLocationInfo();
    },
    onError: (error) => {
      toast.dismiss("editGroupScheduleLoading");
      toast.error(error.message);
    },
  });
};
