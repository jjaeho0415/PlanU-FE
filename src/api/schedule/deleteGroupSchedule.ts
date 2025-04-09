import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const deleteGroupSchedule = async (authorization: string, groupId: string, scheduleId: string) => {
  const endpoint = `${apiRoutes.group}/${groupId}/schedules/${scheduleId}`;
  const response = await api.delete({
    endpoint,
    authorization,
  });

  return response;
};

export const useDeleteGroupSchedule = (
  authorization: string,
  groupId: string,
  scheduleId: string,
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteGroupSchedule(authorization, groupId, scheduleId),
    onMutate: () => {
      toast.loading("처리 중...", { id: "deleteGroupScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("deleteGroupScheduleLoading");
      toast.success("일정 삭제 완료");
      navigate(-1);
    },
    onError: (error) => {
      toast.dismiss("deleteGroupScheduleLoading");
      toast.error(error.message);
    },
  });
};
