import apiRoutes from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const postReadAllNotifications = async (authorization: string) => {
  const response: IResponseType = await api.post({
    endpoint: apiRoutes.readAllNotifications,
    authorization,
  });
  return response;
};

export const usePostReadAllNotifications = (authorization: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postReadAllNotifications(authorization),
    onMutate: () => {
      toast.loading("처리 중...", { id: "readAllLoading" });
    },
    onSuccess: () => {
      toast.dismiss("readAllLoading");
      toast.success("모두 읽기 완료");
      queryClient.invalidateQueries({
        queryKey: ["NOTIFICATION_LIST"],
      });
    },
    onError: (error) => {
      toast.dismiss("readAllLoading");
      toast.error(error.message);
    },
  });
};
