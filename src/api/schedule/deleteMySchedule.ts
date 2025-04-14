import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const deleteMySchedule = async (authorization: string, scheduleId: string) => {
  const endpoint = `${apiRoutes.schedules}/${scheduleId}`;
  const response = await api.delete({
    endpoint,
    authorization,
  });

  return response;
};

export const useDeleteMySchedule = (authorization: string, scheduleId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteMySchedule(authorization, scheduleId),
    onMutate: () => {
      toast.loading("처리 중...", { id: "deleteMyScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("deleteMyScheduleLoading");
      toast.success("일정 삭제 완료");
      navigate(-1);
    },
    onError: (error) => {
      toast.dismiss("deleteMyScheduleLoading");
      toast.error(error.message);
    },
  });
};
