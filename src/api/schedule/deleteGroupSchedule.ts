import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
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
    onSuccess: () => {
      alert("일정 삭제가 완료되었습니다.");
      navigate(-1);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
