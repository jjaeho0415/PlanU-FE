import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import useLocationInfoStore from "@store/useLocationInfoStore";
import useScheduleStore from "@store/useScheduleStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const postCreateMySchedule = async (body: IPostCreateMyScheduleType, authorization: string) => {
  const endpoint = `${apiRoutes.schedules}`;
  const response = await api.post({
    endpoint,
    body,
    authorization,
  });

  return response;
};

export const usePostCreateMySchedule = (authorization: string) => {
  const navigate = useNavigate();
  const { setLocationInfo } = useLocationInfoStore();
  const { resetScheduleState } = useScheduleStore.getState();
  const { clearLocationInfo } = useLocationInfoStore.getState();

  return useMutation({
    mutationFn: (body: IPostCreateMyScheduleType) => postCreateMySchedule(body, authorization),
    onMutate: () => {
      toast.loading("처리 중...", { id: "createMyScheduleLoading" });
    },
    onSuccess: () => {
      toast.dismiss("createMyScheduleLoading");
      toast.success("일정 생성 완료");
      navigate(-1);
      setLocationInfo("", 0, 0, "");
      resetScheduleState;
      clearLocationInfo();
    },
    onError: (error) => {
      toast.dismiss("createMyScheduleLoading");
      toast.error(error.message);
    },
  });
};
